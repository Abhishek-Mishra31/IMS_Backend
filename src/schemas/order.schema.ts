import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';
import { Stock } from './stock.schema';
@Schema({ _id: false })
export class OrderItem {
  @Prop({ type: Types.ObjectId, ref: 'Stock', required: true })
  stock: Types.ObjectId | Stock;
  @Prop({ required: true, min: 1 })
  quantity: number;
  @Prop({ required: true, min: 0 })
  priceAtPurchase: number;
  @Prop({ required: true, min: 0 })
  subtotal: number;
}
export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  user: Types.ObjectId | User;
  @Prop({ required: true, unique: true, index: true })
  orderNumber: string;
  @Prop({
    type: String,
    enum: [
      'pending',
      'confirmed',
      'processing',
      'shipped',
      'delivered',
      'cancelled',
    ],
    default: 'pending',
    index: true,
  })
  status: string;
  @Prop({ type: [OrderItemSchema], required: true })
  items: OrderItem[];
  @Prop({ required: true, min: 0 })
  subtotal: number;
  @Prop({ default: 0, min: 0 })
  tax: number;
  @Prop({ default: 0, min: 0 })
  shippingCost: number;
  @Prop({ required: true, min: 0 })
  total: number;
  @Prop({ type: Object, required: true })
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  @Prop({
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending',
  })
  paymentStatus: string;
  @Prop({ type: String, enum: ['card', 'paypal', 'cash'] })
  paymentMethod: string;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
