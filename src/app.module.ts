import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from './config/database.config';
import { MaterialModule } from './modules/material/material.module';

@Module({
  imports: [
    // ✅ ConfigModule MUST be first
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),

    // ✅ Proper async mongoose init
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // 👈 THIS IS THE FIX
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('database.MONGODB_URI'),
        dbName: configService.get<string>('database.DB_NAME'),
      }),
    }),

    MaterialModule,
  ],
})
export class AppModule {}
