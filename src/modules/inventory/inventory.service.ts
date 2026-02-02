import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory } from '../../schemas';

@Injectable()
export class InventoryService {
    constructor(
        // Injecting the Inventory Model so we can query the DB
        @InjectModel(Inventory.name) private inventoryModel: Model<Inventory>
    ) { }

    // Create a new inventory item
    async create(data: any): Promise<Inventory> {
        const createdInventory = new this.inventoryModel(data);
        return createdInventory.save();
    }

    // Get all items and populate the 'material' details
    async findAll(): Promise<Inventory[]> {
        return this.inventoryModel.find().populate('material').exec();
    }

    // Find one item by ID
    async findOne(id: string): Promise<Inventory> {
        const inventory = await this.inventoryModel.findById(id).populate('material').exec();
        if (!inventory) {
            throw new NotFoundException(`Inventory item with ID ${id} not found`);
        }
        return inventory;
    }

    // Update an item
    async update(id: string, data: any): Promise<Inventory> {
        const updatedInventory = await this.inventoryModel
            .findByIdAndUpdate(id, data, { new: true }) // { new: true } returns the updated document
            .populate('material')
            .exec();

        if (!updatedInventory) {
            throw new NotFoundException(`Inventory item with ID ${id} not found`);
        }
        return updatedInventory;
    }

    // Delete an item
    async remove(id: string): Promise<Inventory> {
        const deletedInventory = await this.inventoryModel.findByIdAndDelete(id).exec();
        if (!deletedInventory) {
            throw new NotFoundException(`Inventory item with ID ${id} not found`);
        }
        return deletedInventory;
    }
}