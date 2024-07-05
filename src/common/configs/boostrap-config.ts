import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import loggingMiddleware from 'src/common/middlewares/logger.middleware';
import { swaggerConfig } from './swagger.config';

export default async function bootstrapConfig(app: INestApplication) {
  // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  //   app.enable('trust proxy');
  app.use(loggingMiddleware);
  app.use(helmet());
  app.use(compression());
  app.use(morgan('combined'));
  app.enableVersioning();
  await swaggerConfig(app);
  const reflector = app.get(Reflector);
  //Filter exclude fields
  app.useGlobalFilters(new HttpExceptionFilter());

  app
    .useGlobalPipes
    //  new ValidationPipe({
    //    exceptionFactory: i18nValidationErrorFactory,
    //  }),
    ();
  app.useGlobalInterceptors(
    //Filter exclude fields
    new ClassSerializerInterceptor(reflector),
    //Custom response format
    new TransformInterceptor(),
    //Translate response
    //  new TranslationInterceptor(
    //    app.select(SharedModule).get(TranslationService),
    //  ),
  );
}
