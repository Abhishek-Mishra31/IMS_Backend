import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Material } from './material.schema';

@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Inventory extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  kind: string;

  @Prop({ type: Types.ObjectId, ref: 'Material', required: true, index: true })
  material: Types.ObjectId | Material;

  @Prop({ default: false })
  isHidden: boolean;

  @Prop()
  imageUrl?: string;

  @Prop({ type: Types.ObjectId, ref: 'Warehouse', required: true, index: true })
  warehouse: Types.ObjectId;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);

// Virtual field for stock items
InventorySchema.virtual('stock', {
  ref: 'Stock',
  localField: '_id',
  foreignField: 'inventory',
});
