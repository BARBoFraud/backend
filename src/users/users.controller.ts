import {
    Body,
    Controller,
    Get,
    Patch,
    Post,
    Req,
    UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';
import { UsersAuthGuard } from '../common/guards/users-auth.guard';
import type { AuthenticatedRequest } from '../common/interfaces/authenticated-requests';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserData } from './types/user.types';
import { DeactivateUserDto } from './dto/deactivate-user.dto';

@ApiTags('Modulo de usuarios')
@Controller({ path: '/users', version: '1' })
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/register')
    @ApiOperation({ summary: 'Endpoint de registro de usuarios' })
    @ApiResponse({ status: 201, description: 'Usuario creado correctamente' })
    @ApiResponse({ status: 409, description: 'Email ya registrado' })
    async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
        await this.usersService.createUser(createUserDto);
    }

    @Get('/profile')
    @UseGuards(UsersAuthGuard)
    @ApiOperation({ summary: 'Obtener el perfil de usuario con jwt' })
    @ApiResponse({
        status: 200,
        description: 'Perfil obtenido correctamente',
        example: {
            id: 1,
            name: 'Diego',
            lastName1: 'Olmos',
            lastName2: 'Dieguez',
            email: 'DiegoOlmos@tec.mx'
        }
    })
    @ApiResponse({ status: 401, description: 'Token inválido o expirado' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    @ApiBearerAuth()
    async getProfile(@Req() req: AuthenticatedRequest): Promise<UserData> {
        return await this.usersService.getProfile(req.user.id);
    }

    @Patch('/update')
    @UseGuards(UsersAuthGuard)
    @ApiOperation({
        summary: 'Endpoint para modificar los datos de un usuario'
    })
    @ApiResponse({
        status: 200,
        description: 'Perfil actualizado correctamente'
    })
    @ApiResponse({ status: 401, description: 'Token invalido o expirado' })
    @ApiResponse({ status: 422, description: 'Todos los campos vacios' })
    @ApiBearerAuth()
    async updateProfile(
        @Req() req: AuthenticatedRequest,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<void> {
        await this.usersService.updateUser(req.user.id, updateUserDto);
    }

    @Patch('/deactivate')
    @UseGuards(UsersAuthGuard)
    @ApiOperation({
        summary: 'Endpoint para desactivar la cuenta de un usuario'
    })
    @ApiResponse({
        status: 200,
        description: 'Usuario desactivado correctamente'
    })
    @ApiResponse({ status: 401, description: 'No autorizado por jwt' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    @ApiResponse({ status: 409, description: 'Contraseña incorrecta' })
    @ApiBearerAuth()
    async deactivateUser(
        @Req() req: AuthenticatedRequest,
        @Body() deactivateUserDto: DeactivateUserDto
    ): Promise<void> {
        await this.usersService.deactivateUser(req.user.id, deactivateUserDto);
    }
}
