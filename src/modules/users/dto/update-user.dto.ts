import { IsEmail, IsString, MinLength, IsEnum, IsArray, IsOptional } from 'class-validator';
import { UserRole } from '../../../schemas/user.schema';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    @MinLength(3)
    username?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    @MinLength(8)
    password?: string;

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    permissions?: string[];

    @IsString()
    @IsOptional()
    phoneNumber?: string;

    @IsString()
    @IsOptional()
    location?: string;
}

export class UpdateUserRoleDto {
    @IsEnum(UserRole)
    role: UserRole;
}

export class UpdateUserPermissionsDto {
    @IsArray()
    @IsString({ each: true })
    permissions: string[];
}
