import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Put,
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
import { AdminsAuthGuard } from 'src/common/guards/admins-auth.guard';
import { EvaluateReportDto } from './dto/evaluate-report.dto';
import { CommentReportDto } from './dto/comment-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import {
    Comment,
    DashboardReport,
    FeedReport,
    HistoryReport,
    ReportDateInfo,
    SearchQueryReport,
    SearchReport,
    ShortDashboardReport,
    ShortHistoryReport
} from './types/report.types';

@ApiTags('Modulo de reportes')
@Controller({ path: 'reports', version: '1' })
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}

    @Post('/create')
    @UseGuards(UsersAuthGuard)
    @ApiOperation({ summary: 'Endpoint para crear un nuevo reporte' })
    @ApiResponse({ status: 201, description: 'Reporte creado correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado por jwt' })
    @ApiResponse({ status: 404, description: 'La categoria no existe' })
    @ApiBearerAuth()
    async createReport(
        @Req() req: AuthenticatedRequest,
        @Body() createReportDto: CreateReportDto
    ): Promise<void> {
        await this.reportsService.createReport(req.user.id, createReportDto);
    }

    @Put('/update/:reportId')
    @UseGuards(UsersAuthGuard)
    @ApiOperation({ summary: 'Endpoint para modificar un reporte' })
    @ApiResponse({
        status: 200,
        description: 'Reporte modificado correctamente'
    })
    @ApiResponse({ status: 401, description: 'No autorizado por jwt' })
    @ApiBearerAuth()
    async updateReport(
        @Req() req: AuthenticatedRequest,
        @Param('reportId') reportId: number,
        @Body() updateReportDto: UpdateReportDto
    ): Promise<void> {
        await this.reportsService.updateReport(
            req.user.id,
            Number(reportId),
            updateReportDto
        );
    }

    @Get('/history')
    @UseGuards(UsersAuthGuard)
    @ApiOperation({
        summary: 'Endpoint para obtener el historial de reportes de un usuario'
    })
    @ApiResponse({
        status: 200,
        description: 'Historial obtenido correctamente',
        example: [
            {
                id: 3,
                title: 'Estafa en instagram',
                createdAt: '2025-10-14T05:11:00.000Z',
                category: 'Página de internet',
                status: 'Pendiente'
            },
            {
                id: 2,
                title: 'Estafa en Facebook',
                createdAt: '2025-10-14T03:53:31.000Z',
                category: 'Página de internet',
                status: 'Pendiente'
            }
        ]
    })
    @ApiResponse({ status: 401, description: 'No autorizado por JWT' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    @ApiBearerAuth()
    async getUserHistory(
        @Req() req: AuthenticatedRequest
    ): Promise<ShortHistoryReport[]> {
        return await this.reportsService.getUserHistory(req.user.id);
    }

    @Get('/feed')
    @UseGuards(UsersAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Endpoint para obtener el feed de reportes' })
    @ApiResponse({
        status: 200,
        description: 'Feed obtenido correctamente',
        example: [
            {
                id: 2,
                name: 'Leonardo',
                lastName: 'Perez',
                category: 'Página de internet',
                createdAt: '2025-10-14T03:53:31.000Z',
                title: 'Estafa en Facebook',
                description: 'Sitio web fraudulento, me robaron 5000 pesos.',
                image: 'http://localhost:4000/public/uploads/123132213123.png',
                url: 'www.tennisgratis.com',
                website: 'Tennis Gratis Mx',
                application: 'Instagram',
                username: 'Laura Gomez',
                email: 'tennisgratis@gmail.com',
                phoneNumber: '5627452471',
                userLiked: 1,
                likesCount: 2,
                commentsCount: 0
            }
        ]
    })
    @ApiResponse({ status: 401, description: 'No autorizado por jwt' })
    async getFeed(@Req() req: AuthenticatedRequest): Promise<FeedReport[]> {
        return await this.reportsService.getFeed(req.user.id);
    }

    @Get('/search/:search')
    @UseGuards(UsersAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Endpoint para buscar en los reportes' })
    @ApiResponse({
        status: 200,
        description: 'Reportes obtenidos correctamente',
        example: [
            {
                id: 2,
                createdAt: '2025-10-14T03:53:31.000Z',
                title: 'Estafa en Facebook',
                category: 'Página de internet'
            }
        ]
    })
    @ApiResponse({ status: 401, description: 'No autorizado por jwt' })
    async searchReport(
        @Param('search') searchString: string
    ): Promise<SearchQueryReport[]> {
        return await this.reportsService.searchReport(searchString);
    }

    @Get('/pending')
    @UseGuards(AdminsAuthGuard)
    @ApiOperation({
        summary: 'Endpoint para obtener los reportes pendientes'
    })
    @ApiResponse({
        status: 200,
        description: 'Reportes obtenidos correctamente',
        example: [
            {
                id: 3,
                title: 'Estafa en instagram',
                name: 'Leonardo',
                lastName: 'Perez',
                createdAt: '2025-10-14T05:11:00.000Z',
                category: 'Página de internet'
            }
        ]
    })
    @ApiResponse({ status: 401, description: 'No autorizado por jwt' })
    @ApiBearerAuth()
    async getPendingReports(): Promise<ShortDashboardReport[]> {
        return await this.reportsService.getPendingReports();
    }

    @Get('/comments/:reportId')
    @ApiOperation({
        summary: 'Endpoint para obtener los comentarios de un reporte'
    })
    @ApiResponse({
        status: 200,
        description: 'Comentarios obtenidos correctamente',
        example: [
            {
                id: 1,
                content: 'A mi hijo tambien le paso',
                name: 'Juan',
                lastName: 'Perez',
                createdAt: '2025-10-11T20:29:13.000Z'
            }
        ]
    })
    @ApiResponse({ status: 401, description: 'No autorizado por jwt' })
    @ApiBearerAuth()
    @UseGuards(UsersAuthGuard)
    async getComments(@Param('reportId') reportId: number): Promise<Comment[]> {
        return await this.reportsService.getReportComments(reportId);
    }

    @Patch('/evaluate')
    @ApiOperation({
        summary: 'Endpoint para cambiar el status de un reporte'
    })
    @ApiResponse({ status: 200, description: 'Reporte evaluado correctamente' })
    @ApiResponse({ status: 404, description: 'Reporte no encontrado' })
    @ApiResponse({ status: 401, description: 'No autorizado por jwt' })
    @ApiBearerAuth()
    @UseGuards(AdminsAuthGuard)
    async evaluateReport(
        @Body() evaluateReportDto: EvaluateReportDto
    ): Promise<void> {
        await this.reportsService.evaluateReport(evaluateReportDto);
    }

    @Post('/like/:reportId')
    @ApiOperation({
        summary: 'Endpoint para dar like a un reporte'
    })
    @ApiResponse({ status: 200, description: 'Like agregado correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado por jwt' })
    @ApiBearerAuth()
    @UseGuards(UsersAuthGuard)
    async likeReport(
        @Param('reportId') reportId: number,
        @Req() req: AuthenticatedRequest
    ): Promise<void> {
        await this.reportsService.likeReport(reportId, req.user.id);
    }

    @Post('/unlike/:reportId')
    @ApiOperation({
        summary: 'Endpoint para quitar like a un reporte'
    })
    @ApiResponse({ status: 200, description: 'Like quitado correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado por jwt' })
    @ApiBearerAuth()
    @UseGuards(UsersAuthGuard)
    async unlikeReport(
        @Param('reportId') reportId: number,
        @Req() req: AuthenticatedRequest
    ): Promise<void> {
        await this.reportsService.unlikeReport(reportId, req.user.id);
    }

    @Post('/comment/:reportId')
    @ApiOperation({ summary: 'Endpoint para comentar un reporte' })
    @ApiResponse({
        status: 201,
        description: 'Reporte comentado correctamente'
    })
    @ApiResponse({ status: 401, description: 'No autorizado por jwt' })
    @ApiBearerAuth()
    @UseGuards(UsersAuthGuard)
    async commentReport(
        @Param('reportId') reportId: number,
        @Req() req: AuthenticatedRequest,
        @Body() commentReportDto: CommentReportDto
    ): Promise<void> {
        await this.reportsService.commentReport(
            reportId,
            req.user.id,
            commentReportDto.content
        );
    }

    @Get('/:id/history')
    @ApiOperation({
        summary: 'Endpoint para obtener un reporte completo del historial'
    })
    @ApiResponse({
        status: 200,
        description: 'Reporte obtenido correctamente',
        example: {
            id: 3,
            title: 'Estafa en instagram',
            description: 'Sitio web fraudulento, me robaron 4000 pesos.',
            url: 'www.tennisgratis.com',
            website: 'Tennis Gratis Mexico',
            application: 'Fortnite',
            phoneNumber: '5627452471',
            createdAt: '2025-10-14T05:11:00.000Z',
            username: 'Juan Perez',
            email: 'tennisgratismx@gmail.com',
            image: 'http://localhost:4000/public/uploads/123132213123.png',
            category: 'Página de internet',
            status: 'Aceptado'
        }
    })
    @ApiResponse({ status: 404, description: 'Reporte no encontrado' })
    @ApiResponse({ status: 401, description: 'No autorizado por jwt' })
    @ApiBearerAuth()
    @UseGuards(UsersAuthGuard)
    async getCompleteHistoryReport(
        @Param('id') id: number,
        @Req() req: AuthenticatedRequest
    ): Promise<HistoryReport> {
        return await this.reportsService.getCompleteHistoryReport(
            req.user.id,
            id
        );
    }

    @Get('/:id/dashboard')
    @ApiOperation({
        summary: 'Endpoint para obtener un reporte completo del dashboard'
    })
    @ApiResponse({
        status: 200,
        description: 'Reporte obtenido correctamente',
        example: {
            name: 'Leonardo',
            lastName: 'Perez',
            id: 3,
            title: 'Estafa en instagram',
            description: 'Sitio web fraudulento, me robaron 4000 pesos.',
            url: 'www.tennisgratis.com',
            website: 'Tennis Gratis Mexico',
            application: 'Fortnite',
            phoneNumber: '5627452471',
            createdAt: '2025-10-14T05:11:00.000Z',
            username: 'Juan Perez',
            email: 'tennisgratismx@gmail.com',
            image: '123132213123.png',
            category: 'Página de internet'
        }
    })
    @ApiResponse({ status: 401, description: 'No autorizado por jwt' })
    @ApiResponse({ status: 404, description: 'Reporte no encontrado' })
    @ApiBearerAuth()
    @UseGuards(AdminsAuthGuard)
    async getCompleteDashboardReport(
        @Param('id') id: number
    ): Promise<DashboardReport> {
        return await this.reportsService.getCompleteDashboardReport(id);
    }

    @Get('/:id/search')
    @ApiOperation({
        summary: 'Endpoint para obtener un reporte completo de busqueda'
    })
    @ApiResponse({
        status: 200,
        description: 'Reporte obtenido correctamente',
        example: {
            id: 3,
            name: 'Leonardo',
            lastName: 'Perez',
            category: 'Página de internet',
            createdAt: '2025-10-14T05:11:00.000Z',
            riskLevel: 'Bajo',
            title: 'Estafa en instagram',
            description: 'Sitio web fraudulento, me robaron 4000 pesos.',
            image: 'http://localhost:4000/public/uploads/123132213123.png',
            url: 'www.tennisgratis.com',
            website: 'Tennis Gratis Mexico',
            application: 'Fortnite',
            username: 'Juan Perez',
            email: 'tennisgratismx@gmail.com',
            phoneNumber: '5627452471',
            userLiked: 0,
            likesCount: 0,
            commentsCount: 0
        }
    })
    @ApiResponse({ status: 401, description: 'No autorizado por JWT' })
    @ApiResponse({ status: 404, description: 'Reporte no encontrado' })
    @UseGuards(UsersAuthGuard)
    @ApiBearerAuth()
    async getCompleteSearchReport(
        @Param('id') id: number,
        @Req() req: AuthenticatedRequest
    ): Promise<SearchReport> {
        return await this.reportsService.getCompleteSearchReport(
            id,
            req.user.id
        );
    }

    @Get('/dashboard/accepted')
    @ApiOperation({ summary: 'Endpoint para obtener el feed del dashboard' })
    @ApiResponse({
        status: 200,
        description: 'Reportes obtenidos correctamente',
        example: [
            {
                id: 2,
                title: 'Estafa en Facebook',
                name: 'Leonardo',
                lastName: 'Perez',
                createdAt: '2025-10-14T03:53:31.000Z',
                category: 'Página de internet'
            }
        ]
    })
    @ApiResponse({ status: 401, description: 'No autorizado por jwt' })
    @UseGuards(AdminsAuthGuard)
    @ApiBearerAuth()
    async getDashboardFeed(): Promise<ShortDashboardReport[]> {
        return await this.reportsService.getDashboardAccepted();
    }

    @Get('/dashboard/rejected')
    @ApiOperation({
        summary: 'Endpoint para obtener los reportes rechazados en el dashboard'
    })
    @ApiResponse({
        status: 200,
        description: 'Reportes obtenidos correctamente',
        example: [
            {
                id: 2,
                title: 'Estafa en Facebook',
                name: 'Leonardo',
                lastName: 'Perez',
                createdAt: '2025-10-14T03:53:31.000Z',
                category: 'Página de internet'
            }
        ]
    })
    @ApiResponse({ status: 401, description: 'No autorizado por jwt' })
    @UseGuards(AdminsAuthGuard)
    @ApiBearerAuth()
    async getDashboardRejected(): Promise<ShortDashboardReport[]> {
        return await this.reportsService.getDashboardRejected();
    }

    @Get('/weekly')
    @ApiOperation({
        summary:
            'Endpoint para obtener el numero de reportes por dia en la ultima semana'
    })
    @ApiResponse({
        status: 200,
        description: 'Datos obtenidos correctamente',
        example: [{ date: '2025-10-20', num: '10' }]
    })
    async getWeeklyReports(): Promise<ReportDateInfo[]> {
        return await this.reportsService.getWeeklyReports();
    }
}
