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
        const user = await this.usersService.findByEmail(userLoginDto.email);

        if (!user) {
            throw new HttpException(
                { error: 'User does not exist' },
                HttpStatus.UNAUTHORIZED
            );
        }

        const hashedPassword = user.password;
        const salt = user.salt;
        const hash = sha256(userLoginDto.password);
        const newHash = sha256(hash + salt);

        if (newHash !== hashedPassword) {
            throw new HttpException(
                { error: 'Incorrect password' },
                HttpStatus.UNAUTHORIZED
            );
        }

        if (!user.active) {
            throw new HttpException(
                { error: 'User is not active' },
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

        const accessToken =
            await this.tokenService.generateAccessToken(profile);

        const refreshToken =
            await this.tokenService.generateRefreshToken(profile);

        return {
            access_token: accessToken,
            refresh_token: refreshToken
        };
    }
}
