import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Inventory } from './inventory.schema';

@Schema({ timestamps: true })
export class Warehouse extends Document {
  @Prop({ required: true, unique: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  location: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Inventory' }], default: [] })
  inventories: Types.ObjectId[] | Inventory[];
}

export const WarehouseSchema = SchemaFactory.createForClass(Warehouse);
