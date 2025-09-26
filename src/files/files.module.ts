import { Module } from '@nestjs/common';
import { ImagesController } from './files.controller';

@Module({
    controllers: [ImagesController]
})
export class ImagesModule {}
