import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@src/common/abstract.entity';
import { OrderEntity } from './oder.entity';

@Entity({ name: 'order_detail' })
export class OrderDetailEntity extends AbstractEntity {
  @Column()
  order_id: number;

  @Column()
  inventory_id: number;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
  price: number;

  @ManyToOne(() => OrderEntity, (order) => order.orderDetails)
  order: OrderEntity;
}
