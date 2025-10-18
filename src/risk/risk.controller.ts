import { Controller, Get, UseGuards } from '@nestjs/common';
import { RiskService } from './risk.service';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';
import { CountData } from 'src/common/types/graph.types';
import { RiskData } from './types/risk.types';
import { AdminsAuthGuard } from 'src/common/guards/admins-auth.guard';

@ApiTags('Modulo de riesgo')
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

    @Get('/list')
    @ApiOperation({
        summary: 'Endpoint para obtener la lista de riesgos y su id'
    })
    @ApiResponse({
        status: 200,
        description: 'Datos obtenidos correctamente',
        example: [
            {
                id: 1,
                level: 'Alto'
            },
            {
                id: 2,
                level: 'Medio'
            },
            {
                id: 3,
                level: 'Bajo'
            }
        ]
    })
    @ApiResponse({ status: 401, description: 'No autorizado por jwt' })
    @ApiBearerAuth()
    @UseGuards(AdminsAuthGuard)
    async getRiskList(): Promise<RiskData[]> {
        return await this.riskService.getRiskList();
    }
}
