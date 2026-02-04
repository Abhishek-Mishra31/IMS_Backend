// src/stock/repositories/stock.repository.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stock } from '../../../schemas/stock.schema'

@Injectable()
export class StockRepository {
  constructor(
    @InjectModel(Stock.name)
    private readonly model: Model<Stock>,
  ) {}

  create(data: Partial<Stock>) {
    return this.model.create(data);
  }

  findAll() {
    return this.model.find();
  }

  async findById(id: string) {
    const stock = await this.model.findById(id);
    if (!stock) throw new NotFoundException('Stock not found');
    return stock;
  }

  update(id: string, data: Partial<Stock>) {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  delete(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
