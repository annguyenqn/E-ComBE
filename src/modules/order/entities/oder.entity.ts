import { Column, Entity, OneToMany, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@src/common/abstract.entity';
import { UserEntity } from '@src/modules/user/entities/user.entity';
import { OrderDetailEntity } from './orderDetail.entity';
import { PaymentEntity } from '@src/modules/payment/entities/payment.entity';
import { OrderHistoryEntity } from './orderHistory.entity';

@Entity({ name: 'order' })
export class OrderEntity extends AbstractEntity {
  @Column()
  user_id: number;

  @Column({ type: 'varchar', length: 10, nullable: false })
  status: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
  total: number;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  @OneToMany(() => OrderDetailEntity, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetailEntity[];

  @OneToMany(() => PaymentEntity, (payment) => payment.order)
  payments: PaymentEntity[];

  @OneToMany(() => OrderHistoryEntity, (orderHistory) => orderHistory.order)
  orderHistories: OrderHistoryEntity[];
}
