import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
<<<<<<< HEAD
  IsOptional, // 👈 Import this
=======
  Min,
>>>>>>> 1dde1c5e03416d0b09edd374d4e8977003b79ac6
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
<<<<<<< HEAD
}
=======

  @IsNumber()
  @Min(0)
  price: number;
}
>>>>>>> 1dde1c5e03416d0b09edd374d4e8977003b79ac6
