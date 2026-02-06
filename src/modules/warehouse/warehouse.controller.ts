
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PoliciesGuard } from '../casl/guards/policies.guard';
import { CheckPolicies } from '../casl/decorators/check-policies.decorator';
import { Action } from '../casl/casl-ability.factory';

@Controller('warehouses')
@UseGuards(JwtAuthGuard, PoliciesGuard)
export class WarehouseController {
  constructor(private readonly service: WarehouseService) { }

  @Post()
  @CheckPolicies((ability) => ability.can(Action.Create, 'warehouse'))
  create(@Body() dto: CreateWarehouseDto) {
    return this.service.create(dto);
  }

  @Get()
  @CheckPolicies((ability) => ability.can(Action.View, 'warehouse'))
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @CheckPolicies((ability) => ability.can(Action.View, 'warehouse'))
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @CheckPolicies((ability) => ability.can(Action.Update, 'warehouse'))
  update(@Param('id') id: string, @Body() dto: UpdateWarehouseDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @CheckPolicies((ability) => ability.can(Action.Delete, 'warehouse'))
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
