import { Column, Entity, ManyToMany } from 'typeorm';
import { AbstractEntity } from '@src/common/abstract.entity';
import { ProductEntity } from './product.entity';

@Entity({ name: 'category' })
export class CategoryEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToMany(() => ProductEntity, (product) => product.categories)
  products: ProductEntity[];
}
