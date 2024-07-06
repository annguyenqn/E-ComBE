import { Column, Entity, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { AbstractEntity } from '@src/common/abstract.entity';
import { InventoryEntity } from './inventory.entity';
import { ReviewEntity } from './review.entity';
import { WishlistEntity } from './wishlist.entity';
import { CategoryEntity } from './category.entity';

@Entity({ name: 'products' })
export class ProductEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  product_code: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  type: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => InventoryEntity, (inventory) => inventory.product)
  inventories: InventoryEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.product)
  reviews: ReviewEntity[];

  @OneToMany(() => WishlistEntity, (wishlist) => wishlist.product)
  wishlists: WishlistEntity[];

  @ManyToMany(() => CategoryEntity)
  @JoinTable({ name: 'product_category' })
  categories: CategoryEntity[];
}
