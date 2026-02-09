<<<<<<< HEAD

=======
>>>>>>> 1dde1c5e03416d0b09edd374d4e8977003b79ac6
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Inventory } from './inventory.schema';

@Schema({ timestamps: true })
export class Warehouse extends Document {
  @Prop({ required: true, unique: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  location: string;

<<<<<<< HEAD
  @Prop({ type: Number, default: 0 }) 
  capacity: number;
  
=======
>>>>>>> 1dde1c5e03416d0b09edd374d4e8977003b79ac6
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Inventory' }], default: [] })
  inventories: Types.ObjectId[] | Inventory[];
}

export const WarehouseSchema = SchemaFactory.createForClass(Warehouse);
