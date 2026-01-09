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

        // Handle network errors
        if (!response.ok) {
            let errorMessage = 'An error occurred';

            try {
                const data = await response.json();
                const error = data as ApiErrorResponse;
                errorMessage = error.message || errorMessage;
            } catch {
                // If JSON parsing fails, use status text
                if (response.status === 401) {
                    errorMessage = 'Invalid credentials. Please check your email and password.';
                } else if (response.status === 404) {
                    errorMessage = 'User not found. Please sign up first.';
                } else {
                    errorMessage = `Error: ${response.statusText}`;
                }
            }

            throw new Error(errorMessage);
        }

        return await response.json() as T;
    } catch (error) {
        // Check for network errors (backend not running)
        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new Error('Cannot connect to server. Please make sure the backend is running on http://localhost:8081');
        }

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
