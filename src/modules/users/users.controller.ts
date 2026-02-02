import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Patch,
    Body,
    UseGuards,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UpdateUserPermissionsDto } from './dto/update-user-permissions.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, AdminGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Get()
    async getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return this.usersService.getUserById(id);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async updateUser(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.usersService.updateUser(id, updateUserDto);
    }

    @Patch(':id/role')
    @HttpCode(HttpStatus.OK)
    async updateUserRole(
        @Param('id') id: string,
        @Body() updateUserRoleDto: UpdateUserRoleDto,
    ) {
        return this.usersService.updateUserRole(id, updateUserRoleDto);
    }

    @Patch(':id/permissions')
    @HttpCode(HttpStatus.OK)
    async updateUserPermissions(
        @Param('id') id: string,
        @Body() updateUserPermissionsDto: UpdateUserPermissionsDto,
    ) {
        return this.usersService.updateUserPermissions(id, updateUserPermissionsDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUser(id);
    }
}
