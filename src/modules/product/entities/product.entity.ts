import { Column, Entity, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { AbstractEntity } from '@src/common/abstract.entity';
import { InventoryEntity } from './inventory.entity';
import { CategoryEntity } from './category.entity';
import { ProductImageEntity } from './productImage.entity';
import { TagsEntity } from './tags.entity';

@Entity({ name: 'products' })
export class ProductEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  sku: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
  price: number;

  @OneToMany(() => InventoryEntity, (inventory) => inventory.product)
  inventories: InventoryEntity[];

  @ManyToMany(() => CategoryEntity)
  @JoinTable({ name: 'product_category' })
  categories: CategoryEntity[];

  @OneToMany(() => ProductImageEntity, (images) => images.product)
  images: ProductImageEntity[];

  @ManyToMany(() => TagsEntity, (tag) => tag.products)
  @JoinTable()
  tags: TagsEntity[];
}
