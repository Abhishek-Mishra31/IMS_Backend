import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Query extends Document {
    @Prop({ required: true, trim: true })
    firstName: string;

    @Prop({ required: true, trim: true })
    lastName: string;

    @Prop({ required: true, trim: true, lowercase: true })
    email: string;

    @Prop({ required: true, trim: true })
    subject: string;

    @Prop({ required: true, trim: true })
    message: string;

    @Prop({ type: String, enum: ['pending', 'in-progress', 'resolved'], default: 'pending' })
    status: string;
}

export const QuerySchema = SchemaFactory.createForClass(Query);