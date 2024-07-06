/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfigService } from 'src/common/shared/services/app-config.service';
import { AccessTokenPayload } from 'src/common/types';

import { UserEntity } from '@src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    // @ts-expect-error
    private configService: AppConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.authConfig.accessTokenSecret,
    });
  }

  async validate(payload: AccessTokenPayload): Promise<UserEntity> {
    const user = await this.userService.findOne({
      id: payload.userId,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
