import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PoliciesGuard } from '../casl/guards/policies.guard';
import { CheckPolicies } from '../casl/decorators/check-policies.decorator';
import { Action } from '../casl/casl-ability.factory';

@Controller('inventory')
@UseGuards(JwtAuthGuard, PoliciesGuard)
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) { }

    @Post()
    @CheckPolicies((ability) => ability.can(Action.Create, 'inventory'))
    create(@Body() createInventoryDto: any) {
        return this.inventoryService.create(createInventoryDto);
    }

    @Get()
    @CheckPolicies((ability) => ability.can(Action.View, 'inventory'))
    findAll() {
        return this.inventoryService.findAll();
    }

    @Get(':id')
    @CheckPolicies((ability) => ability.can(Action.View, 'inventory'))
    findOne(@Param('id') id: string) {
        return this.inventoryService.findOne(id);
    }

    @Patch(':id')
    @CheckPolicies((ability) => ability.can(Action.Update, 'inventory'))
    update(@Param('id') id: string, @Body() updateInventoryDto: any) {
        return this.inventoryService.update(id, updateInventoryDto);
    }

    @Delete(':id')
    @CheckPolicies((ability) => ability.can(Action.Delete, 'inventory'))
    remove(@Param('id') id: string) {
        return this.inventoryService.remove(id);
    }
}