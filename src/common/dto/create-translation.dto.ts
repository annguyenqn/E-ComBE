import { LanguageCode } from 'src/common/constants';
import { EnumField, StringField } from 'src/common/decorators';

export class CreateTranslationDto {
  @EnumField(() => LanguageCode)
  languageCode!: LanguageCode;

  @StringField()
  text!: string;
}
