export interface UserProfile {
    id: number;
    name: string;
    lastName1: string;
    lastName2: string;
    email: string;
}

export interface UserAccessTokenPayload {
    sub: number;
    type: 'access';
    profile: UserProfile;
}

export interface UserRefreshTokenPayload {
    sub: number;
    type: 'refresh';
}
