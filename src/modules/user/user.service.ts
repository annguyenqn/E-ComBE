import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from '@src/common/dto/paginate.dto';
import bcrypt from 'bcrypt';
import { UserNotFoundException } from 'src/common/exceptions';
import AppUtil from 'src/common/utils';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { UsersPageOptionsDto } from './dtos/users-page-options.dto';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOne(
    findData: FindOptionsWhere<UserEntity>,
  ): Promise<UserEntity | null> {
    return this.userRepository.findOneBy(findData);
  }

  async getUsers(
    pageOptionsDto: UsersPageOptionsDto,
  ): Promise<PaginationDto<UserEntity>> {
    const { page, order, take } = pageOptionsDto;
    const skip = pageOptionsDto.skip;
    const [users, total] = await this.userRepository.findAndCount({
      take,
      skip,
      order: {
        id: order,
      },
    });

    return {
      hasPreviousPage: page > 1,
      itemCount: users.length,
      pageCount: Math.ceil(total / take),
      values: users,
      hasNextPage: users.length > take,
      take,
      page,
    };
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ email });
  }

  async setRefreshToken(userId: number, refreshToken: string) {
    const hashRefreshToken = await bcrypt.hash(refreshToken, 10);

    await this.userRepository.update(userId, {
      hashRefreshToken,
    });
  }

  async setRecoveryToken(userId: number, recoveryToken: string) {
    const hashedRecoveryToken = AppUtil.generateHash(recoveryToken);
    await this.userRepository.update(userId, {
      hashRecoveryToken: hashedRecoveryToken,
    });
  }

  async removeRefreshToken(userId: number, refereshToken: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new UserNotFoundException();
    }
    const isValid = await AppUtil.validateHash(
      refereshToken,
      user.hashRefreshToken,
    );
    if (!isValid) {
      throw new ForbiddenException('Invalid refresh token');
    }
    await this.userRepository.update(userId, {
      hashRefreshToken: null,
    });
  }
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async update(payload: Partial<UserEntity> & { id: number }) {
    await this.userRepository.update(payload.id, payload);
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email: ILike(email),
      },
    });
  }
}
