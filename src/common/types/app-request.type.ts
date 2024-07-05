import { Request } from 'express';

import { UserEntity } from 'src/modules/user/user.entity';

export type AppRequest = {
  user: UserEntity;
} & Request;
