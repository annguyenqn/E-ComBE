import {
  EmailField,
  StringField,
  EnumField,
  StringFieldOptional,
} from 'src/common/decorators';
import { RoleType } from 'src/common/constants';
import { IsString, IsEmail, IsEnum, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @StringFieldOptional({ default: 'John' })
  @IsString({ message: 'First name must be a string' })
  readonly firstName?: string;

  @StringFieldOptional({ default: 'Doe' })
  @IsString({ message: 'Last name must be a string' })
  readonly lastName?: string;

  @EnumField(() => RoleType, { default: RoleType.USER })
  @IsEnum(RoleType, { message: 'Role must be a valid enum value' })
  readonly role: RoleType;

  @EmailField({ default: 'user@example.com' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  readonly email!: string;

  @StringField({ default: 'Password123!' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be longer than 8 characters' })
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$&*])/, {
    message:
      'Password must contain at least one uppercase letter and one special character',
  })
  readonly password?: string;

  @StringFieldOptional({ default: '123456789' })
  @IsString({ message: 'Phone must be a string' })
  readonly phone?: string;

  @StringFieldOptional({ default: 'default-avatar.png' })
  @IsString({ message: 'Avatar must be a string' })
  readonly avatar?: string;
}
