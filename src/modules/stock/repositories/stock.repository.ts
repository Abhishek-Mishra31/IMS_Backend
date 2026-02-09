import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stock } from '../../../schemas/stock.schema'; 

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
    // FIX: Populate both 'inventory' (Product) AND 'warehouse'
    return this.model.find()
      .populate('inventory')
      .populate('warehouse') // 👈 ADDED THIS
      .exec();
  }

  async findById(id: string) {
    // FIX: Add populate here too
    const stock = await this.model.findById(id)
      .populate('inventory')
      .populate('warehouse') // 👈 ADDED THIS
      .exec();
      
    if (!stock) throw new NotFoundException('Stock not found');
    return stock;
  }

  update(id: string, data: Partial<Stock>) {
    // FIX: Add populate here so the response updates the UI immediately
    return this.model.findByIdAndUpdate(id, data, { new: true })
      .populate('inventory')
      .populate('warehouse') // 👈 ADDED THIS
      .exec();
  }

  delete(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}