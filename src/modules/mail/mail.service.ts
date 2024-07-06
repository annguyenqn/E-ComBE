import { Inject, Injectable, Logger } from '@nestjs/common';
import { MailService as SendGridMailService } from '@sendgrid/mail';
import { AppConfigService } from '@src/common/shared/services/app-config.service';
import { UserEntity } from '@src/modules/user/entities/user.entity';
import { APP_DEFAULT_MAIL_SENDER, SENDGRID_PROVIDER } from './constant';

const RESET_PASSWORD_TEMPLATE_ID = 'd-0bfef0d064de44e39cb320a7a929847c';

@Injectable()
export class MailService {
  constructor(
    @Inject(SENDGRID_PROVIDER)
    private readonly sendGridService: SendGridMailService,
    private configService: AppConfigService,
  ) {}
  async sendMailForgotPassword(user: UserEntity, recoverToken: string) {
    const email = user.email;
    try {
      const resetPasswordLink = this.configService.getresetPasswordLink(
        email,
        recoverToken,
      );
      await this.sendGridService.send({
        to: email,
        from: APP_DEFAULT_MAIL_SENDER,
        templateId: RESET_PASSWORD_TEMPLATE_ID,
        dynamicTemplateData: {
          name: user.firstName,
          resetPasswordLink,
        },
      });
    } catch (error) {
      Logger.error('Send mail forgot password');
    }
  }
}
