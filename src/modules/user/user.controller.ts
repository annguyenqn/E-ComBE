import { Controller, Get, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleType } from '@src/common/constants';
import { Auth } from '@src/common/decorators';
import { PaginationDto } from '@src/common/dto/paginate.dto';
import { UsersPageOptionsDto } from './dtos/users-page-options.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { Request } from 'express';

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
    console.log('this is req', req.user);
    // return this.usersService.findUserByAccountID(id);
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
