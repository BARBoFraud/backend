import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StringValue } from 'ms';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import {
    AccessTokenPayload,
    ActorType,
    DecodedToken,
    RefreshTokenPayload
} from './types/auth.types';

@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService) {}

    async generateAccessToken(id: number, actor: ActorType): Promise<string> {
        const payload: AccessTokenPayload = {
            sub: id,
            type: 'access',
            actor
        };

        const expiresIn = process.env.JWT_EXPIRES_ACCESS as StringValue;

        const options: JwtSignOptions = {
            secret: process.env.JWT_SECRET,
            expiresIn: expiresIn
        };

        return this.jwtService.signAsync(payload, options);
    }

    async generateRefreshToken(id: number, actor: ActorType): Promise<string> {
        const payload: RefreshTokenPayload = {
            sub: id,
            type: 'refresh',
            actor
        };

        const expiresIn = process.env.JWT_EXPIRES_REFRESH as StringValue;

        const options: JwtSignOptions = {
            secret: process.env.JWT_SECRET,
            expiresIn: expiresIn
        };

        return this.jwtService.signAsync(payload, options);
    }

    async verifyAccessToken(token: string): Promise<AccessTokenPayload> {
        try {
            const payload =
                await this.jwtService.verifyAsync<AccessTokenPayload>(token, {
                    secret: process.env.JWT_SECRET
                });

            if (payload.type !== 'access') {
                throw new UnauthorizedException('Invalid token type');
            }

            return payload;
        } catch {
            throw new UnauthorizedException('Invalid or expired access token');
        }
    }

    async verifyRefreshToken(token: string): Promise<RefreshTokenPayload> {
        try {
            const payload =
                await this.jwtService.verifyAsync<RefreshTokenPayload>(token, {
                    secret: process.env.JWT_SECRET
                });

            if (payload.type !== 'refresh') {
                throw new UnauthorizedException('Invalid token type');
            }

            return payload;
        } catch {
            throw new UnauthorizedException('Invalid or expired refresh token');
        }
    }

    decodeRefreshToken(token: string): DecodedToken {
        return this.jwtService.decode(token);
    }
}
