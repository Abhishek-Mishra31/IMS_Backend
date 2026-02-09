// src/app.module.ts
import { Module, Query } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { UsersModule } from './modules/users/users.module';
import { MaterialModule } from './modules/material/material.module';
import { StockModule } from './modules/stock/stock.module';
import { OrdersModule } from './modules/orders/order.module';
import { WarehouseModule } from './modules/warehouse/warehouse.module';
import { CaslModule } from './modules/casl/casl.module';
import { QueryModule } from './modules/query/query.module';
import { DatabaseModule } from './database';
import databaseConfig from './config/database.config';

// 1. IMPORT YOUR STOCK MODULE
import { StockModule } from './modules/stock/stock.module'; 
import { WarehouseModule } from './modules/warehouse/warehouse.module';
import { OrdersModule } from './modules/orders/order.module';
import { QueryModule } from './modules/query/query.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    DatabaseModule,
    AuthModule,
    InventoryModule,
    MaterialModule,
    UsersModule,
    CaslModule,
    StockModule,
    OrdersModule,
    WarehouseModule,
    QueryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }