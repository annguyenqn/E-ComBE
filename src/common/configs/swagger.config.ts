import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = async (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Gear E Sepcification')
    .setDescription('Documentation for Gear E API')
    .setVersion('0.1')
    .addBearerAuth();
  const document = SwaggerModule.createDocument(app, options.build());
  SwaggerModule.setup('doc', app, document);
};
