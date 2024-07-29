import {
  IsString,
  IsOptional,
  IsEnum,
  Length,
  IsArray,
  ArrayNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Gender } from '@src/common/constants/gender';
import { ApiProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';


class InventoryDto {
  @IsString()
  @ApiProperty({ example: 'M' })
  size: string;
  @IsNumber()
  @ApiProperty({ example: 10 })
  quantity: number;
}
export class CreateProductDto {
  @IsString()
  @ApiProperty({ example: 'abvc12' })
  @Length(1, 50)
  sku: string;

  @IsString()
  @ApiProperty({ example: 'áo thun q1' })
  @Length(1, 50)
  name: string;

  @IsEnum(Gender)
  @ApiProperty({ example: Gender.MALE, enum: Gender })
  gender: Gender;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'áo thun q1', required: false })
  description?: string;

  @IsNumber()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  @Transform(({ value }) => parseFloat(value))
  @ApiProperty({ example: 2000, required: true })
  price: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => InventoryDto)
  @ApiProperty({
    type: [InventoryDto],
    example: [
      { size: 'M', quantity: 10 },
      { size: 'L', quantity: 20 },
    ],
  })
  inventories: InventoryDto[];

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  @ApiProperty({ type: [Number], example: [1] })
  categories: number[];

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  @ApiProperty({ type: [Number], example: [1, 2, 3] })
  tags: number[];

  @ApiProperty({ type: 'string', format: 'binary' })
  files: Express.Multer.File[];
}
