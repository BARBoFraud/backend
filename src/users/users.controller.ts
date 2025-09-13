import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';
import { UsersAuthGuard } from 'src/common/guards/users-auth.guard';
import type { UserAuthenticatedRequest } from 'src/common/interfaces/authenticated-requests';

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
    @ApiBearerAuth()
    getProfile(@Req() req: UserAuthenticatedRequest) {
        return { profile: req.user.id };
    }
}
