import { Body, Controller, Post } from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminLoginDto } from './dto/admin-login.dto';
import { AdminRefreshDto } from './dto/admin-refresh.dto';
import { UserRefreshDto } from './dto/user-refresh.dto';

@ApiTags('Modulo de autenticacion')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/users/login')
    @ApiOperation({ summary: 'Login de usuario, regresa tokens JWT' })
    @ApiResponse({ status: 201, description: 'Inicio de sesión exitoso' })
    @ApiResponse({ status: 401, description: 'Credenciales incorrectas' })
    async userLogin(@Body() userLoginDto: UserLoginDto) {
        return await this.authService.loginUser(userLoginDto);
    }

    @Post('/users/refresh')
    @ApiOperation({
        summary: 'Refresh de access token de usuario, regresa nuevo token'
    })
    @ApiResponse({ status: 201, description: 'Refrescado correctamente' })
    @ApiResponse({
        status: 401,
        description: 'Refresh token inválido o tipo de usuario no permitido'
    })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    async refresh(@Body() refreshTokenDto: UserRefreshDto) {
        return await this.authService.refreshUserToken(refreshTokenDto);
    }

    @Post('/admins/login')
    @ApiOperation({ summary: 'Login de admin, regresa tokens JWT' })
    @ApiResponse({ status: 201, description: 'Inicio de sesión exitoso' })
    @ApiResponse({ status: 401, description: 'Credenciales incorrectas' })
    async adminLogin(@Body() adminLoginDto: AdminLoginDto) {
        return await this.authService.loginAdmin(adminLoginDto);
    }

    @Post('/admins/refresh')
    @ApiOperation({
        summary: 'Refresh de access token de admin, regresa nuevo token'
    })
    @ApiResponse({ status: 201, description: 'Refrescado correctamente' })
    @ApiResponse({
        status: 401,
        description: 'Refresh token inválido o tipo de usuario no permitido'
    })
    @ApiResponse({ status: 404, description: 'Administrador no encontrado' })
    async adminRefresh(@Body() adminRefreshDto: AdminRefreshDto) {
        return await this.authService.refreshAdminToken(adminRefreshDto);
    }
}
