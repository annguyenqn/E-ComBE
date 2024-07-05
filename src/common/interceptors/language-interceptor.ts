import {
  Injectable,
  UseInterceptors,
  type CallHandler,
  type ExecutionContext,
  type NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { type Observable } from 'rxjs';

import { LanguageCode } from 'src/common/constants';
import { ContextProvider } from 'src/common/providers';

@Injectable()
class LanguageInterceptor implements NestInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const language: string = request.headers['x-language-code'] as string;

    if (LanguageCode[language]) {
      ContextProvider.setLanguage(language);
    }

    return next.handle();
  }
}

export default function UseLanguageInterceptor() {
  return UseInterceptors(LanguageInterceptor);
}
