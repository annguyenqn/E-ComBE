import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import { AppRequest } from 'src/common/types/app-request.type';

export function AuthUser() {
  return createParamDecorator((_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<AppRequest>();

    const user = request.user;

    if (user[Symbol.for('isPublic')]) {
      return;
    }

    return user;
  })();
}
