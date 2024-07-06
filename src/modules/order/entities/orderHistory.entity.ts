import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@src/common/abstract.entity';
import { OrderEntity } from './oder.entity';

@Entity({ name: 'order_history' })
export class OrderHistoryEntity extends AbstractEntity {
  @Column()
  order_id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  status: string;

  @ManyToOne(() => OrderEntity, (order) => order.orderHistories)
  order: OrderEntity;
}
