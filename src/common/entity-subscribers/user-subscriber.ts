import {
  EventSubscriber,
  type EntitySubscriberInterface,
  type InsertEvent,
  type UpdateEvent,
} from 'typeorm';

import AppUtil from 'src/common/utils';
import { UserEntity } from 'src/modules/user/user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  listenTo(): typeof UserEntity {
    return UserEntity;
  }

  beforeInsert(event: InsertEvent<UserEntity>): void {
    if (event.entity.password) {
      event.entity.password = AppUtil.generateHash(event.entity.password);
    }
  }

  beforeUpdate(event: UpdateEvent<UserEntity>): void {
    const entity = event.entity as UserEntity;

    if (
      Boolean(entity.password) &&
      entity?.password !== event?.databaseEntity?.password
    ) {
      entity.password = AppUtil.generateHash(entity.password!);
    }
  }
}
