// import {
//   CommandHandler,
//   type ICommand,
//   type ICommandHandler,
// } from '@nestjs/cqrs';
// import { CreateSettingsDto } from 'src/modules/user/dtos/create-settings.dto';

// export class CreateSettingsCommand implements ICommand {
//   constructor(
//     public readonly userId: number,
//     public readonly createSettingsDto: CreateSettingsDto,
//   ) {}
// }

// @CommandHandler(CreateSettingsCommand)
// export class CreateSettingsHandler
//   implements ICommandHandler<CreateSettingsCommand, UserSettingsEntity>
// {
//   constructor(
//     @InjectRepository(UserSettingsEntity)
//     private userSettingsRepository: Repository<UserSettingsEntity>,
//   ) {}

//   execute(command: CreateSettingsCommand) {
//     const { userId, createSettingsDto } = command;
//     const userSettingsEntity =
//       this.userSettingsRepository.create(createSettingsDto);
//     userSettingsEntity.userId = userId;
//     return this.userSettingsRepository.save(userSettingsEntity);
//   }
// }
