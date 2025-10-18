import { Injectable } from '@nestjs/common';
import { RiskRepository } from './risk.repository';
import { CountData } from 'src/common/types/graph.types';
import { RiskData } from './types/risk.types';

@Injectable()
export class RiskService {
    constructor(private readonly riskRepository: RiskRepository) {}

    async getCounts(): Promise<CountData[]> {
        return await this.riskRepository.getCounts();
    }

    async getRiskList(): Promise<RiskData[]> {
        return await this.riskRepository.getRiskList();
    }
}
