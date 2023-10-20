import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const openApiConfig = new DocumentBuilder()
    .setTitle('Purple Hawk')
    .setDescription('Experimental application to serve planning information')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, openApiConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
