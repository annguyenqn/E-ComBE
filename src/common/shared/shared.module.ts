import { Global, Module, type Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigService } from './services/app-config.service';
import { AwsS3Service } from './services/aws-s3.service';
import { GeneratorService } from './services/generator.service';
import { TokenService } from './services/token.service';
import { ValidatorService } from './services/validator.service';

const providers: Provider[] = [
  AppConfigService,
  ValidatorService,
  AwsS3Service,
  GeneratorService,
  TokenService,
];

@Global()
@Module({
  providers,
  imports: [CqrsModule, JwtModule.register({})],
  exports: [...providers, CqrsModule],
})
export class SharedModule {}
