import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  app.use(morgan('dev'));
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:4173',
      'https://0nqh52rc-5173.euw.devtunnels.ms/'],
    credentials: true,
  });
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('MangoCloud API')
    .setDescription('API pentru aplicația de cloud storage MangoCloud')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(process.env.PORT ?? 3000);
  console.log(` -> api access poit: http://localhost:${process.env.PORT}/api`);
  console.log(` -> web access point: http://localhost:5173`)

}

bootstrap().catch((err) => {
  console.error('Bootstrap failed:', err);
  process.exit(1);
});
