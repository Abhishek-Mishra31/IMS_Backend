import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, unique: true, index: true })
    username: string;

    @Prop({ required: true, unique: true, index: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    refreshToken?: string;

    @Prop({ type: [String], default: [] })
    permissions: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
