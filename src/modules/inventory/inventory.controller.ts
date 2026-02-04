import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InventoryService } from './inventory.service';
import { CloudinaryService } from './cloudinary.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Controller('inventory')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class InventoryController {
    constructor(
        private readonly inventoryService: InventoryService,
        private readonly cloudinaryService: CloudinaryService,
    ) { }

    @Post()
    @Permissions('can_create_inventory')
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
    @Permissions('can_view_inventory')
    findAll() {
        return this.inventoryService.findAll();
    }

    @Get(':id')
    @Permissions('can_view_inventory')
    findOne(@Param('id') id: string) {
        return this.inventoryService.findOne(id);
    }

    @Patch(':id')
    @Permissions('can_update_inventory')
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
        
        if (file) {
            
            const existingItem = await this.inventoryService.findOne(id);

            
            if (existingItem?.imageUrl) {
                try {
                    await this.cloudinaryService.deleteImage(existingItem.imageUrl);
                } catch (error) {
                    
                    console.error('Failed to delete old image:', error);
                }
            }

            
            const imageUrl = await this.cloudinaryService.uploadImage(file);

            
            const updatedData = {
                ...updateInventoryDto,
                imageUrl: imageUrl
            };

            return this.inventoryService.update(id, updatedData);
        }

        return this.inventoryService.update(id, updateInventoryDto);
    }


    

    @Delete(':id')
    @Permissions('can_delete_inventory')
    remove(@Param('id') id: string) {
        return this.inventoryService.remove(id);
    }
}