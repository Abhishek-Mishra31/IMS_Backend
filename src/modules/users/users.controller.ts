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
import { PoliciesGuard } from '../casl/guards/policies.guard';
import { CheckPolicies } from '../casl/decorators/check-policies.decorator';
import { Action } from '../casl/casl-ability.factory';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserRoleDto, UpdateUserPermissionsDto } from './dto/update-user.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { UserDocument } from '../../schemas/user.schema';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @UseGuards(PoliciesGuard)
    @CheckPolicies((ability) => ability.can(Action.Create, 'users'))
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }
    @Get()
    @UseGuards(PoliciesGuard)
    @CheckPolicies((ability) => ability.can(Action.View, 'users'))
    async getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @Get(':id')
    @UseGuards(PoliciesGuard)
    @CheckPolicies((ability) => ability.can(Action.View, 'users'))
    async getUserById(@Param('id') id: string) {
        return this.usersService.getUserById(id);
    }

    @Put(':id')
    @UseGuards(PoliciesGuard)
    @CheckPolicies((ability, user, params) => {

        if (ability.can(Action.Edit, 'users')) {
            return true;
        }
        return params.id === user._id.toString();
    })
    @HttpCode(HttpStatus.OK)
    async updateUser(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
        @CurrentUser() user: UserDocument,
    ) {
        return this.usersService.updateUser(id, updateUserDto);
    }

    @Patch(':id/role')
    @UseGuards(AdminGuard)
    @HttpCode(HttpStatus.OK)
    async updateUserRole(
        @Param('id') id: string,
        @Body() updateUserRoleDto: UpdateUserRoleDto,
    ) {
        return this.usersService.updateUserRole(id, updateUserRoleDto);
    }

    @Patch(':id/permissions')
    @UseGuards(PoliciesGuard)
    @CheckPolicies((ability) => ability.can(Action.Edit, 'users'))
    @HttpCode(HttpStatus.OK)
    async updateUserPermissions(
        @Param('id') id: string,
        @Body() updateUserPermissionsDto: UpdateUserPermissionsDto,
    ) {
        return this.usersService.updateUserPermissions(id, updateUserPermissionsDto);
    }

    @Delete(':id')
    @UseGuards(PoliciesGuard)
    @CheckPolicies((ability) => ability.can(Action.Delete, 'users'))
    @HttpCode(HttpStatus.OK)
    async deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUser(id);
    }
}
