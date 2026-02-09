import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsArray, IsOptional } from 'class-validator';
import { UserRole } from '../../../schemas/user.schema';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    permissions?: string[];

    @IsString()
    phoneNumber?: string;

    @IsString()
    @IsOptional()
    location?: string;
}
