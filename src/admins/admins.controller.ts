import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminsAuthGuard } from '../common/guards/admins-auth.guard';
import type { UserAuthenticatedRequest } from '../common/interfaces/authenticated-requests';
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
    @ApiResponse({
        status: 401,
        description: 'No autorizado por JWT'
    })
    @ApiResponse({
        status: 409,
        description: 'Ya existe un admin con ese usuario'
    })
    async createAdmin(@Body() createAdminDto: CreateAdminDto) {
        return await this.adminsService.createAdmin(createAdminDto);
    }

    @Get('/profile')
    @UseGuards(AdminsAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Obtener el perfil de administrador con jwt' })
    @ApiResponse({ status: 200, description: 'Perfil obtenido correctamente' })
    @ApiResponse({ status: 401, description: 'No se encontro al usuario' })
    @ApiResponse({ status: 403, description: 'Usuario no autorizado' })
    getProfile(@Req() req: UserAuthenticatedRequest) {
        return this.adminsService.findById(req.user.id);
    }
}
