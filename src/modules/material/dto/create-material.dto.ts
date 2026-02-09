<<<<<<< HEAD
// dto/create-material.dto.ts
import { IsString, IsNotEmpty, IsObject, IsOptional } from 'class-validator';
=======
import { IsString, IsNotEmpty, IsObject } from 'class-validator';
>>>>>>> 1dde1c5e03416d0b09edd374d4e8977003b79ac6

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