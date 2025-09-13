import { Request } from 'express';

export interface AuthenticatedUser {
    id: number;
    actor: 'user' | 'admin';
}

export interface UserAuthenticatedRequest extends Request {
    user: AuthenticatedUser;
}
