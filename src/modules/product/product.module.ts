import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductEntity } from './entities/product.entity';
import { CategoryEntity } from './entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImageEntity } from './entities/productImage.entity';
import { CloudinaryModule } from 'src/modules/cloudinary/cloudinary.module';
import { CloudinaryService } from 'src/modules/cloudinary/cloudinary.service';
import { TagsEntity } from './entities/tags.entity';
import { InventoryEntity } from './entities/inventory.entity';

@Module({
  imports: [
    CloudinaryModule,
    TypeOrmModule.forFeature([
      CategoryEntity,
      ProductEntity,
      ProductImageEntity,
      TagsEntity,
      InventoryEntity,
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, CloudinaryService],
})
export class ProductModule {}
