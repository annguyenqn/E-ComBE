import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@src/common/abstract.entity';
import { ProductEntity } from './product.entity';

@Entity({ name: 'inventory' })
export class InventoryEntity extends AbstractEntity {
  @Column()
  product_id: number;

  @Column({ type: 'varchar', length: 10 })
  size: string;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @ManyToOne(() => ProductEntity, (product) => product.inventories)
  product: ProductEntity;
}
