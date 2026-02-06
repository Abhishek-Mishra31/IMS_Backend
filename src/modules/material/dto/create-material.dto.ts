// dto/create-material.dto.ts
import { IsString, IsNotEmpty, IsObject, IsOptional } from 'class-validator';

export class CreateMaterialDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  // 👇 ADD THIS: Helpful for UI
  @IsString()
  @IsOptional()
  description?: string; 

  // 👇 UPDATE THIS: Make it Optional so creating simple categories doesn't fail
  @IsObject()
  @IsOptional()
  dimensionTypes?: Record<string, string>; 
}