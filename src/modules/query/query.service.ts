import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Query } from '../../schemas/query.schema';
import { CreateQueryDto } from './dto/create-query.dto';

@Injectable()
export class QueryService {
    constructor(
        @InjectModel(Query.name) private queryModel: Model<Query>,
    ) { }

    async create(createQueryDto: CreateQueryDto): Promise<Query> {
        const query = new this.queryModel(createQueryDto);
        return query.save();
    }

    async findAll(): Promise<Query[]> {
        return this.queryModel.find().sort({ createdAt: -1 }).exec();
    }

    async findOne(id: string): Promise<Query | null> {
        return this.queryModel.findById(id).exec();
    }

    async updateStatus(id: string, status: string): Promise<Query | null> {
        return this.queryModel
            .findByIdAndUpdate(id, { status }, { new: true })
            .exec();
    }

    async delete(id: string): Promise<Query | null> {
        return this.queryModel.findByIdAndDelete(id).exec();
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> 1dde1c5e03416d0b09edd374d4e8977003b79ac6
