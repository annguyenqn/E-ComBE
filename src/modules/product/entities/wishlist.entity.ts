import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@src/common/abstract.entity';
import { ProductEntity } from './product.entity';
import { UserEntity } from '@src/modules/user/entities/user.entity';

@Entity({ name: 'wishlist' })
export class WishlistEntity extends AbstractEntity {
  @Column()
  user_id: number;

  @Column()
  product_id: number;

  @ManyToOne(() => UserEntity, (user) => user.wishlists)
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.wishlists)
  product: ProductEntity;
}
