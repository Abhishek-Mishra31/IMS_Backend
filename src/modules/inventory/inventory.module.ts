import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
    Material,
    MaterialSchema,
    Inventory,
    InventorySchema,
    Stock,
    StockSchema,
} from '../../schemas';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Material.name, schema: MaterialSchema },
            { name: Inventory.name, schema: InventorySchema },
            { name: Stock.name, schema: StockSchema },
        ]),
    ],
})
export class InventoryModule { }
