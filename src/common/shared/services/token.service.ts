import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  AccessTokenPayload,
  RecoveryTokenPayload,
  RefreshTokenPayload,
} from 'src/common/types';
import { AppConfigService } from './app-config.service';

@Injectable()
export class TokenService {
  constructor(
    private configService: AppConfigService,
    private jwtService: JwtService,
  ) {}
  decodeJwtToken<T>(token: string): T {
    return this.jwtService.decode<T>(token);
  }
  generateAccessToken(payload: AccessTokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.authConfig.accessTokenSecret,
      expiresIn: this.configService.authConfig.jwtExpirationTime,
    });
  }

  generateRefreshToken(payload: RefreshTokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.authConfig.refreshTokenSecret,
      expiresIn: this.configService.authConfig.jwtRefreshExpirationTime,
    });
  }

  generateRecoveryToken(payload: RecoveryTokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.authConfig.recoveryTokenSecret,
      expiresIn: this.configService.authConfig.jwtExpirationTime,
    });
  }

  verifyAccessToken(token: string): AccessTokenPayload {
    return this.jwtService.verify(token, {
      secret: this.configService.authConfig.accessTokenSecret,
    });
  }

  verifyRefreshToken(token: string): RefreshTokenPayload {
    return this.jwtService.verify(token, {
      secret: this.configService.authConfig.refreshTokenSecret,
    });
  }

  verifyRecoveryToken(token: string): RecoveryTokenPayload {
    return this.jwtService.verify(token, {
      secret: this.configService.authConfig.recoveryTokenSecret,
    });
  }
}
