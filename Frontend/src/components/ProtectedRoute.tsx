import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { authService } from '@/services/authService';

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            if (!authService.isAuthenticated()) {
                // Save the current path to redirect back after login
                const currentPath = router.asPath;
                router.push(`/auth/login?redirect=${encodeURIComponent(currentPath)}`);
            }
        };

        checkAuth();
    }, [router]);

    // If user is not authenticated, don't render children
    if (!authService.isAuthenticated()) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
                fontSize: '1.5rem'
            }}>
                Redirecting to login...
            </div>
        );
    }

    return <>{children}</>;
}
