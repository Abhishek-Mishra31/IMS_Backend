import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Inventory } from './inventory.schema';

@Schema({ timestamps: true })
export class Stock extends Document {
    @Prop({ type: Types.ObjectId, ref: 'Inventory', required: true, index: true })
    inventory: Types.ObjectId | Inventory;

    @Prop({ required: true })
    batchNumber: string;

    @Prop({ required: true, unique: true, index: true })
    serialNumber: string;

    @Prop({ type: Object, required: true })
    dimensions: Record<string, number>;

    @Prop({ required: true })
    quantity: number;

// ✅ Correct: No "required: true"
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Warehouse' }) 
  warehouse: string;
}

export const StockSchema = SchemaFactory.createForClass(Stock);
