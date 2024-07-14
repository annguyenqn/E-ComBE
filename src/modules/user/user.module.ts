import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { OrderEntity } from 'src/modules/order/entities/oder.entity';
// const handlers = [CreateSettingsHandler];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, OrderEntity])],
  controllers: [UserController],
  exports: [UserService],
  providers: [
    UserService,
    // ...handlers
  ],
})
export class UserModule {}
