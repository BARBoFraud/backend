export interface UserProfile {
    id: number;
    name: string;
    lastName1: string;
    lastName2: string;
    email: string;
}

export interface AccessTokenPayload {
    sub: number;
    type: 'access';
    profile: UserProfile;
}

export interface RefreshTokenPayload {
    sub: number;
    type: 'refresh';
}
