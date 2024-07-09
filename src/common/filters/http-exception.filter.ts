import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { IResponse } from 'src/common/types/respone.type';

@Catch()
export class HttpExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    //  const lang = i18n?.lang || I18N_FALLBACK_LANGUAGE;
    const request = host.switchToHttp().getRequest();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const { message, stack } = exception;
    Logger.error(JSON.stringify({ message, stack }));
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errors = message;
    //  let errors = AppHelper.constantExceptionErrors(
    //    message,
    //    i18n?.service,
    //    lang,
    //  );
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse() as IResponse;

      if (
        typeof exceptionResponse === 'object' &&
        Object.prototype.hasOwnProperty.call(exceptionResponse, 'message')
      ) {
        errors = exceptionResponse.message;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        errors = exceptionResponse;
      }

      // errors = Array.isArray(exception.errors)
      //   ? formatI18nErrors(exception.errors, i18n?.service, lang)
      //   : exception?.getResponse()
      //     ? [exception?.getResponse()]
      //     : errors;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return response.status(status).json({
      isSuccess: false,
      code: status,
      errors,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  //   private validationFilter(validationErrors: ValidationError[]): void {
  //     for (const validationError of validationErrors) {
  //       const children = validationError.children;

  //       if (children && !_.isEmpty(children)) {
  //         this.validationFilter(children);

  //         return;
  //       }

  //       delete validationError.children;

  //       const constraints = validationError.constraints;

  //       if (!constraints) {
  //         return;
  //       }

  //       for (const [constraintKey, constraint] of Object.entries(constraints)) {
  //         // convert default messages
  //         if (!constraint) {
  //           // convert error message to error.fields.{key} syntax for i18n translation
  //           constraints[constraintKey] = `error.fields.${_.snakeCase(
  //             constraintKey,
  //           )}`;
  //         }
  //       }
  //     }
  //   }
}
