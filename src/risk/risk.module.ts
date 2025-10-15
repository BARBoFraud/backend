import { Module } from '@nestjs/common';
import { RiskRepository } from './risk.repository';
import { RiskController } from './risk.controller';
import { RiskService } from './risk.service';

@Module({
    controllers: [RiskController],
    providers: [RiskRepository, RiskService],
    exports: [RiskRepository]
})
export class RiskModule {}
