import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Material extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Object, required: true })
  dimensionTypes: Record<string, string>;
}

export const MaterialSchema = SchemaFactory.createForClass(Material);
