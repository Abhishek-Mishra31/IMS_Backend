import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
<<<<<<< HEAD
import { UpdateMaterialDto } from './dto/update-material.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PoliciesGuard } from '../casl/guards/policies.guard';
import { CheckPolicies } from '../casl/decorators/check-policies.decorator';
import { Action } from '../casl/casl-ability.factory';
=======
>>>>>>> 25a0df2dd4701aec724510bc35dd2a8500363165

@Controller('materials')
@UseGuards(JwtAuthGuard, PoliciesGuard)
export class MaterialController {
  constructor(private readonly materialService: MaterialService) { }

  @Post()
<<<<<<< HEAD
  @CheckPolicies((ability) => ability.can(Action.Create, 'material'))
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialService.create(createMaterialDto);
=======
  create(@Body() body: CreateMaterialDto) {
    return this.materialService.create(body);
>>>>>>> 25a0df2dd4701aec724510bc35dd2a8500363165
  }

  @Get()
  @CheckPolicies((ability) => ability.can(Action.View, 'material'))
  findAll() {
    return this.materialService.findAll();
  }

  @Get(':id')
  @CheckPolicies((ability) => ability.can(Action.View, 'material'))
  findOne(@Param('id') id: string) {
    return this.materialService.findOne(id);
  }

  @Patch(':id')
  @CheckPolicies((ability) => ability.can(Action.Update, 'material'))
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateMaterialDto: UpdateMaterialDto) {
    return this.materialService.update(id, updateMaterialDto);
  }

  @Delete(':id')
  @CheckPolicies((ability) => ability.can(Action.Delete, 'material'))
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.materialService.remove(id);
  }
}

