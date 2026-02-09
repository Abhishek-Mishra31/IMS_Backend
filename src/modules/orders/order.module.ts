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
<<<<<<< HEAD
export class OrdersModule {}
=======
export class OrdersModule {}
>>>>>>> 1dde1c5e03416d0b09edd374d4e8977003b79ac6
