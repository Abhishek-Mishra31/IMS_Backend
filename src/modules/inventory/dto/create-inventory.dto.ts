import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsMongoId } from 'class-validator';
import { Transform } from 'class-transformer';

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
    @Transform(({ value }) => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return value;
    })
    isHidden?: boolean;

    @IsString()
    @IsOptional()
    imageUrl?: string;
}
