import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsMongoId, IsUrl } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateInventoryDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    name: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    kind: string;

    @IsMongoId()
    @IsNotEmpty()
    material: string;

<<<<<<< HEAD
    // 👇 ADD THIS FIELD 👇
    @IsMongoId()
    @IsOptional()
    warehouse?: string;
=======
    @IsMongoId()
    @IsNotEmpty()
    warehouse: string;
>>>>>>> 1dde1c5e03416d0b09edd374d4e8977003b79ac6

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
    @IsUrl({}, { message: 'Image URL must be a valid URL address' })
    imageUrl?: string;
}