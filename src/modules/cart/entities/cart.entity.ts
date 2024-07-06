import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from '@src/modules/user/entities/user.entity';
import { CartItemEntity } from './cartItem.entity';
import { AbstractEntity } from '@src/common/abstract.entity';

@Entity({ name: 'cart' })
export class CartEntity extends AbstractEntity {
  @Column()
  user_id: number;

  @ManyToOne(() => UserEntity, (user) => user.carts)
  user: UserEntity;

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.cart)
  cartItems: CartItemEntity[];
}
