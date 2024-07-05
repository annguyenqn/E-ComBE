import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface IResponse<T> {
  statusCode: HttpStatus;
  data: T;
  message: string;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse<T>> {
    const request = context.switchToHttp().getRequest();
    return next.handle().pipe(
      map((response) => ({
        statusCode: HttpStatus.OK,
        data: response?.data ? response.data : response,
        message: request.message,
      })),
    );
  }
}
