import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Req,
    UseGuards
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminsAuthGuard } from '../common/guards/admins-auth.guard';
import type { AuthenticatedRequest } from '../common/interfaces/authenticated-requests';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';

@ApiTags('Modulo de administradores')
@Controller({ path: 'admins', version: '1' })
export class AdminsController {
    constructor(private readonly adminsService: AdminsService) {}

    @Post('/create')
    @ApiOperation({ summary: 'Endpoint de registro de administradores' })
    @UseGuards(AdminsAuthGuard)
    @ApiResponse({
        status: 201,
        description: 'Administrador creado correctamente'
    })
    @ApiResponse({ status: 401, description: 'Token inválido o expirado' })
    @ApiResponse({ status: 409, description: 'Username ya registrado' })
    @ApiBearerAuth()
    async createAdmin(@Body() createAdminDto: CreateAdminDto) {
        return await this.adminsService.createAdmin(createAdminDto);
    }

    @Get('/profile')
    @UseGuards(AdminsAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Obtener el perfil de administrador con jwt' })
    @ApiResponse({ status: 200, description: 'Perfil obtenido correctamente' })
    @ApiResponse({ status: 401, description: 'Token inválido o expirado' })
    @ApiResponse({ status: 404, description: 'Admin no encontrado' })
    getProfile(@Req() req: AuthenticatedRequest) {
        return this.adminsService.findById(req.user.id);
    }

    @Delete('/delete/:username')
    @UseGuards(AdminsAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary:
            'Endpoint para eliminar a un administrador desde la cuenta de otro'
    })
    @ApiResponse({ status: 401, description: 'Token inválido o expirado' })
    @ApiResponse({ status: 404, description: 'Admin no encontrado' })
    @ApiResponse({ status: 200, description: 'Administrador eliminado' })
    async deleteAdmin(@Param('username') username: string) {
        await this.adminsService.deleteAdmin(username);
    }

    @Get('/list')
    @ApiBearerAuth()
    @UseGuards(AdminsAuthGuard)
    @ApiOperation({
        summary:
            'Endpoint para obtener a los administradores registrados en db, menos el activo'
    })
    @ApiResponse({ status: 200, description: 'Admins obtenidos correctamente' })
    @ApiResponse({ status: 401, description: 'No autorizado por jwt' })
    async getAdminList(@Req() req: AuthenticatedRequest) {
        return await this.adminsService.getAdminList(req.user.id);
    }
}
