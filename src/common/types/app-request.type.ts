import { Request } from 'express';

import { UserEntity } from '@src/modules/user/entities/user.entity';

export type AppRequest = {
  user: UserEntity;
} & Request;
