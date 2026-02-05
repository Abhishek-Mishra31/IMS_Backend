import { IsString, IsBoolean, IsOptional, IsMongoId, ValidateIf, IsUrl } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateInventoryDto {
    @IsString()
    @IsOptional()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    name?: string;

    @IsString()
    @IsOptional()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    kind?: string;

    @IsMongoId()
    @ValidateIf((o) => o.material !== undefined && o.material !== null && o.material !== '')
    @IsOptional()
    material?: string;

    @IsMongoId()
    @IsOptional()
    warehouse?: string;

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
