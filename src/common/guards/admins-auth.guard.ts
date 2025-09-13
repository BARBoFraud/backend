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

@Injectable()
export class AdminsAuthGuard implements CanActivate {
    constructor(private readonly tokenService: TokenService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context
            .switchToHttp()
            .getRequest<UserAuthenticatedRequest>();

        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new HttpException(
                { error: 'Token not found' },
                HttpStatus.UNAUTHORIZED
            );
        }

        const payload = await this.tokenService.verifyAccessToken(token);

        if (payload.actor !== 'admin') {
            throw new HttpException(
                { error: 'Not authorized as admin' },
                HttpStatus.FORBIDDEN
            );
        }

        request.user = {
            id: payload.sub,
            actor: payload.actor
        };
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
