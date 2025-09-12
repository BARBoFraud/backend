import { AccessTokenPayload } from '../../auth/types/auth.types';
import { Request } from 'express';

export interface AuthenticatedUser {
    profile: AccessTokenPayload['profile'];
}

export interface AuthenticatedRequest extends Request {
    user: AuthenticatedUser;
}
