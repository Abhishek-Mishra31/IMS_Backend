import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { Stock } from '../../schemas/stock.schema';
import { StockRepository } from './repositories/stock.repository';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Injectable()
export class StockService {
  constructor(private readonly repo: StockRepository) {}

  async create(dto: CreateStockDto) {
    try {
      // 1. CLEAN THE DATA
      // If warehouse is an empty string or null, delete the key entirely.
      // This prevents "Cast to ObjectId failed" errors.
      if (!dto.warehouse) {
        delete dto.warehouse;
      }

      // 2. PASS DIRECTLY (Let Mongoose handle the ID conversion)
      // We do NOT need "new Types.ObjectId(dto.inventory)" here.
      // The Mongoose Schema will automatically cast the string to an ObjectId.
      return await this.repo.create(dto as any);

    } catch (error) {
      // 3. LOG THE ACTUAL ERROR
      console.error("🔥 ERROR CREATING STOCK:", error.message);
      
      if (error.name === 'ValidationError') {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  findAll() {
    return this.repo.findAll();
  }

  findById(id: string) {
    return this.repo.findById(id);
  }

  async update(id: string, dto: UpdateStockDto) {
    try {
      if (!dto.warehouse) {
        delete dto.warehouse;
      }
      return await this.repo.update(id, dto as any);
    } catch (error) {
      console.error("🔥 ERROR UPDATING STOCK:", error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  delete(id: string) {
    return this.repo.delete(id);
  }
}