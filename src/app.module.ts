import './boilerplate.polyfill';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ClsModule } from 'nestjs-cls';

import { DatabaseModule } from './common/database/database.module';
import { AppConfigService } from './common/shared/services/app-config.service';
import { SharedModule } from './common/shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
      },
    }),
    ThrottlerModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: AppConfigService) => ({
        throttlers: [configService.throttlerConfigs],
      }),
      inject: [AppConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    //  I18nModule.forRootAsync({
    //    useFactory: (configService: AppConfigService) => ({
    //      fallbackLanguage: configService.fallbackLanguage,
    //      loaderOptions: {
    //        path: path.join(__dirname, '/i18n/'),
    //        watch: configService.isDevelopment,
    //      },
    //      resolvers: [
    //        { use: QueryResolver, options: ['lang'] },
    //        AcceptLanguageResolver,
    //        new HeaderResolver(['x-lang']),
    //      ],
    //    }),
    //    imports: [SharedModule],
    //    inject: [AppConfigService],
    //  }),
    CloudinaryModule,
  ],
  providers: [],
})
export class AppModule {}
