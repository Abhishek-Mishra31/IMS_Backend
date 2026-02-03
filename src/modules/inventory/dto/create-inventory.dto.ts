import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsMongoId } from 'class-validator';

export class CreateInventoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    kind: string;

    @IsMongoId()
    @IsNotEmpty()
    material: string; 

    @IsBoolean()
    @IsOptional()
    isHidden?: boolean;
}
