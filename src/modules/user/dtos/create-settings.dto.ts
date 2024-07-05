import { BooleanFieldOptional } from 'src/common/decorators';

export class CreateSettingsDto {
  @BooleanFieldOptional()
  isEmailVerified?: boolean;

  @BooleanFieldOptional()
  isPhoneVerified?: boolean;
}
