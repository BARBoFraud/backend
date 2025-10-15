import { Controller, Get } from '@nestjs/common';
import { RiskService } from './risk.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CountData } from 'src/common/types/graph.types';

@Controller({ path: 'risk', version: '1' })
export class RiskController {
    constructor(private readonly riskService: RiskService) {}

    @Get('/counts')
    @ApiOperation({
        summary: 'Endpoint para obtener cuantos reportes hay por cada riesgo'
    })
    @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
    async getCounts(): Promise<CountData[]> {
        return await this.riskService.getCounts();
    }
}
