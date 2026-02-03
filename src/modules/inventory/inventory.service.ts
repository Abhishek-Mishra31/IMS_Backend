import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory } from '../../schemas';

@Injectable()
export class InventoryService {
    constructor(
        
        @InjectModel(Inventory.name) private inventoryModel: Model<Inventory>
    ) { }

    async create(data: any): Promise<Inventory> {
        const createdInventory = new this.inventoryModel(data);
        return createdInventory.save();
    }

    async findAll(): Promise<Inventory[]> {
        return this.inventoryModel.find().populate('material').exec();
    }
    async findOne(id: string): Promise<Inventory> {
        const inventory = await this.inventoryModel.findById(id).populate('material').exec();
        if (!inventory) {
            throw new NotFoundException(`Inventory item with ID ${id} not found`);
        }
        return inventory;
    }

    
    async update(id: string, data: any): Promise<Inventory> {
        const updatedInventory = await this.inventoryModel
            .findByIdAndUpdate(id, data, { new: true })
            .populate('material')
            .exec();

        if (!updatedInventory) {
            throw new NotFoundException(`Inventory item with ID ${id} not found`);
        }
        return updatedInventory;
    }

    async remove(id: string): Promise<Inventory> {
        const deletedInventory = await this.inventoryModel.findByIdAndDelete(id).exec();
        if (!deletedInventory) {
            throw new NotFoundException(`Inventory item with ID ${id} not found`);
        }
        return deletedInventory;
    }
}