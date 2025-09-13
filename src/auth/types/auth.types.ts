export type ActorType = 'user' | 'admin';

export interface AccessTokenPayload {
    sub: number;
    type: 'access';
    actor: ActorType;
}

export interface RefreshTokenPayload {
    sub: number;
    type: 'refresh';
    actor: ActorType;
}
