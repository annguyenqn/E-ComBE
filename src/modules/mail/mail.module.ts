import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MailService as SendgriMailService } from '@sendgrid/mail';
import { AppConfigService } from 'src/common/shared/services/app-config.service';
import { SENDGRID_PROVIDER } from './constant';
import { MailService } from './mail.service';

@Module({
  imports: [JwtModule.register({})],
  providers: [
    MailService,
    {
      provide: SENDGRID_PROVIDER,
      useFactory: (configService: AppConfigService) => {
        const service = new SendgriMailService();
        service.setApiKey(configService.sendgrid.apiKey);
        return service;
      },
      inject: [AppConfigService],
    },
  ],
  exports: [MailService],
})
export class MailModule {}
