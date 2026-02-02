export interface JwtPayload {
    sub: string; // userId
    email: string;
    username: string;
    permissions: string[];
    iat?: number;
    exp?: number;
}
