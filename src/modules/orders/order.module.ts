import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../../schemas/order.schema';
import { Stock, StockSchema } from '../../schemas/stock.schema';
import { OrdersController } from './order.controller';
import { OrdersService } from './order.service';
import { CaslModule } from '../casl/casl.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Stock.name, schema: StockSchema },
    ]),
    CaslModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}