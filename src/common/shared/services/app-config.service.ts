import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type ThrottlerOptions } from '@nestjs/throttler';
import { type TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from '@src/common/snake-naming.strategy';
import { UserEntity } from '@src/modules/user/entities/user.entity';
import { ProductEntity } from '@src/modules/product/entities/product.entity';
import { CategoryEntity } from '@src/modules/product/entities/category.entity';
import { InventoryEntity } from '@src/modules/product/entities/inventory.entity';
import { ReviewEntity } from '@src/modules/product/entities/review.entity';
import { WishlistEntity } from '@src/modules/product/entities/wishlist.entity';
import { CartEntity } from '@src/modules/cart/entities/cart.entity';
import { CartItemEntity } from '@src/modules/cart/entities/cartItem.entity';
import { OrderEntity } from '@src/modules/order/entities/oder.entity';
import { OrderDetailEntity } from '@src/modules/order/entities/orderDetail.entity';
import { OrderHistoryEntity } from '@src/modules/order/entities/orderHistory.entity';
import { PaymentEntity } from '@src/modules/payment/entities/payment.entity';
import { ShippingEntity } from '@src/modules/shipping/entities/shipping.entity';

import { isNil } from 'lodash';
import ms from 'ms';
import { default as parse, type Units } from 'parse-duration';
import querystring from 'querystring';
import { UserSubscriber } from 'src/common/entity-subscribers/user-subscriber';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }

  private getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(key + ' environment variable is not a number');
    }
  }

  private getDuration(key: string, format?: Units): number {
    const value = this.getString(key);
    const duration = parse(value, format);

    if (duration === undefined) {
      throw new Error(`${key} environment variable is not a valid duration`);
    }

    return duration;
  }

  private getBoolean(key: string): boolean {
    const value = this.get(key);

    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(key + ' env var is not a boolean');
    }
  }

  private getString(key: string): string {
    const value = this.get(key);

    return value.replaceAll('\\n', '\n');
  }

  get nodeEnv(): string {
    return this.getString('NODE_ENV');
  }

  getresetPasswordLink(email, recoverToken: string): string {
    const url = `${this.getString('CLIENT_BASE_URL')}/reset-password`;
    const params = querystring.stringify({ email, recoverToken });
    return `${url}?${params}`;
  }

  get fallbackLanguage(): string {
    return this.getString('FALLBACK_LANGUAGE');
  }

  get throttlerConfigs(): ThrottlerOptions {
    return {
      ttl: this.getDuration('THROTTLER_TTL', 'second'),
      limit: this.getNumber('THROTTLER_LIMIT'),
      // storage: new ThrottlerStorageRedisService(new Redis(this.redis)),
    };
  }

  get postgresConfig(): TypeOrmModuleOptions {
    return {
      keepConnectionAlive: !this.isTest,
      type: 'postgres',
      name: 'default',
      host: this.getString('DB_HOST'),
      port: this.getNumber('DB_PORT'),
      username: this.getString('DB_USERNAME'),
      password: this.getString('DB_PASSWORD'),
      database: this.getString('DB_DATABASE'),
      subscribers: [UserSubscriber],
      namingStrategy: new SnakeNamingStrategy(),
      synchronize: false,
      entities: [
        UserEntity,
        ProductEntity,
        CategoryEntity,
        InventoryEntity,
        ReviewEntity,
        WishlistEntity,
        CartEntity,
        CartItemEntity,
        OrderEntity,
        OrderDetailEntity,
        OrderHistoryEntity,
        PaymentEntity,
        ShippingEntity,
      ],
    };
  }

  get awsS3Config() {
    return {
      bucketRegion: this.getString('AWS_S3_BUCKET_REGION'),
      bucketApiVersion: this.getString('AWS_S3_API_VERSION'),
      bucketName: this.getString('AWS_S3_BUCKET_NAME'),
    };
  }

  get sendgrid() {
    return {
      apiKey: this.getString('SENDGRID_API_KEY'),
    };
  }

  get documentationEnabled(): boolean {
    return this.getBoolean('ENABLE_DOCUMENTATION');
  }

  get authConfig() {
    return {
      accessTokenSecret: this.getString('JWT_ACCESS_TOKEN_SECRET'),
      refreshTokenSecret: this.getString('JWT_REFRESH_TOKEN_SECRET'),
      recoveryTokenSecret: this.getString('JWT_RECOVERY_TOKEN_SECRET'),
      getAccessExpirationTime: (date = new Date()): number =>
        date.getTime() + ms(this.getString('JWT_EXPIRATION_TIME')),
      getRefreshExpirationTime: (date = new Date()): number =>
        date.getTime() + ms(this.getString('JWT_REFRESH_EXPIRATION_TIME')),
      getRecoveryExpirationTime: (date = new Date()): number =>
        date.getTime() + ms(this.getString('JWT_RECOVERY_EXPIRATION_TIME')),
      jwtExpirationTime: this.getString('JWT_EXPIRATION_TIME'),
      jwtRefreshExpirationTime: this.getString('JWT_REFRESH_EXPIRATION_TIME'),
      jwtRecoveryExpirationTime: this.getString('JWT_RECOVERY_EXPIRATION_TIME'),
    };
  }

  get appConfig() {
    return {
      port: this.getString('PORT'),
    };
  }

  private get(key: string): string {
    const value = this.configService.get<string>(key);

    if (isNil(value)) {
      throw new Error(key + ' environment variable does not set');
    }

    return value;
  }
}
