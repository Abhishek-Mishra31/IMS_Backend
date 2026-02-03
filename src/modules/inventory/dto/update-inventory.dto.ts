import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsMongoId } from 'class-validator';

export class UpdateInventoryDto {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    name?: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    kind?: string;

    @IsMongoId()
    @IsOptional()
    @IsNotEmpty()
    material?: string;

    @IsBoolean()
    @IsOptional()
    isHidden?: boolean;
}
