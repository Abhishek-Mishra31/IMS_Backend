import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../../schemas/order.schema';
import { Stock } from '../../schemas/stock.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Stock.name) private stockModel: Model<Stock>,
  ) {}

  async create(userId: string, createOrderDto: CreateOrderDto) {
    for (const item of createOrderDto.items) {
      const stock = await this.stockModel.findById(item.stock);
      if (!stock) {
        throw new NotFoundException(`Stock ${item.stock} not found`);
      }
      if (stock.quantity < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for ${item.stock}. Available: ${stock.quantity}, Requested: ${item.quantity}`,
        );
      }
    }

    const items = createOrderDto.items.map((item) => ({
      ...item,
      subtotal: item.quantity * item.priceAtPurchase,
    }));
    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
    const tax = subtotal * 0.1;
    const shippingCost = 10;
    const total = subtotal + tax + shippingCost;

    const orderCount = await this.orderModel.countDocuments();
    const orderNumber = `ORD-${new Date().getFullYear()}-${String(orderCount + 1).padStart(5, '0')}`;

    const order = await this.orderModel.create({
      user: userId,
      orderNumber,
      items,
      subtotal,
      tax,
      shippingCost,
      total,
      shippingAddress: createOrderDto.shippingAddress,
      paymentMethod: createOrderDto.paymentMethod,
    });

    for (const item of createOrderDto.items) {
      await this.stockModel.findByIdAndUpdate(item.stock, {
        $inc: { quantity: -item.quantity },
      });
    }
    return order;
  }
  async findAll() {
    return this.orderModel
      .find()
      .populate('user', 'username email')
      .populate({
        path: 'items.stock',
        populate: {
          path: 'inventory',
          populate: { path: 'material' },
        },
      })
      .sort({ createdAt: -1 })
      .lean();
  }
  async findByUser(userId: string) {
    return this.orderModel
      .find({ user: userId })
      .populate({
        path: 'items.stock',
        populate: {
          path: 'inventory',
          populate: { path: 'material' },
        },
      })
      .sort({ createdAt: -1 })
      .lean();
  }
  async findOne(id: string) {
    const order = await this.orderModel
      .findById(id)
      .populate('user', 'username email')
      .populate({
        path: 'items.stock',
        populate: {
          path: 'inventory',
          populate: { path: 'material' },
        },
      })
      .lean();
    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }
    return order;
  }
  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderModel
      .findByIdAndUpdate(id, updateOrderDto, { new: true })
      .lean();
    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }
    return order;
  }
  async cancel(id: string) {
    const order = await this.orderModel.findById(id);

    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }
    if (order.status !== 'pending') {
      throw new BadRequestException('Only pending orders can be cancelled');
    }

    for (const item of order.items) {
      await this.stockModel.findByIdAndUpdate(item.stock, {
        $inc: { quantity: item.quantity },
      });
    }
    order.status = 'cancelled';
    await order.save();
    return order;
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 1dde1c5e03416d0b09edd374d4e8977003b79ac6
