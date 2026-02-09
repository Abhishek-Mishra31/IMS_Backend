import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory, Warehouse } from '../../schemas';

@Injectable()
export class InventoryService {
    constructor(
        @InjectModel(Inventory.name) private inventoryModel: Model<Inventory>,
        @InjectModel(Warehouse.name) private warehouseModel: Model<Warehouse>
    ) { }

    async create(data: any): Promise<Inventory> {
        const createdInventory = new this.inventoryModel(data);
        const savedInventory = await createdInventory.save();

        if (data.warehouse) {
            await this.warehouseModel.updateOne(
                { _id: data.warehouse },
                { $addToSet: { inventories: savedInventory._id } }
            );
        }

        const inventory = await this.inventoryModel
            .findById(savedInventory._id)
            .populate('material')
            .populate('warehouse')
            .exec();

        if (!inventory) {
            throw new NotFoundException(`Failed to retrieve created inventory item`);
        }

        return inventory;
    }

    async findAll(): Promise<Inventory[]> {
        return this.inventoryModel
            .find()
            .populate('material')
            .populate('warehouse')
            .exec();
    }

    async findOne(id: string): Promise<Inventory> {
        const inventory = await this.inventoryModel
            .findById(id)
            .populate('material')
            .populate('warehouse')
            .exec();

        if (!inventory) {
            throw new NotFoundException(`Inventory item with ID ${id} not found`);
        }
        return inventory;
    }

    async update(id: string, data: any): Promise<Inventory> {
        const oldInventory = await this.inventoryModel.findById(id);

        if (!oldInventory) {
            throw new NotFoundException(`Inventory item with ID ${id} not found`);
        }

        if (data.warehouse && data.warehouse !== oldInventory.warehouse?.toString()) {
            await this.warehouseModel.updateOne(
                { _id: oldInventory.warehouse },
                { $pull: { inventories: id } }
            );

            await this.warehouseModel.updateOne(
                { _id: data.warehouse },
                { $addToSet: { inventories: id } }
            );
        }

        const updatedInventory = await this.inventoryModel
            .findByIdAndUpdate(id, data, { new: true })
            .populate('material')
            .populate('warehouse')
            .exec();

        if (!updatedInventory) {
            throw new NotFoundException(`Inventory item with ID ${id} not found after update`);
        }

        return updatedInventory;
    }

    async remove(id: string): Promise<Inventory> {
        const deletedInventory = await this.inventoryModel.findById(id);

        if (!deletedInventory) {
            throw new NotFoundException(`Inventory item with ID ${id} not found`);
        }

        if (deletedInventory.warehouse) {
            await this.warehouseModel.updateOne(
                { _id: deletedInventory.warehouse },
                { $pull: { inventories: id } }
            );
        }

        await this.inventoryModel.findByIdAndDelete(id);
        return deletedInventory;
    }
}