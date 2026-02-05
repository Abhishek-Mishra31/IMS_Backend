import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  Min,
} from 'class-validator';

export class CreateStockDto {
  @IsMongoId()
  inventory: string;

  @IsString()
  @IsNotEmpty()
  batchNumber: string;

  @IsString()
  @IsNotEmpty()
  serialNumber: string;

  @IsObject()
  dimensions: Record<string, number>;

  @IsNumber()
  quantity: number;

  @IsNumber()
  @Min(0)
  price: number;
}
