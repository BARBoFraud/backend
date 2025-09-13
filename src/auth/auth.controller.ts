import { Body, Controller, Post } from '@nestjs/common';
import { RefreshTokenDto, UserLoginDto } from './dto/user-login.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Modulo de autenticacion')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/users/login')
    @ApiOperation({ summary: 'Login de usuario, regresa tokens JWT' })
    @ApiResponse({
        status: 401,
        description: 'Credenciales incorrectas'
    })
    @ApiResponse({ status: 201, description: 'Inicio de sesion exitoso' })
    async userLogin(@Body() userLoginDto: UserLoginDto) {
        return await this.authService.loginUser(userLoginDto);
    }

    @Post('/users/refresh')
    @ApiOperation({ summary: 'Refresh de access token, regresa nuevo token' })
    @ApiResponse({ status: 201, description: 'Refrescado correctamente' })
    @ApiResponse({ status: 401, description: 'Refresh token invalido' })
    async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
        return await this.authService.refreshUserToken(refreshTokenDto);
    }
}
