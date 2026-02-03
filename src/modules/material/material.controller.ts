import { Controller, Get, Post, Body } from '@nestjs/common';
import { MaterialService } from './material.service';

@Controller('materials')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post()
  create(@Body() body: any) {
    return this.materialService.create(body);
  }

  @Get()
  findAll() {
    return this.materialService.findAll();
  }
}
