// src/stock/stock.service.ts
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { Stock } from '../../schemas/stock.schema';
import { StockRepository } from './repositories/stock.repository';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Injectable()
export class StockService {
  constructor(private readonly repo: StockRepository) {}

  create(dto: CreateStockDto) {
    const { inventory, ...rest } = dto;

    const data: Partial<Stock> = {
      ...rest,
      inventory: new Types.ObjectId(inventory),
    };

    return this.repo.create(data);
  }

  findAll() {
    return this.repo.findAll();
  }

  findById(id: string) {
    return this.repo.findById(id);
  }

  update(id: string, dto: UpdateStockDto) {
    const { inventory, ...rest } = dto;

    const data: Partial<Stock> = {
      ...rest,
      ...(inventory ? { inventory: new Types.ObjectId(inventory) } : {}),
    };

    return this.repo.update(id, data);
  }

  delete(id: string) {
    return this.repo.delete(id);
  }
}
