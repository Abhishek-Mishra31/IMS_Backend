import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InventoryService } from './inventory.service';
import { CloudinaryService } from './cloudinary.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PoliciesGuard } from '../casl/guards/policies.guard';
import { CheckPolicies } from '../casl/decorators/check-policies.decorator';
import { Action } from '../casl/casl-ability.factory';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Controller('inventory')
@UseGuards(JwtAuthGuard, PoliciesGuard)
export class InventoryController {
    constructor(
        private readonly inventoryService: InventoryService,
        private readonly cloudinaryService: CloudinaryService,
    ) { }

    @Post()
    @CheckPolicies((ability) => ability.can(Action.Create, 'inventory'))
    @UseInterceptors(FileInterceptor('image', {
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
                return cb(new Error('Only image files are allowed!'), false);
            }
            cb(null, true);
        },
        limits: { fileSize: 5 * 1024 * 1024 }
    }))
    async create(
        @Body() createInventoryDto: CreateInventoryDto,
        @UploadedFile() file?: Express.Multer.File
    ) {
        if (file) {
            const imageUrl = await this.cloudinaryService.uploadImage(file);
            createInventoryDto.imageUrl = imageUrl;
        }

        return this.inventoryService.create(createInventoryDto);
    }








    @Get()
    @CheckPolicies((ability) => ability.can(Action.View, 'inventory'))
    findAll() {
        return this.inventoryService.findAll();
    }

    @Get(':id')
    @CheckPolicies((ability) => ability.can(Action.View, 'inventory'))
    findOne(@Param('id') id: string) {
        return this.inventoryService.findOne(id);
    }

    @Patch(':id')
    @CheckPolicies((ability) => ability.can(Action.Update, 'inventory'))
    @UseInterceptors(FileInterceptor('image', {
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
                return cb(new Error('Only image files are allowed!'), false);
            }
            cb(null, true);
        },
        limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
    }))
    async update(
        @Param('id') id: string,
        @Body() updateInventoryDto: UpdateInventoryDto,
        @UploadedFile() file?: Express.Multer.File
    ) {
        // If a new image file is uploaded
        if (file) {
            // Get the current inventory item to retrieve old image URL
            const existingItem = await this.inventoryService.findOne(id);

            // Delete old image from Cloudinary if it exists
            if (existingItem?.imageUrl) {
                try {
                    await this.cloudinaryService.deleteImage(existingItem.imageUrl);
                } catch (error) {
                    // Log error but continue with update
                    console.error('Failed to delete old image:', error);
                }
            }

            // Upload new image to Cloudinary
            const imageUrl = await this.cloudinaryService.uploadImage(file);

            // Create a new object to ensure we include the new imageUrl
            const updatedData = {
                ...updateInventoryDto,
                imageUrl: imageUrl
            };

            return this.inventoryService.update(id, updatedData);
        }

        return this.inventoryService.update(id, updateInventoryDto);
    }




    @Delete(':id')
    @CheckPolicies((ability) => ability.can(Action.Delete, 'inventory'))
    remove(@Param('id') id: string) {
        return this.inventoryService.remove(id);
    }
}