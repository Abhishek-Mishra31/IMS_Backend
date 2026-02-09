export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: {
        id: string;
        email: string;
        username: string;
        permissions: string[];
        phoneNumber?: string;
        location?: string;
    };
}
