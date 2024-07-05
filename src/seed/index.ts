import { NestFactory } from '@nestjs/core';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { SeedModule } from './seed.module';
import { SeedService } from './seed.service';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.createApplicationContext(SeedModule);
  const seedService = app.get(SeedService);
  await seedService.seed();
  await app.close();
}

void bootstrap();
