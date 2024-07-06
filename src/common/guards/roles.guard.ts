import {
  Injectable,
  type CanActivate,
  type ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import _ from 'lodash';

import { type RoleType } from 'src/common/constants';
import { AppRequest } from 'src/common/types/app-request.type';
import { type UserEntity } from '@src/modules/user/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<RoleType[]>('roles', context.getHandler());

    if (_.isEmpty(roles)) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AppRequest>();
    const user = <UserEntity>request.user;

    return roles.includes(user.role);
  }
}
