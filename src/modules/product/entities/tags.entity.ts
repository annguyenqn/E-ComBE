import { Column, Entity, ManyToMany } from 'typeorm';
import { AbstractEntity } from '@src/common/abstract.entity';
import { ProductEntity } from './product.entity';

@Entity({ name: 'tags' })
export class TagsEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @ManyToMany(() => ProductEntity, (product) => product.tags)
  products: ProductEntity[];
}
