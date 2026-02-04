// src/stock/stock.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PoliciesGuard } from '../casl/guards/policies.guard';
import {
  CreateStockPolicy,
  ReadStockPolicy,
  UpdateStockPolicy,
  DeleteStockPolicy,
} from './decorators/stock-policies.decorator';

@Controller('stocks')
@UseGuards(JwtAuthGuard, PoliciesGuard)
export class StockController {
  constructor(private readonly service: StockService) { }

  @Post()
  @CreateStockPolicy()
  create(@Body() dto: CreateStockDto) {
    return this.service.create(dto);
  }

  @Get()
  @ReadStockPolicy()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ReadStockPolicy()
  findOne(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Patch(':id')
  @UpdateStockPolicy()
  update(@Param('id') id: string, @Body() dto: UpdateStockDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @DeleteStockPolicy()
  remove(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
