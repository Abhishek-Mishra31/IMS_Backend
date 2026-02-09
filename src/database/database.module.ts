import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './database.service';
import databaseConfig from '../config/database.config';

@Global()
@Module({
    imports: [
        ConfigModule.forFeature(databaseConfig),
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>('database.MONGODB_URI'),
                // Note: No extra options needed for Mongoose 7/8/9+
            }),
        }),
    ],
    providers: [DatabaseService],
    exports: [DatabaseService],
})
export class DatabaseModule { }