export interface JwtPayload {
    sub: string; // userId
    email: string;
    username: string;
    role: string;
    permissions: string[];
    phoneNumber?: string;
    location?: string;
    iat?: number;
    exp?: number;
}
