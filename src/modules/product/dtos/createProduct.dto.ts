import {
  IsString,
  IsOptional,
  IsEnum,
  Length,
  IsArray,
  ArrayNotEmpty,
  IsNumber,
} from 'class-validator';
import { Gender } from '@src/common/constants/gender';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

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
