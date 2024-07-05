import { ApiProperty } from '@nestjs/swagger';
import { BooleanField, NumberField } from 'src/common/decorators';

export class PaginationDto<T> {
  @NumberField()
  readonly page: number;

  @NumberField()
  readonly take: number;

  @NumberField()
  readonly itemCount: number;

  @NumberField()
  readonly pageCount: number;

  @BooleanField()
  readonly hasPreviousPage: boolean;

  @BooleanField()
  readonly hasNextPage: boolean;

  @ApiProperty({ isArray: true })
  readonly values: T[];
}
