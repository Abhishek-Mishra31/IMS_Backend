import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { WarehouseRepository } from './warehouse.repository';

@Injectable()
export class WarehouseService {
  constructor(private readonly repo: WarehouseRepository) {}

  async create(dto: CreateWarehouseDto) {
    return this.repo.create({ ...dto, inventories: [] });
  }

  async findAll() {
    return this.repo.findAll();
  }

  async findOne(id: string) {
    const warehouse = await this.repo.findById(id);
    if (!warehouse) throw new NotFoundException('Warehouse not found');
    return warehouse;
  }

  async update(id: string, dto: UpdateWarehouseDto) {
    const updated = await this.repo.update(id, dto);
    if (!updated) throw new NotFoundException('Warehouse not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.repo.delete(id);
    if (!deleted) throw new NotFoundException('Warehouse not found');
    return { message: 'Warehouse deleted' };
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 1dde1c5e03416d0b09edd374d4e8977003b79ac6
