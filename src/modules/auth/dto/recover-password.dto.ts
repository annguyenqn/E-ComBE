import { IsEmail, IsString } from 'class-validator';

export class RecoverPasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  recoverToken: string;

  @IsString()
  password: string;
}
