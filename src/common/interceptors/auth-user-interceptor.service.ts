import {
  Injectable,
  type CallHandler,
  type ExecutionContext,
  type NestInterceptor,
} from '@nestjs/common';

import { ContextProvider } from 'src/common/providers';
import { AppRequest } from 'src/common/types/app-request.type';
import { type UserEntity } from '@src/modules/user/entities/user.entity';

@Injectable()
export class AuthUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<AppRequest>();

    const user = <UserEntity>request.user;
    ContextProvider.setAuthUser(user);

    return next.handle();
  }
}
