// dto/create-material.dto.ts
import { IsString, IsNotEmpty, IsObject } from 'class-validator';

export class CreateMaterialDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsObject()
  dimensionTypes: Record<string, string>;
}
