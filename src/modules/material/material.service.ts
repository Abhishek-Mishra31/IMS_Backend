import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Material } from '../../schemas/material.schema';

@Injectable()
export class MaterialService {
  constructor(
    @InjectModel(Material.name)
    private readonly materialModel: Model<Material>,
  ) {}

  create(data: Partial<Material>) {
    return this.materialModel.create(data);
  }

  findAll() {
    return this.materialModel.find().lean();
  }
}
