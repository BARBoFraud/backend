import { UserAccessTokenPayload } from '../../auth/types/auth.types';
import { Request } from 'express';

export interface AuthenticatedUser {
    profile: UserAccessTokenPayload['profile'];
}

export interface UserAuthenticatedRequest extends Request {
    user: AuthenticatedUser;
}
