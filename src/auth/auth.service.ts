import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { UsersService } from 'src/users/users.service';
import { TokenService } from './tokens.service';
import { AdminsService } from 'src/admins/admins.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import { UserRefreshDto } from './dto/user-refresh.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly tokenService: TokenService,
        private readonly adminsService: AdminsService
    ) {}

    async loginUser(userLoginDto: UserLoginDto) {
        const user = await this.usersService.validateUser(
            userLoginDto.email,
            userLoginDto.password
        );
        if (!user) {
            throw new HttpException(
                { error: 'Invalid credentials' },
                HttpStatus.UNAUTHORIZED
            );
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
            access_token: accessToken,
            refresh_token: refreshToken
        };
    }

    async refreshUserToken(refreshTokenDto: UserRefreshDto) {
        const payload = await this.tokenService.verifyRefreshToken(
            refreshTokenDto.refresh_token
        );

        if (payload.actor !== 'user') {
            throw new HttpException(
                { error: 'Invalid token actor' },
                HttpStatus.UNAUTHORIZED
            );
        }

        const user = await this.usersService.findById(payload.sub);
        if (!user) {
            throw new HttpException(
                { error: 'User not found' },
                HttpStatus.UNAUTHORIZED
            );
        }

        const accessToken = await this.tokenService.generateAccessToken(
            user.id,
            'user'
        );

        return {
            access_token: accessToken
        };
    }

    async loginAdmin(dto: AdminLoginDto) {
        const admin = await this.adminsService.validateAdmin(
            dto.username,
            dto.password
        );
        if (!admin) {
            throw new HttpException(
                { error: 'Invalid credentials' },
                HttpStatus.UNAUTHORIZED
            );
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
            access_token: accessToken,
            refresh_token: refreshToken
        };
    }

    async refreshAdminToken(refreshTokenDto: UserRefreshDto) {
        const payload = await this.tokenService.verifyRefreshToken(
            refreshTokenDto.refresh_token
        );

        if (payload.actor !== 'admin') {
            throw new HttpException(
                { error: 'Invalid token actor' },
                HttpStatus.UNAUTHORIZED
            );
        }

        const admin = await this.adminsService.findById(payload.sub);
        if (!admin) {
            throw new HttpException(
                { error: 'Admin not found' },
                HttpStatus.UNAUTHORIZED
            );
        }

        const accessToken = await this.tokenService.generateAccessToken(
            admin.id,
            'admin'
        );

        return {
            access_token: accessToken
        };
    }
}
