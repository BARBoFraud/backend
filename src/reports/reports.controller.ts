import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UsersAuthGuard } from 'src/common/guards/users-auth.guard';
import { CreateReportDto } from './dto/create-report.dto';
import type { AuthenticatedRequest } from 'src/common/interfaces/authenticated-requests';
import { ReportsService } from './reports.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Modulo de reportes')
@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}
    @Post('/create')
    @UseGuards(UsersAuthGuard)
    @ApiOperation({ description: 'Endpoint para crear un nuevo reporte' })
    @ApiResponse({ status: 201, description: 'Reporte creado correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado por jwt' })
    @ApiResponse({ status: 404, description: 'La categoria no existe' })
    async createReport(
        @Req() req: AuthenticatedRequest,
        @Body() createReportDto: CreateReportDto
    ) {
        await this.reportsService.createReport(req.user.id, createReportDto);
    }
}
