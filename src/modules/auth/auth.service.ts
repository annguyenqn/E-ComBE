import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { MailService } from '@src/modules/mail/mail.service';
import { UserNotFoundException } from 'src/common/exceptions';
import { AppConfigService } from 'src/common/shared/services/app-config.service';
import { TokenService } from 'src/common/shared/services/token.service';
import { AccessTokenPayload, RefreshTokenPayload } from 'src/common/types';
import AppUtil from 'src/common/utils';
import { UserEntity } from '@src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { AccessTokenResponse } from './dto/access-token.response';
import { LoginResponse } from './dto/login.response';
import { RecoverPasswordDto } from './dto/recover-password.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private configService: AppConfigService,
    private userService: UserService,
    private mailService: MailService,
    private tokenService: TokenService,
  ) {}

  async login(userLoginDto: UserLoginDto): Promise<LoginResponse> {
    const user = await this.getAuthenticatedUser(userLoginDto);
    return this.generateAuthCredential(user);
  }

  private async generateAuthCredential(
    user: UserEntity,
  ): Promise<LoginResponse> {
    const accessTokenDto = this.generateAccessToken({
      userId: user.id,
      email: user.email,
    });
    const accessToken = accessTokenDto.accessToken;
    const refreshToken = this.tokenService.generateRefreshToken({
      accessToken,
    });

    await this.userService.setRefreshToken(user.id, refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<LoginResponse> {
    try {
      const { refreshToken } = refreshTokenDto;
      const { accessToken } =
        this.tokenService.verifyRefreshToken(refreshToken);
      const { userId } =
        this.tokenService.decodeJwtToken<AccessTokenPayload>(accessToken);
      const user = await this.userService.findOne({ id: userId });
      if (!user) {
        throw new Error();
      }

      return this.generateAuthCredential(user);
    } catch (error) {
      throw new ForbiddenException('Invalid refresh token');
    }
  }
  generateAccessToken(payload: AccessTokenPayload): AccessTokenResponse {
    const accessToken = this.tokenService.generateAccessToken(payload);

    return {
      expiredIn: this.configService.authConfig.getAccessExpirationTime(),
      accessToken,
    };
  }

  public async getAuthenticatedUser({
    email,
    password: plainPassword,
  }: UserLoginDto): Promise<UserEntity> {
    const user = await this.userService.findOne({ email });

    if (!user) {
      throw new UserNotFoundException();
    }

    const isValidPassword = await AppUtil.validateHash(
      plainPassword,
      user?.password,
    );

    if (!isValidPassword) {
      throw new ForbiddenException('Invalid password');
    }
    return user;
  }

  async forgotPassword(payload: ResetPasswordDto): Promise<void> {
    const { email } = payload;
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new UserNotFoundException();
    }
    const recoveryToken = this.tokenService.generateRecoveryToken({ email });

    await Promise.all([
      this.userService.setRecoveryToken(user.id, recoveryToken),
      this.mailService.sendMailForgotPassword(user, recoveryToken),
    ]);
  }

  async resetPassword(payload: RecoverPasswordDto): Promise<void> {
    const { email, recoverToken, password } = payload;
    const recoveryTokenPayload =
      this.tokenService.verifyRecoveryToken(recoverToken);
    if (email !== recoveryTokenPayload.email) {
      throw new BadRequestException('Invalid email');
    }
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new UserNotFoundException();
    }
    const isValidRecoveryToken = await AppUtil.validateHash(
      recoverToken,
      user.hashRecoveryToken,
    );
    if (!isValidRecoveryToken) {
      throw new ForbiddenException('Invalid recovery token');
    }
    await this.userService.update({
      id: user.id,
      password,
      hashRefreshToken: null,
    });
  }

  async logout(refreshToken: string): Promise<void> {
    let userId: number;
    try {
      const { accessToken } =
        this.tokenService.decodeJwtToken<RefreshTokenPayload>(refreshToken);
      userId =
        this.tokenService.decodeJwtToken<AccessTokenPayload>(
          accessToken,
        )?.userId;
    } catch (error) {
      throw new ForbiddenException('Invalid refresh token');
    }

    await this.userService.removeRefreshToken(userId, refreshToken);
  }
}
