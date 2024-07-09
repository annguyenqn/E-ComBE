import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { CloudinaryResponse } from '@src/common/types/res-upload.type';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'auto',
            transformation: [
              { width: 150, height: 150, crop: 'fill' },
              { quality: 'auto:low' },
            ],
          },
          (error, result: UploadApiResponse | undefined) => {
            if (error) {
              return reject(error);
            }
            resolve(result as unknown as CloudinaryResponse);
          },
        )
        .end(file.buffer);
    });
  }
}
