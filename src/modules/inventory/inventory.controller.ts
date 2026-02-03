import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Controller('inventory')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) { }

    @Post()
    @Permissions('can_create_inventory')
    create(@Body() createInventoryDto: CreateInventoryDto) {
        return this.inventoryService.create(createInventoryDto);
    }

    @Get()
    @Permissions('can_view_inventory')
    findAll() {
        return this.inventoryService.findAll();
    }

    @Get(':id')
    @Permissions('can_view_inventory')
    findOne(@Param('id') id: string) {
        return this.inventoryService.findOne(id);
    }

    @Patch(':id')
    @Permissions('can_update_inventory')
    update(@Param('id') id: string, @Body() updateInventoryDto: UpdateInventoryDto) {
        return this.inventoryService.update(id, updateInventoryDto);
    }

    @Delete(':id')
    @Permissions('can_delete_inventory')
    remove(@Param('id') id: string) {
        return this.inventoryService.remove(id);
    }
}