import { Controller, Get, Query, Req, Body, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleType } from '@src/common/constants';
import { Auth } from '@src/common/decorators';
import { PaginationDto } from '@src/common/dto/paginate.dto';
import { UsersPageOptionsDto } from './dtos/users-page-options.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { Request } from 'express';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //  private readonly translationService: TranslationService, //  private userService: UserService,
  //   @Get('admin')
  //   @Auth([RoleType.USER])
  //   @HttpCode(HttpStatus.OK)
  //   @UseLanguageInterceptor()
  //   async admin(@AuthUser() user: UserEntity) {
  //     //  const translation = await this.translationService.translate(
  //     //    'admin.keywords.admin',
  //     //  );
  //     await Promise.resolve();
  //     return {
  //       // text: `${translation} ${user.firstName}`,
  //       text: `admin.keywords.admin ${user.firstName}`,
  //     };
  //   }
  @ApiBearerAuth()
  @Get()
  @Auth([RoleType.ADMIN])
  getUsers(
    @Query()
    pageOptionsDto: UsersPageOptionsDto,
  ): Promise<PaginationDto<UserEntity>> {
    return this.userService.getUsers(pageOptionsDto);
  }

  @Get('profile')
  @ApiBearerAuth()
  @Auth()
  async findUser(@Req() req: Request) {
    const user = req.user;
    const keysToRemove = ['password', 'hashRefreshToken', 'hashRecoveryToken'];

    return Object.fromEntries(
      Object.entries(user ?? {}).filter(([key]) => !keysToRemove.includes(key)),
    );
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUserDto);
  }
  //   @Get(':id')
  //   @Auth([RoleType.USER])
  //   @HttpCode(HttpStatus.OK)
  //   @ApiResponse({
  //     status: HttpStatus.OK,
  //     description: 'Get users list',
  //     type: UserDto,
  //   })
  //   getUser(@UUIDParam('id') userId: Uuid): Promise<UserDto> {
  //     return this.userService.getUser(userId);
  //   }
}
