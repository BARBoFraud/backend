import { Module } from '@nestjs/common';
import { RiskRepository } from './risk.repository';
import { RiskController } from './risk.controller';
import { RiskService } from './risk.service';
import { TokenService } from 'src/auth/tokens.service';

@Module({
    controllers: [RiskController],
    providers: [RiskRepository, RiskService, TokenService],
    exports: [RiskRepository]
})
export class RiskModule {}
