import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '@src/common/abstract.entity';
import { ProductEntity } from './product.entity';
import { CartItemEntity } from '@src/modules/cart/entities/cartItem.entity';
import { OrderDetailEntity } from '@src/modules/order/entities/orderDetail.entity';

@Entity({ name: 'inventory' })
export class InventoryEntity extends AbstractEntity {
  @Column()
  product_id: number;

  @Column({ type: 'varchar', length: 30 })
  color: string;

  @Column({ type: 'varchar', length: 10 })
  sex: string;

  @Column({ type: 'varchar', length: 10 })
  size: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'int', default: 0 })
  count: number;

  @Column({ type: 'varchar', length: 10, nullable: false })
  status: string;

  @Column({ type: 'boolean', default: true })
  is_in_stock: boolean;

  @ManyToOne(() => ProductEntity, (product) => product.inventories)
  product: ProductEntity;

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.inventory)
  cartItems: CartItemEntity[];

  @OneToMany(() => OrderDetailEntity, (orderDetail) => orderDetail.inventory)
  orderDetails: OrderDetailEntity[];
}
