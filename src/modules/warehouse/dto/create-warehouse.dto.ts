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