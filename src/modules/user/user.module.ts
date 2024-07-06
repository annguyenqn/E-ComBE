import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { ReviewEntity } from 'src/modules/product/entities/review.entity';
import { WishlistEntity } from 'src/modules/product/entities/wishlist.entity';
import { OrderEntity } from 'src/modules/order/entities/oder.entity';
import { CartEntity } from 'src/modules/cart/entities/cart.entity';
// const handlers = [CreateSettingsHandler];

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ReviewEntity,
      WishlistEntity,
      OrderEntity,
      CartEntity,
    ]),
  ],
  controllers: [UserController],
  exports: [UserService],
  providers: [
    UserService,
    // ...handlers
  ],
})
export class UserModule {}
