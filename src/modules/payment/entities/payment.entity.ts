import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@src/common/abstract.entity';
import { OrderEntity } from '@src/modules/order/entities/oder.entity';

@Entity({ name: 'payment' })
export class PaymentEntity extends AbstractEntity {
  @Column()
  order_id: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
  amount: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  payment_method: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  payment_status: string;

  @ManyToOne(() => OrderEntity, (order) => order.payments)
  order: OrderEntity;
}
