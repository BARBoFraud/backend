import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useStaticAssets(join(__dirname, '..', 'public'), {
        prefix: '/public/'
    });
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({
        origin: ['http://localhost:3000']
    });
    app.enableVersioning({
        type: VersioningType.URI
    });
    const config = new DocumentBuilder()
        .setTitle('BARBoFraud')
        .setDescription('Api de aplicacion y dashboard BARBoFraud')
        .setVersion('0.1')
        .build();
    const doc = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, doc);
    await app.listen(process.env.PORT ?? 4000);
}
void bootstrap();
