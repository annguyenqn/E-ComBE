import { EmailField, StringField } from 'src/common/decorators';

export class UserLoginDto {
  @EmailField({
    default: 'admin@gmail.com',
  })
  readonly email!: string;

  @StringField({ default: 'Hello@123' })
  readonly password!: string;
}
