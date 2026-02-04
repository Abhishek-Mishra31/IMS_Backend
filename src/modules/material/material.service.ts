import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Material } from '../../schemas/material.schema';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Injectable()
export class MaterialService {
  constructor(
    @InjectModel(Material.name)
    private readonly materialModel: Model<Material>,
  ) { }

  async create(createMaterialDto: CreateMaterialDto) {
    const material = await this.materialModel.create(createMaterialDto);
    return material;
  }

  async findAll() {
    return this.materialModel.find().lean();
  }

  async findOne(id: string) {
    const material = await this.materialModel.findById(id).lean();
    if (!material) {
      throw new NotFoundException(`Material with ID ${id} not found`);
    }
    return material;
  }

  async update(id: string, updateMaterialDto: UpdateMaterialDto) {
    const material = await this.materialModel
      .findByIdAndUpdate(id, updateMaterialDto, { new: true })
      .lean();

    if (!material) {
      throw new NotFoundException(`Material with ID ${id} not found`);
    }
    return material;
  }

  async remove(id: string) {
    const material = await this.materialModel.findByIdAndDelete(id).lean();
    if (!material) {
      throw new NotFoundException(`Material with ID ${id} not found`);
    }
    return { message: 'Material deleted successfully', material };
  }
}
