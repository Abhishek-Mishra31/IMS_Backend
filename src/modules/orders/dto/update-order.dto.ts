import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';


export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsOptional()
  @IsEnum([
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
  ])
  status?: string;
  @IsOptional()
  @IsEnum(['pending', 'paid', 'failed', 'refunded'])
  paymentStatus?: string;
}