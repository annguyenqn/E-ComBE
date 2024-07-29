import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '@src/common/shared/shared.module';
import { UserEntity } from '@src/modules/user/entities/user.entity';
import { DatabaseModule } from 'src/common/database/database.module';
import { SeedService } from './seed.service';
import { CategoryEntity } from '@src/modules/product/entities/category.entity';
import { ProductEntity } from '@src/modules/product/entities/product.entity';
import { ProductImageEntity } from '@src/modules/product/entities/productImage.entity';
import { TagsEntity } from '@src/modules/product/entities/tags.entity';
import { InventoryEntity } from '@src/modules/product/entities/inventory.entity';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SharedModule,
    TypeOrmModule.forFeature([
      UserEntity,
      CategoryEntity,
      ProductEntity,
      ProductImageEntity,
      TagsEntity,
      InventoryEntity,
    ]),
  ],
  providers: [SeedService],
})
export class SeedModule {}
