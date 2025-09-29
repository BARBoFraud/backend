import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Req,
    UseGuards
} from '@nestjs/common';
import { UsersAuthGuard } from '../common/guards/users-auth.guard';
import { CreateReportDto } from './dto/create-report.dto';
import type { AuthenticatedRequest } from '../common/interfaces/authenticated-requests';
import { ReportsService } from './reports.service';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';

@ApiTags('Modulo de reportes')
@Controller({ path: 'reports', version: '1' })
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}
    @Post('/create')
    @UseGuards(UsersAuthGuard)
    @ApiOperation({ description: 'Endpoint para crear un nuevo reporte' })
    @ApiResponse({ status: 201, description: 'Reporte creado correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado por jwt' })
    @ApiResponse({ status: 404, description: 'La categoria no existe' })
    @ApiBearerAuth()
    async createReport(
        @Req() req: AuthenticatedRequest,
        @Body() createReportDto: CreateReportDto
    ) {
        await this.reportsService.createReport(req.user.id, createReportDto);
    }

    @Get('/history')
    @UseGuards(UsersAuthGuard)
    @ApiOperation({
        description:
            'Endpoint para obtener el historial de reportes de un usuario'
    })
    @ApiResponse({
        status: 200,
        description: 'Historial obtenido correctamente',
        example: [
            {
                id: 1,
                description: 'Me mataron amigos ayuda',
                category: 'Llamada',
                status: 'Pendiente',
                url: 'https:estafas.com',
                website: 'fortnite',
                socialMedia: 'Instagram',
                phoneNumber: '12312315123',
                createdAt: '2025-09-29T02:24:10.000Z',
                username: 'leotefortnite',
                email: 'jorjecadena@tec.mx'
            }
        ]
    })
    @ApiResponse({ status: 401, description: 'No autorizado por JWT' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    @ApiBearerAuth()
    async getUserHistory(@Req() req: AuthenticatedRequest) {
        return await this.reportsService.getUserHistory(req.user.id);
    }

    @Get(':id')
    @ApiOperation({
        description: 'Endpoint para obtener un reporte completo del historial'
    })
    @ApiResponse({
        status: 200,
        description: 'Reporte obtenido correctamente',
        example: {
            id: 1,
            category: 'Llamada',
            status: 'Pendiente',
            createdAt: '2025-09-29T02:24:10.000Z',
            description: 'Me mataron amigos ayuda',
            image: 'http://localhost:3000/public/uploads/1758854167272.jpeg',
            url: 'https:estafas.com',
            website: 'fortnite',
            socialMedia: 'Instagram',
            username: 'leotefortnitej',
            email: 'leopalatto@fortnite.com',
            phoneNumber: '123213123'
        }
    })
    @ApiResponse({ status: 404, description: 'Reporte no encontrado' })
    @ApiResponse({ status: 401, description: 'No autorizado por jwt' })
    @ApiBearerAuth()
    @UseGuards(UsersAuthGuard)
    async getReport(@Param('id') id: number, @Req() req: AuthenticatedRequest) {
        return this.reportsService.getById(req.user.id, id);
    }
}
