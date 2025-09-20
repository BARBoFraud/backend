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
import type { UserAuthenticatedRequest } from '../common/interfaces/authenticated-requests';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Modulo de usuarios')
@Controller({ path: '/users', version: '1' })
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/register')
    @ApiOperation({ summary: 'Endpoint de registro de usuarios' })
    @ApiResponse({ status: 201, description: 'Usuario creado correctamente' })
    @ApiResponse({ status: 409, description: 'Email ya registrado' })
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Get('/profile')
    @UseGuards(UsersAuthGuard)
    @ApiOperation({ summary: 'Obtener el perfil de usuario con jwt' })
    @ApiResponse({ status: 200, description: 'Perfil obtenido correctamente' })
    @ApiResponse({ status: 401, description: 'Token inválido o expirado' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    @ApiBearerAuth()
    getProfile(@Req() req: UserAuthenticatedRequest) {
        return this.usersService.findById(req.user.id);
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
    updateProfile(
        @Req() req: UserAuthenticatedRequest,
        @Body() updateUserDto: UpdateUserDto
    ) {
        return this.usersService.updateUser(req.user.id, updateUserDto);
    }
}
