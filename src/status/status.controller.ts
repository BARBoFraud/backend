import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StatusService } from './status.service';

@ApiTags('Modulo de utilidades de status')
@Controller({ path: 'status', version: '1' })
export class StatusController {
    constructor(private readonly statusesService: StatusService) {}

    @Get('/list')
    @ApiOperation({
        summary: 'Endpoint para obtener los status de reportes'
    })
    @ApiResponse({
        status: 200,
        description: 'Status obtenidos correctamente',
        example: [
            {
                id: 1,
                name: 'Pendiente'
            },
            {
                id: 2,
                name: 'Aceptado'
            },
            {
                id: 3,
                name: 'Rechazado'
            }
        ]
    })
    @ApiResponse({ status: 500, description: 'Error en base de datos' })
    async getStatusList() {
        return await this.statusesService.listStatuses();
    }

    @Get('/accept')
    @ApiOperation({
        summary: 'Endpoint para obtener el id del status de aceptado'
    })
    @ApiResponse({
        status: 200,
        description: 'Status obtenidos correctamente',
        example: { id: 2, name: 'Aceptado' }
    })
    @ApiResponse({ status: 500, description: 'Error en base de datos' })
    async getAcceptedStatus() {
        return await this.statusesService.getAcceptedStatus();
    }

    @Get('/declined')
    @ApiOperation({
        summary: 'Endpoint para obtener el id del status de rechazado'
    })
    @ApiResponse({
        status: 200,
        description: 'Status obtenido correctamente',
        example: { id: 2, name: 'Rechazado' }
    })
    @ApiResponse({ status: 500, description: 'Error en base de datos' })
    async getDeclinedStatus() {
        return await this.statusesService.getDeclinedStatus();
    }
}
