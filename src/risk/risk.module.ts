import { Module } from '@nestjs/common';
import { RiskRepository } from './risk.repository';

@Module({
    providers: [RiskRepository],
    exports: [RiskRepository]
})
export class RiskModule {}
