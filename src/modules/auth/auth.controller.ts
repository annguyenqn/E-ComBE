import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login.response';
import { RecoverPasswordDto } from './dto/recover-password.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async userLogin(@Body() userLoginDto: UserLoginDto): Promise<LoginResponse> {
    return this.authService.login(userLoginDto);
  }

  @Post('refresh')
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<LoginResponse> {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @Post('logout')
  async logout(@Body('refreshToken') refreshToken: string): Promise<void> {
    return this.authService.logout(refreshToken);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() payload: ResetPasswordDto): Promise<void> {
    return this.authService.forgotPassword(payload);
  }

  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordPayload: RecoverPasswordDto,
  ): Promise<void> {
    return this.authService.resetPassword(resetPasswordPayload);
  }
}
