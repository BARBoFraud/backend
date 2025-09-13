import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RefreshTokenDto, UserLoginDto } from './dto/user-login.dto';
import { UsersService } from 'src/users/users.service';
import { TokenService } from './tokens.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly tokenService: TokenService
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

    async refreshUserToken(refreshTokenDto: RefreshTokenDto) {
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
}
