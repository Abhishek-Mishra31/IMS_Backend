
import {
  IsString,
  IsArray,
  IsNumber,
  IsEnum,
  IsObject,
  ValidateNested,
  Min,
  IsNotEmpty,
} from 'class-validator';


import { Type } from 'class-transformer';
class OrderItemDto {
  @IsString()
  @IsNotEmpty()
  stock: string;
  @IsNumber()
  @Min(1)
  quantity: number;
  @IsNumber()
  @Min(0)
  priceAtPurchase: number;
}
class ShippingAddressDto {
  @IsString()
  @IsNotEmpty()
  street: string;
  @IsString()
  @IsNotEmpty()
  city: string;
  @IsString()
  @IsNotEmpty()
  state: string;
  @IsString()
  @IsNotEmpty()
  zipCode: string;
  @IsString()
  @IsNotEmpty()
  country: string;
}
export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
  @IsObject()
  @ValidateNested()
  @Type(() => ShippingAddressDto)
  shippingAddress: ShippingAddressDto;
  @IsEnum(['card', 'paypal', 'cash'])
  paymentMethod: string;
}
