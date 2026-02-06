import {
    Injectable,
    UnauthorizedException,
    ConflictException,
    Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { User, UserDocument, UserRole, getDefaultPermissions } from '../../schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AuthResponse } from './interfaces/auth-response.interface';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async register(registerDto: RegisterDto): Promise<AuthResponse> {
        const { username, email, password } = registerDto;

        const existingUser = await this.userModel.findOne({
            $or: [{ email }, { username }],
        });

        if (existingUser) {
            throw new ConflictException(
                'User with this email or username already exists',
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new this.userModel({
            username,
            email,
            password: hashedPassword,
            role: UserRole.USER,
            permissions: getDefaultPermissions(UserRole.USER),
        });

        await user.save();
        this.logger.log(`New user registered: ${email}`);

        return this.generateAuthResponse(user);
    }

    async login(loginDto: LoginDto): Promise<AuthResponse> {
        const { email, password } = loginDto;

        const user = await this.userModel.findOne({ email });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const defaultPermissions = getDefaultPermissions(user.role);
        const missingPermissions = defaultPermissions.filter(
            perm => !user.permissions.includes(perm)
        );

        if (missingPermissions.length > 0) {
            user.permissions = [...user.permissions, ...missingPermissions];
            await user.save();
            this.logger.log(`Synced ${missingPermissions.length} permissions for: ${email}`);
        }

        this.logger.log(`User logged in: ${email}`);

        return this.generateAuthResponse(user);
    }

    async refreshToken(refreshToken: string): Promise<AuthResponse> {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get<string>('jwt.refreshSecret'),
            });

            const user = await this.userModel.findById(payload.sub);

            if (!user || !user.refreshToken) {
                throw new UnauthorizedException('Invalid refresh token');
            }

            const isRefreshTokenValid = await bcrypt.compare(
                refreshToken,
                user.refreshToken,
            );

            if (!isRefreshTokenValid) {
                throw new UnauthorizedException('Invalid refresh token');
            }

            this.logger.log(`Token refreshed for user: ${user.email}`);

            return this.generateAuthResponse(user);
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    async logout(userId: string): Promise<void> {
        await this.userModel.findByIdAndUpdate(userId, {
            refreshToken: null,
        });

        this.logger.log(`User logged out: ${userId}`);
    }

    async validateOAuthLogin(profile: any): Promise<AuthResponse> {
        const { email, firstName, lastName, username, provider } = profile;

        let user = await this.userModel.findOne({ email });

        if (!user) {
            const randomPassword = Math.random().toString(36).slice(-12);
            const hashedPassword = await bcrypt.hash(randomPassword, 10);

            const newUsername = username || `${firstName?.toLowerCase() || 'user'}_${Date.now()}`;

            user = new this.userModel({
                username: newUsername,
                email,
                password: hashedPassword,
                role: UserRole.USER,
                permissions: getDefaultPermissions(UserRole.USER),
            });

            await user.save();
            this.logger.log(`New OAuth user created: ${email} (${provider})`);
        } else {
          
            const defaultPermissions = getDefaultPermissions(user.role);
            const missingPermissions = defaultPermissions.filter(
                perm => !user!.permissions.includes(perm)
            );

            if (missingPermissions.length > 0) {
                user.permissions = [...user.permissions, ...missingPermissions];
                await user.save();
                this.logger.log(`Synced ${missingPermissions.length} permissions for OAuth user: ${email}`);
            }

            this.logger.log(`Existing user logged in via OAuth: ${email} (${provider})`);
        }

        if (!user) {
            throw new UnauthorizedException('Failed to create or find user');
        }

        return this.generateAuthResponse(user);
    }

    async validateUser(payload: JwtPayload): Promise<UserDocument | null> {
        return this.userModel.findById(payload.sub);
    }

    private async generateAuthResponse(
        user: UserDocument,
    ): Promise<AuthResponse> {
        const payload: JwtPayload = {
            sub: user._id.toString(),
            email: user.email,
            username: user.username,
            role: user.role,
            permissions: user.permissions,
        };

        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('jwt.secret') || 'default-secret',
            expiresIn: (this.configService.get<string>('jwt.expiresIn') ||
                '30m') as any,
        });

        const refreshToken = this.jwtService.sign(
            { sub: user._id.toString() },
            {
                secret:
                    this.configService.get<string>('jwt.refreshSecret'),
                expiresIn: (this.configService.get<string>('jwt.refreshExpiresIn')) as any,
            },
        );

        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.userModel.findByIdAndUpdate(user._id, {
            refreshToken: hashedRefreshToken,
        });

        return {
            accessToken,
            refreshToken,
            user: {
                id: user._id.toString(),
                email: user.email,
                username: user.username,
                permissions: user.permissions,
            },
        };
    }
}
