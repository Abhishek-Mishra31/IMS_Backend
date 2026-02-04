import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Material extends Document {

  @Prop({
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
    unique: true,
  })
  name: string;

  @Prop({
    type: Map,
    of: String,
    required: true,
    validate: {
      validator: (value: Map<string, string>) =>
        value.size > 0,
      message: 'dimensionTypes cannot be empty',
    },
  })
  dimensionTypes: Map<string, string>;
}

export const MaterialSchema = SchemaFactory.createForClass(Material);
