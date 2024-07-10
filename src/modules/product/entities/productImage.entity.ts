import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@src/common/abstract.entity';
import { ProductEntity } from './product.entity';

@Entity({ name: 'images' })
export class ProductImageEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  url: string;

  @ManyToOne(() => ProductEntity, (product) => product.images)
  product: ProductEntity;
}
