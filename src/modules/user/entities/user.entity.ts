import { Column, Entity, OneToMany } from 'typeorm';

import { AbstractEntity } from '@src/common/abstract.entity';
import { Exclude } from 'class-transformer';
import { RoleType } from 'src/common/constants';
import { ReviewEntity } from '@src/modules/product/entities/review.entity';
import { WishlistEntity } from '@src/modules/product/entities/wishlist.entity';
import { CartEntity } from '@src/modules/cart/entities/cart.entity';
import { OrderEntity } from '@src/modules/order/entities/oder.entity';

@Entity({ name: 'users' })
// @UseDto(UserDto)
export class UserEntity extends AbstractEntity {
  @Column({ nullable: true, type: 'varchar' })
  firstName!: string | null;

  @Column({ nullable: true, type: 'varchar' })
  lastName!: string | null;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  role!: RoleType;

  @Column({ unique: true, nullable: true, type: 'varchar' })
  email: string;

  @Column({ nullable: true, type: 'varchar' })
  /*
   Auto hash using UserSubscriber
  */
  @Exclude()
  password?: string;

  @Column({ nullable: true, type: 'varchar' })
  phone!: string | null;

  @Column({ nullable: true, type: 'varchar' })
  avatar!: string | null;

  @Column({ nullable: true, type: 'varchar' })
  @Exclude()
  hashRefreshToken!: string | null;

  @Column({ nullable: true, type: 'varchar' })
  @Exclude()
  hashRecoveryToken!: string | null;

  @OneToMany(() => ReviewEntity, (review) => review.user)
  reviews: ReviewEntity[];

  @OneToMany(() => WishlistEntity, (wishlist) => wishlist.user)
  wishlists: WishlistEntity[];

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];

  @OneToMany(() => CartEntity, (cart) => cart.user)
  carts: CartEntity[];
}
