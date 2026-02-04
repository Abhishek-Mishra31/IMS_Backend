import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import {
    Material,
    MaterialSchema,
    Inventory,
    InventorySchema,
    Stock,
    StockSchema,
} from '../../schemas';
import { CloudinaryProvider } from '../../config/cloudinary.config';
import { CloudinaryService } from './cloudinary.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Material.name, schema: MaterialSchema },
            { name: Inventory.name, schema: InventorySchema },
            { name: Stock.name, schema: StockSchema },
        ]),
    ],
    controllers: [InventoryController],
    providers: [InventoryService,
        CloudinaryProvider,
        CloudinaryService,
    ],
    exports: [InventoryService],
})
export class InventoryModule { }
