import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractAuditTimeEntity {
  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt!: Date;
}

export abstract class AbstractEntity extends AbstractAuditTimeEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;
}
