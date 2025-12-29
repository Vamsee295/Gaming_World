import { SignupRequest, LoginRequest, AuthResponse, ApiErrorResponse } from '@/types/auth.types';

const API_BASE_URL = 'http://localhost:8081/api';

// Token management
const TOKEN_KEY = 'gw_auth_token';

export const getAuthToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
};

export const setAuthToken = (token: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(TOKEN_KEY, token);
    }
};

export const removeAuthToken = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(TOKEN_KEY);
    }
};

// API call helper with error handling
async function apiCall<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const token = getAuthToken();
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
        });

        const data = await response.json();

        if (!response.ok) {
            // Handle error responses
            const error = data as ApiErrorResponse;
            throw new Error(error.message || 'An error occurred');
        }

        return data as T;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Network error occurred');
    }
}

// Authentication Service
export const authService = {
    /**
     * Register a new user
     */
    async signup(request: SignupRequest): Promise<AuthResponse> {
        const response = await apiCall<AuthResponse>('/auth/signup', {
            method: 'POST',
            body: JSON.stringify(request),
        });

        // Store the token
        setAuthToken(response.token);
        return response;
    },

    /**
     * Login user
     */
    async login(request: LoginRequest): Promise<AuthResponse> {
        const response = await apiCall<AuthResponse>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(request),
        });

        // Store the token
        setAuthToken(response.token);
        return response;
    },

    /**
     * Logout user (client-side)
     */
    async logout(): Promise<void> {
        removeAuthToken();
        // Optionally call backend logout endpoint
        try {
            await apiCall('/auth/logout', { method: 'POST' });
        } catch (error) {
            // Ignore errors on logout
            console.error('Logout error:', error);
        }
    },

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return getAuthToken() !== null;
    },

    /**
     * Validate token (optional - could call backend to verify)
     */
    async validateToken(): Promise<boolean> {
        const token = getAuthToken();
        if (!token) return false;

        // For now, just check if token exists
        // In a production app, you might want to verify with the backend
        return true;
    },
};
