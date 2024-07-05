import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleType } from 'src/common/constants';
import { UserEntity } from 'src/modules/user/user.entity';
// import { In } from 'typeorm/find-options/operator/In';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async seed(): Promise<void> {
    await Promise.all([this.seedAdmin()]);
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

//   private async seedUser(): Promise<void> {
//     /* eslint-disable @typescript-eslint/naming-convention */
//     const EMAILs = ['dung.huu@speedydd.com'];
//     const PASSWORD = 'Test@123';
//     const users = await this.userRepository.findBy({ email: In(EMAILs) });
//     const usersToCreate = EMAILs.filter(
//       (email) => !users.map((user) => user.email).includes(email),
//     );
//     if (!usersToCreate.length) {
//       return;
//     }

//     await this.userRepository.save(
//       usersToCreate.map((email) =>
//         this.userRepository.create({
//           email,
//           password: PASSWORD,
//           role: RoleType.USER,
//         }),
//       ),
//     );
//   }
}
