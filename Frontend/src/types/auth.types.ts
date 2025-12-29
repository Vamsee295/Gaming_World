// Authentication Request Types
export interface SignupRequest {
    username: string;
    email: string;
    password: string;
    country?: string;
}

export interface LoginRequest {
    usernameOrEmail: string;
    password: string;
}

// Authentication Response Types
export interface AuthResponse {
    token: string;
    tokenType: string;
    userId: number;
    username: string;
    email: string;
    role: string;
}

// Error Types
export interface AuthError {
    message: string;
    errors?: Record<string, string[]>; // Field-specific validation errors
}

// API Error Response
export interface ApiErrorResponse {
    timestamp: string;
    status: number;
    error: string;
    message: string;
    path: string;
}
