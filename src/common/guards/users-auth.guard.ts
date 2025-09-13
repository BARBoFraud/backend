import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable
} from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from '../../auth/tokens.service';
import { UserAuthenticatedRequest } from '../interfaces/authenticated-requests';

// Codigo basado en documentacion de nestjs

@Injectable()
export class UsersAuthGuard implements CanActivate {
    constructor(private readonly authService: TokenService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context
            .switchToHttp()
            .getRequest<UserAuthenticatedRequest>();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new HttpException(
                { error: 'Token not found in request header' },
                HttpStatus.UNAUTHORIZED
            );
        }
        const payload = await this.authService.verifyAccessToken(token);
        request.user = payload;
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
