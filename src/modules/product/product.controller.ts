import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '@src/common/dto/paginate.dto';
import { ProductPageOptionsDto } from './dtos/ProductPageOptionsDto';
// import { CreateProductDto } from './dtos/createProduct.dto';
import { ProductEntity } from './entities/product.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dtos/createProduct.dto';

@ApiTags('products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files', 10))
  async createProduct(
    @UploadedFiles() files: Express.Multer.File[],
    @Body(new ValidationPipe({ transform: true }))
    createProductDto: CreateProductDto,
  ) {
    return this.productService.createProducts(createProductDto, files);
  }

  @Get()
  getProducts(
    @Query()
    pageOptionsDto: ProductPageOptionsDto,
  ): Promise<PaginationDto<ProductEntity>> {
    return this.productService.getProducts(pageOptionsDto);
  }
}
