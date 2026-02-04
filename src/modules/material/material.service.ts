import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Material } from '../../schemas/material.schema';
import { CreateMaterialDto } from './dto/create-material.dto';

@Injectable()
export class MaterialService {
  constructor(
    @InjectModel(Material.name)
    private readonly materialModel: Model<Material>,
  ) {}

  async create(dto: CreateMaterialDto) {
    return this.materialModel.create({
      name: dto.name,
      dimensionTypes: new Map(Object.entries(dto.dimensionTypes)),
    });
  }

  async findAll() {
    return this.materialModel.find().lean();
  }
}
