import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Warehouse, WarehouseSchema } from '../../schemas/warehouse.schema';
import { WarehouseController } from './warehouse.controller';
import { WarehouseService } from './warehouse.service';
import { WarehouseRepository } from './warehouse.repository';
import { CaslModule } from '../casl/casl.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Warehouse.name, schema: WarehouseSchema },
    ]),
    CaslModule,
  ],
  controllers: [WarehouseController],
  providers: [WarehouseService, WarehouseRepository],
  exports: [WarehouseService],
})
export class WarehouseModule { }