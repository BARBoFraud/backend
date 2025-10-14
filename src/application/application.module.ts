import { Module } from '@nestjs/common';
import { ApplicationRepository } from './application.repository';

@Module({
    providers: [ApplicationRepository],
    exports: [ApplicationRepository]
})
export class ApplicationModule {}
