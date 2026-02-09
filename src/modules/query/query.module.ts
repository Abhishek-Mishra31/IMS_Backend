import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QueryController } from './query.controller';
import { QueryService } from './query.service';
import { Query, QuerySchema } from '../../schemas/query.schema';
import { CaslModule } from '../casl/casl.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Query.name, schema: QuerySchema }]),
        CaslModule,
    ],
    controllers: [QueryController],
    providers: [QueryService],
    exports: [QueryService],
})
<<<<<<< HEAD
export class QueryModule { }
=======
export class QueryModule { }
>>>>>>> 1dde1c5e03416d0b09edd374d4e8977003b79ac6
