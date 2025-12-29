import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '@/services/authService';

interface User {
    userId: number;
    username: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if user is authenticated on mount
        const checkAuth = () => {
            const authenticated = authService.isAuthenticated();
            setIsAuthenticated(authenticated);

            // You could also fetch user data from localStorage or backend here
            if (authenticated) {
                const userData = localStorage.getItem('gw_user_data');
                if (userData) {
                    setUser(JSON.parse(userData));
                }
            }
        };

        checkAuth();
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('gw_user_data', JSON.stringify(userData));
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('gw_user_data');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
