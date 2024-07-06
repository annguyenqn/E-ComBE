import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@src/common/abstract.entity';
import { CartEntity } from './cart.entity';
import { InventoryEntity } from '@src/modules/product/entities/inventory.entity';

@Entity({ name: 'cart_item' })
export class CartItemEntity extends AbstractEntity {
  @Column()
  cart_id: number;

  @Column()
  inventory_id: number;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @ManyToOne(() => CartEntity, (cart) => cart.cartItems)
  cart: CartEntity;

  @ManyToOne(() => InventoryEntity, (inventory) => inventory.cartItems)
  inventory: InventoryEntity;
}
