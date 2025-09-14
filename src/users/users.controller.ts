import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
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

@ApiTags('Modulo de usuarios')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/register')
    @ApiOperation({ summary: 'Endpoint de registro de usuarios' })
    @ApiResponse({ status: 201, description: 'Usuario creado correctamente' })
    @ApiResponse({ status: 409, description: 'Email en uso' })
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Get('/profile')
    @UseGuards(UsersAuthGuard)
    @ApiOperation({ summary: 'Obtener el perfil de usuario con jwt' })
    @ApiResponse({ status: 200, description: 'Perfil obtenido correctamente' })
    @ApiResponse({ status: 401, description: 'No se encontro al usuario' })
    @ApiResponse({ status: 403, description: 'Usuario no autorizado' })
    @ApiBearerAuth()
    getProfile(@Req() req: UserAuthenticatedRequest) {
        return this.usersService.findById(req.user.id);
    }
}
