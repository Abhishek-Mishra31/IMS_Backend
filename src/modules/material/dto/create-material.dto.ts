<<<<<<< HEAD
import { IsString, IsNotEmpty, IsObject } from 'class-validator';

export class CreateMaterialDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsObject()
    @IsNotEmpty()
    dimensionTypes: Record<string, string>;
=======
// dto/create-material.dto.ts
import { IsString, IsNotEmpty, IsObject } from 'class-validator';

export class CreateMaterialDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsObject()
  dimensionTypes: Record<string, string>;
>>>>>>> 25a0df2dd4701aec724510bc35dd2a8500363165
}
