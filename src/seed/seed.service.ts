import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleType } from 'src/common/constants';
import { UserEntity } from '@src/modules/user/entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async seed(): Promise<void> {
    await Promise.all([this.seedAdmin(), this.seedUsers()]);
  }

  private async seedAdmin(): Promise<void> {
    const EMAIL = 'admin@gmail.com';
    const PASSWORD = 'Hello@123';
    const admin = await this.userRepository.findOneBy({ email: EMAIL });
    if (!admin) {
      await this.userRepository.save(
        this.userRepository.create({
          email: EMAIL,
          password: PASSWORD,
          role: RoleType.ADMIN,
        }),
      );
    }
  }

  private async seedUsers(): Promise<void> {
    const usersData = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@gmail.com',
        password: 'Password@123',
        phone: '123456789',
        role: RoleType.USER,
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@gmail.com',
        password: 'Password@123',
        phone: '987654321',
        role: RoleType.USER,
      },
    ];

    for (const userData of usersData) {
      // eslint-disable-next-line no-await-in-loop
      const user = await this.userRepository.findOneBy({
        email: userData.email,
      });
      if (!user) {
        // eslint-disable-next-line no-await-in-loop
        await this.userRepository.save(this.userRepository.create(userData));
      }
    }
  }
}
