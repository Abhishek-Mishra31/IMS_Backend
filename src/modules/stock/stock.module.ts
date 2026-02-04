// src/stock/stock.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Stock, StockSchema } from '../../schemas/stock.schema';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { StockRepository } from './repositories/stock.repository';
import { CaslModule } from '../casl/casl.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Stock.name, schema: StockSchema },
    ]),
    CaslModule,
  ],
  controllers: [StockController],
  providers: [StockService, StockRepository],
})
export class StockModule {}
