import { IsOptional, IsString } from 'class-validator';

export class UpdateWarehouseDto {
  @IsString()
  name: string;

  @IsString()
  location: string;
<<<<<<< HEAD
}
=======
}
>>>>>>> 1dde1c5e03416d0b09edd374d4e8977003b79ac6
