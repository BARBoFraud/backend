import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
    UserAccessTokenPayload,
    UserRefreshTokenPayload,
    UserProfile
} from './types/auth.types';

@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService) {}

    async generateAccessToken(profile: UserProfile): Promise<string> {
        const payload: UserAccessTokenPayload = {
            sub: profile.id,
            type: 'access',
            profile
        };

        return this.jwtService.signAsync(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: process.env.JWT_EXPIRES_ACCESS
        });
    }

    async generateRefreshToken(profile: UserProfile): Promise<string> {
        const payload: UserRefreshTokenPayload = {
            sub: profile.id,
            type: 'refresh'
        };

        return this.jwtService.signAsync(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: process.env.JWT_EXPIRES_REFRESH
        });
    }

    async verifyAccessToken(token: string): Promise<UserAccessTokenPayload> {
        try {
            const payload =
                await this.jwtService.verifyAsync<UserAccessTokenPayload>(
                    token,
                    {
                        secret: process.env.JWT_SECRET
                    }
                );

            if (payload.type !== 'access') {
                throw new HttpException(
                    { error: 'Invalid token type, expected access' },
                    HttpStatus.UNAUTHORIZED
                );
            }

            return payload;
        } catch {
            throw new HttpException(
                { error: 'Invalid or expired access token' },
                HttpStatus.UNAUTHORIZED
            );
        }
    }

    async verifyRefreshToken(token: string): Promise<UserRefreshTokenPayload> {
        try {
            const payload =
                await this.jwtService.verifyAsync<UserRefreshTokenPayload>(
                    token,
                    {
                        secret: process.env.JWT_SECRET
                    }
                );

            if (payload.type !== 'refresh') {
                throw new HttpException(
                    { error: 'Invalid token type, expected refresh' },
                    HttpStatus.UNAUTHORIZED
                );
            }

            return payload;
        } catch {
            throw new HttpException(
                { error: 'Invalid or expired refresh token' },
                HttpStatus.UNAUTHORIZED
            );
        }
    }
}
