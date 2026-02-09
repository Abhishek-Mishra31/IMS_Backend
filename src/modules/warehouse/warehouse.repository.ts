import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Warehouse } from '../../schemas/warehouse.schema';
import { Model } from 'mongoose';
import { IWarehouse } from './interfaces/warehouse.interface';

@Injectable()
export class WarehouseRepository {
  constructor(
    @InjectModel(Warehouse.name)
    private readonly warehouseModel: Model<Warehouse>,
  ) { }

  create(data: IWarehouse) {
    return this.warehouseModel.create(data);
  }

  findAll() {
    return this.warehouseModel
      .find()
      .populate({
        path: 'inventories',
        populate: [
          { path: 'material' },
<<<<<<< HEAD
=======
          { path: 'stock' }
>>>>>>> 1dde1c5e03416d0b09edd374d4e8977003b79ac6
        ]
      });
  }

  findById(id: string) {
    return this.warehouseModel
      .findById(id)
      .populate({
        path: 'inventories',
        populate: [
          { path: 'material' },
<<<<<<< HEAD
=======
          { path: 'stock' }
>>>>>>> 1dde1c5e03416d0b09edd374d4e8977003b79ac6
        ]
      });
  }

  update(id: string, data: Partial<IWarehouse>) {
    return this.warehouseModel.findByIdAndUpdate(id, data, { new: true });
  }

  delete(id: string) {
    return this.warehouseModel.findByIdAndDelete(id);
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 1dde1c5e03416d0b09edd374d4e8977003b79ac6
