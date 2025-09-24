import {
    Injectable,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { UsersService } from '../users/users.service';
import { TokenService } from './tokens.service';
import { AdminsService } from '../admins/admins.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import { UserRefreshDto } from './dto/user-refresh.dto';
import { RefreshResponse, TokenPair } from './types/auth.types';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly tokenService: TokenService,
        private readonly adminsService: AdminsService
    ) {}

    async loginUser(userLoginDto: UserLoginDto): Promise<TokenPair> {
        const user = await this.usersService.validateUser(
            userLoginDto.email,
            userLoginDto.password
        );
        if (!user) {
            throw new UnauthorizedException('Credenciales incorrectas');
        }
        const accessToken = await this.tokenService.generateAccessToken(
            user.id,
            'user'
        );
        const refreshToken = await this.tokenService.generateRefreshToken(
            user.id,
            'user'
        );
        return {
            accessToken,
            refreshToken
        };
    }

    async refreshUserToken(
        refreshTokenDto: UserRefreshDto
    ): Promise<RefreshResponse> {
        const payload = await this.tokenService.verifyRefreshToken(
            refreshTokenDto.refreshToken
        );

        if (payload.actor !== 'user') {
            throw new UnauthorizedException('Tipo de usuario no permitido');
        }

        const user = await this.usersService.findById(payload.sub);
        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }

        const accessToken = await this.tokenService.generateAccessToken(
            user.id,
            'user'
        );

        return {
            accessToken
        };
    }

    async loginAdmin(dto: AdminLoginDto): Promise<TokenPair> {
        const admin = await this.adminsService.validateAdmin(
            dto.username,
            dto.password
        );
        if (!admin) {
            throw new UnauthorizedException('Credenciales incorrectas');
        }

        const accessToken = await this.tokenService.generateAccessToken(
            admin.id,
            'admin'
        );
        const refreshToken = await this.tokenService.generateRefreshToken(
            admin.id,
            'admin'
        );

        return {
            accessToken,
            refreshToken
        };
    }

    async refreshAdminToken(
        refreshTokenDto: UserRefreshDto
    ): Promise<RefreshResponse> {
        const payload = await this.tokenService.verifyRefreshToken(
            refreshTokenDto.refreshToken
        );

        if (payload.actor !== 'admin') {
            throw new UnauthorizedException('Tipo de usuario no permitido');
        }

        const admin = await this.adminsService.findById(payload.sub);
        if (!admin) {
            throw new NotFoundException('Administrador no encontrado');
        }

        const accessToken = await this.tokenService.generateAccessToken(
            admin.id,
            'admin'
        );

        return {
            accessToken
        };
    }
}
