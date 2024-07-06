import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@src/common/abstract.entity';
import { ProductEntity } from './product.entity';
import { UserEntity } from '@src/modules/user/entities/user.entity';

@Entity({ name: 'review' })
export class ReviewEntity extends AbstractEntity {
  @Column()
  product_id: number;

  @Column()
  user_id: number;

  @Column({ type: 'int', nullable: true })
  rating: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @ManyToOne(() => ProductEntity, (product) => product.reviews)
  product: ProductEntity;

  @ManyToOne(() => UserEntity, (user) => user.reviews)
  user: UserEntity;
}
