import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';
@Injectable()
export class CloudinaryService {
    async uploadImage(file: Express.Multer.File): Promise<string> {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'inventory',
                    resource_type: 'image',
                },
                (error, result) => {
                    if (error) return reject(error);
                    if (!result) return reject(new Error('Upload failed'));
                    resolve(result.secure_url);
                },
            );
            streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });
    }
    async deleteImage(imageUrl: string): Promise<void> {
        const parts = imageUrl.split('/');
        const filename = parts[parts.length - 1];
        const publicId = `inventory/${filename.split('.')[0]}`;

        await cloudinary.uploader.destroy(publicId);
    }
}