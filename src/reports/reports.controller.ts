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
    ) {
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
    ) {
        await this.reportsService.updateReport(
            req.user.id,
            reportId,
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
                id: 4,
                description: 'Fui estafado por este usuario en facebook.',
                url: 'https:facebook.com',
                website: 'Facebook',
                socialMedia: 'Facebook',
                phoneNumber: '5627452471',
                createdAt: '2025-10-02T21:58:42.000Z',
                username: 'Laura Gomez',
                email: 'A01665462@tec.mx',
                category: 'Página de internet',
                status: 'Pendiente'
            },
            {
                id: 3,
                description: 'Fui estafado por esta pagina web.',
                url: 'https:tennisgratis.com',
                website: 'Tennis Gratis Mx',
                socialMedia: 'Instagram',
                phoneNumber: '5627452471',
                createdAt: '2025-10-02T21:58:37.000Z',
                username: 'Juan Perez',
                email: 'A01665462@tec.mx',
                category: 'Página de internet',
                status: 'Pendiente'
            }
        ]
    })
    @ApiResponse({ status: 401, description: 'No autorizado por JWT' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    @ApiBearerAuth()
    async getUserHistory(@Req() req: AuthenticatedRequest) {
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
                id: 4,
                name: 'Diego',
                lastName: 'Olmos',
                category: 'Página de internet',
<<<<<<< HEAD
                createdAt: '2025-10-09T04:31:12.000Z',
                description: 'Esta tienda en linea me estafó.',
                image: 'http://localhost:4000/public/uploads/1758854167272.jpeg',
                url: 'https:tennisgratis.com',
                website: 'Tennis Gratis MX',
                socialMedia: 'Instagram',
                username: 'Laura Gomez',
                email: 'DiegoOmos@tec.mx',
                phoneNumber: '5627452471',
                userLiked: 0,
                likesCount: 1,
                commentsCount: 0
=======
                createdAt: '2025-10-02T21:58:31.000Z',
                description: 'Aaaaaaaa 121212121 asdasdad asdasdasd',
                image: 'http://localhost:3000/public/uploads/1231231.jpg',
                url: 'https:estafas.com',
                website: 'estafotas',
                socialMedia: 'Instagram',
                username: 'leotefortnite',
                email: 'A01665462@tec.mx',
                phoneNumber: '121212121',
                likesCount: 0,
                commentsCount: 0,
                userLiked: 0
            },
            {
                id: 1,
                category: 'Red social',
                createdAt: '2025-10-02T21:58:27.000Z',
                description: 'Aaaaaaaa asdjalkfjasf asdasdad asdasdasd',
                image: 'http://localhost:3000/public/uploads/1231231.jpg',
                url: 'https:estafas.com',
                website: 'estafotas',
                socialMedia: 'Instagram',
                username: 'leotefortnite',
                email: 'A01665462@tec.mx',
                phoneNumber: '121212121',
                likesCount: 0,
                commentsCount: 0,
                userLiked: 0
>>>>>>> bd720ea (Revert "Change image url on feed response")
            }
        ]
    })
    @ApiResponse({ status: 401, description: 'No autorizado por jwt' })
    async getFeed(@Req() req: AuthenticatedRequest) {
        return this.reportsService.getFeed(req.user.id);
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
                id: 3,
                website: 'estafaasdassgeimer',
                socialMedia: 'Instagram',
                email: 'DiegoOmos@tec.mx',
                phoneNumber: '5627452471'
            }
        ]
    })
    @ApiResponse({ status: 401, description: 'No autorizado por jwt' })
    async searchReport(@Param('search') searchString: string) {
        return this.reportsService.searchReport(searchString);
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
                id: 1,
                name: 'Leonardo',
                lastName: 'Perez',
                url: 'https:tennisgratis.com',
                website: 'Tennis Gratis MX',
                socialMedia: 'Instagram',
<<<<<<< HEAD
                phoneNumber: '5627452471',
                createdAt: '2025-10-09T04:31:05.000Z',
                username: 'Laura Gomez',
                email: 'DiegoOmos@tec.mx',
=======
                phoneNumber: '121212121',
                createdAt: '2025-10-02T21:58:42.000Z',
                username: 'leotefortnite',
                email: 'A01665462@tec.mx',
                image: 'http://localhost:3000/public/uploads/1231231.jpg',
>>>>>>> bd720ea (Revert "Change image url on feed response")
                category: 'Página de internet'
            }
        ]
    })
    @ApiResponse({ status: 401, description: 'No autorizado por jwt' })
    @ApiBearerAuth()
    async getPendingReports() {
        return this.reportsService.getPendingReports();
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
    async getComments(@Param('reportId') reportId: number) {
        return this.reportsService.getReportComments(reportId);
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
    async evaluateReport(@Body() evaluateReportDto: EvaluateReportDto) {
        return this.reportsService.evaluateReport(evaluateReportDto);
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
    ) {
        return this.reportsService.likeReport(reportId, req.user.id);
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
    ) {
        return this.reportsService.unlikeReport(reportId, req.user.id);
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
    ) {
        await this.reportsService.commentReport(
            reportId,
            req.user.id,
            commentReportDto.content
        );
    }

    @Get(':id/history')
    @ApiOperation({
        summary: 'Endpoint para obtener un reporte completo del historial'
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
            phoneNumber: '5627452471',
            createdAt: '2025-10-11T20:51:15.000Z',
            username: 'Juan Perez',
            email: 'tennisgratismx@gmail.com',
            image: 'http://localhost:4000/public/uploads/123132213123.png',
            category: 'Página de internet',
            status: 'Pendiente'
        }
    })
    @ApiResponse({ status: 404, description: 'Reporte no encontrado' })
    @ApiResponse({ status: 401, description: 'No autorizado por jwt' })
    @ApiBearerAuth()
    @UseGuards(UsersAuthGuard)
    async getCompleteHistoryReport(
        @Param('id') id: number,
        @Req() req: AuthenticatedRequest
    ) {
        return this.reportsService.getCompleteHistoryReport(req.user.id, id);
    }

    @Get(':id/dashboard')
    @ApiOperation({
        summary: 'Endpoint para obtener un reporte completo del dashboard'
    })
    @ApiResponse({
        status: 200,
        description: 'Reporte obtenido correctamente',
        example: {
            name: 'Diego',
            lastName: 'Olmos',
            id: 7,
            description: 'Sitio web fraudulento, me robaron 4000 pesos.',
            url: 'www.tennisgratis.com',
            website: 'Tennis Gratis Mexico',
            socialMedia: 'Instagram',
            phoneNumber: '5627452471',
            createdAt: '2025-10-11T20:51:15.000Z',
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
    async getCompleteDashboardReport(@Param('id') id: number) {
        return this.reportsService.getCompleteDashboardReport(id);
    }

    @Get(':id/search')
    @ApiOperation({
        summary: 'Endpoint para obtener un reporte completo de busqueda'
    })
    @ApiResponse({
        status: 200,
        description: 'Reporte obtenido correctamente',
        example: {
            id: 3,
            name: 'Diego',
            lastName: 'Olmos',
            category: 'Página de internet',
            createdAt: '2025-10-09T04:31:10.000Z',
            description: 'Me estafaron ofreciendome un coche en 50 pesos.',
            image: 'http://localhost:4000/public/uploads/1758854167272.jpeg',
            url: 'https:cochesa50.com',
            website: 'Coches a 50',
            socialMedia: 'Instagram',
            username: 'Laura Gomez',
            email: 'DiegoOmos@tec.mx',
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
    ) {
        return this.reportsService.getCompleteSearchReport(id, req.user.id);
    }
}
