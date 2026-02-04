import { IsString, IsNotEmpty, IsObject } from 'class-validator';

export class CreateMaterialDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsObject()
    @IsNotEmpty()
    dimensionTypes: Record<string, string>;
}
