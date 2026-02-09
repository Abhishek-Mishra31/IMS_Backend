<<<<<<< HEAD
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateWarehouseDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsNumber()
    capacity?: number;

}
=======
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWarehouseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  location: string;
}
>>>>>>> 1dde1c5e03416d0b09edd374d4e8977003b79ac6
