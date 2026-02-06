import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument, UserRole, getDefaultPermissions } from '../../schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserPermissionsDto } from './dto/update-user-permissions.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';


@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
        const { username, email, password, role, permissions } = createUserDto;

        const existingUser = await this.userModel.findOne({
            $or: [{ email }, { username }],
        });

        if (existingUser) {
            throw new ConflictException('User with this email or username already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userRole = role || UserRole.USER;
        const userPermissions = permissions || getDefaultPermissions(userRole);

        const user = new this.userModel({
            username,
            email,
            password: hashedPassword,
            role: userRole,
            permissions: userPermissions,
        });

        const savedUser = await user.save();

        const result = await this.userModel
            .findById(savedUser._id)
            .select('-password -refreshToken')
            .exec();

        if (!result) {
            throw new NotFoundException('Failed to create user');
        }

        return result;
    }

    async getAllUsers(): Promise<UserDocument[]> {
        return this.userModel.find().select('-password -refreshToken').exec();
    }

    async getUserById(userId: string): Promise<UserDocument> {
        const user = await this.userModel
            .findById(userId)
            .select('-password -refreshToken')
            .exec();

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

  async update(id: string, updateUserDto: any) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

    async updateUser(
        userId: string,
        updateUserDto: UpdateUserDto,
    ): Promise<UserDocument> {
        const updateData: any = { ...updateUserDto };

        if (updateUserDto.password) {
            updateData.password = await bcrypt.hash(updateUserDto.password, 10);
        }

        if (updateUserDto.email || updateUserDto.username) {
            const conflictQuery: any = { _id: { $ne: userId } };
            const orConditions: any[] = [];

            if (updateUserDto.email) {
                orConditions.push({ email: updateUserDto.email });
            }
            if (updateUserDto.username) {
                orConditions.push({ username: updateUserDto.username });
            }

            if (orConditions.length > 0) {
                conflictQuery.$or = orConditions;
                const existingUser = await this.userModel.findOne(conflictQuery);

                if (existingUser) {
                    throw new ConflictException('Email or username already in use');
                }
            }
        }

        if (updateUserDto.role && !updateUserDto.permissions) {
            updateData.permissions = getDefaultPermissions(updateUserDto.role);
        }

        const user = await this.userModel
            .findByIdAndUpdate(userId, updateData, { new: true })
            .select('-password -refreshToken')
            .exec();

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async updateUserRole(
        userId: string,
        updateUserRoleDto: UpdateUserRoleDto,
    ): Promise<UserDocument> {
        const defaultPermissions = getDefaultPermissions(updateUserRoleDto.role);

        const user = await this.userModel
            .findByIdAndUpdate(
                userId,
                {
                    role: updateUserRoleDto.role,
                    permissions: defaultPermissions,
                },
                { new: true },
            )
            .select('-password -refreshToken')
            .exec();

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async updateUserPermissions(
        userId: string,
        updateUserPermissionsDto: UpdateUserPermissionsDto,
    ): Promise<UserDocument> {
        const user = await this.userModel
            .findByIdAndUpdate(
                userId,
                { permissions: updateUserPermissionsDto.permissions },
                { new: true },
            )
            .select('-password -refreshToken')
            .exec();

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async deleteUser(userId: string): Promise<{ message: string }> {
        const user = await this.userModel.findByIdAndDelete(userId).exec();

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return { message: 'User deleted successfully' };
    }
}
