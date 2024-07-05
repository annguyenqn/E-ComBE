import {
  Injectable,
  type CallHandler,
  type ExecutionContext,
  type NestInterceptor,
} from '@nestjs/common';
import { type Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { type AbstractDto } from 'src/common/dto/abstract.dto';
import { TranslationService } from 'src/common/shared/services/translation.service';

@Injectable()
export class TranslationInterceptor implements NestInterceptor {
  constructor(private readonly translationService: TranslationService) {}

  public intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<AbstractDto> {
    return next
      .handle()
      .pipe(
        mergeMap((data) =>
          this.translationService.translateNecessaryKeys(data),
        ),
      );
  }
}
