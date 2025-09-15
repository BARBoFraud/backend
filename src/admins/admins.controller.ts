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
    @ApiResponse({ status: 401, description: 'No autorizado por JWT' })
    @ApiResponse({ status: 403, description: 'Tipo de usuario no autorizado' })
    getProfile(@Req() req: UserAuthenticatedRequest) {
        return this.adminsService.findById(req.user.id);
    }

    @Delete('/delete/:username')
    @UseGuards(AdminsAuthGuard)
    @ApiBearerAuth()
    @ApiResponse({ status: 403, description: 'Tipo de usuario no autorizado' })
    @ApiResponse({ status: 401, description: 'No autorizado por JWT' })
    @ApiResponse({ status: 200, description: 'Administrador eliminado' })
    async deleteAdmin(@Param('username') username: string) {
        await this.adminsService.deleteAdmin(username);
        return { message: 'Administrador eliminado' };
    }
}
