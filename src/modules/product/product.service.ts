import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDto } from './dtos/createProduct.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProductPageOptionsDto } from './dtos/ProductPageOptionsDto';
import { PaginationDto } from '@src/common/dto/paginate.dto';
import { CategoryEntity } from './entities/category.entity';
import { CloudinaryService } from 'src/modules/cloudinary/cloudinary.service';
import { ProductImageEntity } from './entities/productImage.entity';
import { TagsEntity } from './entities/tags.entity';
import { InventoryEntity } from './entities/inventory.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(TagsEntity)
    private tagsRepository: Repository<TagsEntity>,
  ) {}
  async getProducts(
    pageOptionsDto: ProductPageOptionsDto,
  ): Promise<PaginationDto<ProductEntity>> {
    const { page, order, take, skip } = pageOptionsDto;
    const [products, total] = await this.productRepository.findAndCount({
      take,
      skip,
      order: {
        id: order,
      },
      relations: ['images'],
    });

    return {
      hasPreviousPage: page > 1,
      itemCount: products.length,
      pageCount: Math.ceil(total / take),
      values: products,
      hasNextPage: products.length === take,
      take,
      page,
    };
  }
  async getProductDetail(name: string) {
    const product = await this.productRepository.findOne({
      where: { name },
      relations: ['images', 'tags'],
    });
    if (!product) {
      throw new NotFoundException('Product is not found');
    }
    return product;
  }

  async createProducts(
    createProduct: CreateProductDto,
    files: Express.Multer.File[],
  ): Promise<ProductEntity> {
    const {
      categories: categoryIds,
      tags: tagIds,
      inventories: inventories,
      ...productData
    } = createProduct;

    const existingProduct = await this.productRepository.findOne({
      where: [{ sku: createProduct.sku }, { name: createProduct.name }],
    });

    if (existingProduct) {
      throw new ConflictException('Product code or name already exists');
    }

    const categories = await this.categoryRepository.findBy({
      id: In(categoryIds),
    });

    const tags = await this.tagsRepository.findBy({
      id: In(tagIds),
    });
    if (!tags.length) {
      throw new NotFoundException('One or more tags not found');
    }

    if (!categories.length) {
      throw new NotFoundException('One or more categories not found');
    }

    return this.productRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const product = transactionalEntityManager.create(ProductEntity, {
          ...productData,
          categories,
          tags,
        });

        const savedProduct = await transactionalEntityManager.save(product);

        const uploadResults = await this.cloudinaryService.uploadFiles(files);
        const uploadedImages = uploadResults.filter((result) => result.url);

        const productImages = uploadedImages.map((result) => {
          const image = new ProductImageEntity();
          image.url = result.url;
          image.product = savedProduct;
          return image;
        });
        const productInventories = inventories.map((inventoryItem) => {
          const inventory = new InventoryEntity();
          inventory.size = inventoryItem.size;
          inventory.quantity = inventoryItem.quantity;
          inventory.product = savedProduct;
          return inventory;
        });

        if (productImages && productInventories) {
          await transactionalEntityManager.save(
            ProductImageEntity,
            productImages,
          );
          await transactionalEntityManager.save(
            InventoryEntity,
            productInventories,
          );
        }
        return savedProduct;
      },
    );
  }
}
