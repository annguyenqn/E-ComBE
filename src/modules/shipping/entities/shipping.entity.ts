import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@src/common/abstract.entity';
import { OrderEntity } from '@src/modules/order/entities/oder.entity';

@Entity({ name: 'shipping' })
export class ShippingEntity extends AbstractEntity {
  @Column()
  order_id: number;

  @Column({ type: 'text', nullable: false })
  shipping_address: string;

  @Column({ type: 'timestamp', nullable: true })
  shipping_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  delivery_date: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  shipping_status: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  tracking_number: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  carrier: string;

  @ManyToOne(() => OrderEntity, (order) => order.shippings)
  order: OrderEntity;
}
