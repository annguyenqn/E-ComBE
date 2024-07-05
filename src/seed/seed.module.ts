import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '@src/common/shared/shared.module';
import { UserEntity } from '@src/modules/user/user.entity';
import { DatabaseModule } from 'src/common/database/database.module';
import { SeedService } from './seed.service';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SharedModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [SeedService],
})
export class SeedModule {}
