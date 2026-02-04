import { IsString, IsBoolean, IsOptional, IsMongoId, ValidateIf } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateInventoryDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    kind?: string;

    @IsMongoId()
    @ValidateIf((o) => o.material !== undefined && o.material !== null && o.material !== '')
    @IsOptional()
    material?: string;

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
