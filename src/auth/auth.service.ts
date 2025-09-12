import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserProfile } from './types/auth.types';
import { UserLoginDto } from './dto/user-login.dto';
import { UsersService } from 'src/users/users.service';
import { sha256 } from 'src/utils/hash/hash.util';
import { TokenService } from './tokens.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly tokenService: TokenService
    ) {}

    async loginUser(userLoginDto: UserLoginDto) {
        const user = await this.usersService.validateUser(userLoginDto.email, userLoginDto.password);
        if (!user) {
            throw new HttpException(
                { error: 'Invalid credentials or user inactive' },
                HttpStatus.UNAUTHORIZED
            );
        }
        const profile: UserProfile = {
            id: user.id,
            name: user.name,
            lastName1: user.last_name1,
            lastName2: user.last_name2,
            email: user.email
        };
        const accessToken = await this.tokenService.generateAccessToken(profile);
        const refreshToken = await this.tokenService.generateRefreshToken(profile);
        return {
            access_token: accessToken,
            refresh_token: refreshToken
        };
    }
}
