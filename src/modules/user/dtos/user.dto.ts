import { RoleType } from 'src/common/constants';
import {
  BooleanFieldOptional,
  EmailFieldOptional,
  EnumFieldOptional,
  PhoneFieldOptional,
  StringFieldOptional,
} from 'src/common/decorators';
import { AbstractDto } from 'src/common/dto/abstract.dto';

// TODO, remove this class and use constructor's second argument's type
export type UserDtoOptions = Partial<{ isActive: boolean }>;

export class UserDto extends AbstractDto {
  @StringFieldOptional({ nullable: true })
  firstName?: string | null;

  @StringFieldOptional({ nullable: true })
  lastName?: string | null;

  @StringFieldOptional({ nullable: true })
  username!: string;

  @EnumFieldOptional(() => RoleType)
  role?: RoleType;

  @EmailFieldOptional({ nullable: true })
  email?: string | null;

  @StringFieldOptional({ nullable: true })
  avatar?: string | null;

  @PhoneFieldOptional({ nullable: true })
  phone?: string | null;

  @BooleanFieldOptional()
  isActive?: boolean;

  //   constructor(user: UserEntity, options?: UserDtoOptions) {
  //     super(user);
  //     this.firstName = user.firstName;
  //     this.lastName = user.lastName;
  //     this.role = user.role;
  //     this.email = user.email;
  //     this.avatar = user.avatar;
  //     this.phone = user.phone;
  //     this.isActive = options?.isActive;
  //   }
}
