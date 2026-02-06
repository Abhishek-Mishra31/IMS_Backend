import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  IsOptional, // 👈 Import this
} from 'class-validator';

export class CreateStockDto {
  @IsMongoId()
  inventory: string;

  // 👇 ADD THIS FIELD 👇
  @IsMongoId()
  @IsOptional()
  warehouse?: string; 

  @IsString()
  @IsNotEmpty()
  batchNumber: string;

  @IsString()
  @IsNotEmpty()
  serialNumber: string;

  @IsObject()
  @IsOptional() // Make dimensions optional just in case
  dimensions?: Record<string, number>;

  @IsNumber()
  quantity: number;
}