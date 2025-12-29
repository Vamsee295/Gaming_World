'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { authService } from '@/services/authService';
import { LoginRequest } from '@/types/auth.types';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
    const router = useRouter();
    const { login: setAuthUser } = useAuth();
    const [formData, setFormData] = useState<LoginRequest>({
        usernameOrEmail: '',
        password: '',
    });
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await authService.login(formData);
            console.log('Login successful:', response);

            // Store user data in AuthContext
            setAuthUser({
                userId: response.userId,
                username: response.username,
                email: response.email,
                role: response.role,
            });

            // Redirect to home or previous page
            const redirectUrl = (router.query.redirect as string) || '/';
            router.push(redirectUrl);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1 className="auth-title">Welcome Back</h1>
                    <p className="auth-subtitle">Sign in to your GameVerse account</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {error && (
                        <div className="error-message">
                            <svg className="error-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="usernameOrEmail" className="form-label">
                            Username or Email
                        </label>
                        <input
                            id="usernameOrEmail"
                            name="usernameOrEmail"
                            type="text"
                            required
                            autoComplete="username"
                            value={formData.usernameOrEmail}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Enter your username or email"
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Enter your password"
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="submit-button"
                    >
                        {loading ? (
                            <span className="loading-spinner">
                                <svg className="spinner-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing in...
                            </span>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <p className="footer-text">
                        Don't have an account?{' '}
                        <Link href="/auth/signup" className="footer-link">
                            Create one now
                        </Link>
                    </p>
                </div>
            </div>

            <style jsx>{`
                .auth-container {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    padding: 2rem;
                }

                .auth-card {
                    width: 100%;
                    max-width: 450px;
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    border-radius: 20px;
                    padding: 3rem;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .auth-header {
                    text-align: center;
                    margin-bottom: 2.5rem;
                }

                .auth-title {
                    font-size: 2.5rem;
                    font-weight: 800;
                    color: #ffffff;
                    margin-bottom: 0.5rem;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                }

                .auth-subtitle {
                    font-size: 1rem;
                    color: rgba(255, 255, 255, 0.9);
                }

                .auth-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .error-message {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 1rem;
                    background: rgba(239, 68, 68, 0.2);
                    border: 1px solid rgba(239, 68, 68, 0.5);
                    border-radius: 10px;
                    color: #fff;
                    font-size: 0.875rem;
                    animation: slideIn 0.3s ease-out;
                }

                .error-icon {
                    width: 20px;
                    height: 20px;
                    flex-shrink: 0;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .form-label {
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: #ffffff;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .form-input {
                    padding: 0.875rem 1rem;
                    background: rgba(255, 255, 255, 0.15);
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    border-radius: 10px;
                    font-size: 1rem;
                    color: #ffffff;
                    transition: all 0.3s ease;
                    outline: none;
                }

                .form-input::placeholder {
                    color: rgba(255, 255, 255, 0.5);
                }

                .form-input:focus {
                    background: rgba(255, 255, 255, 0.25);
                    border-color: rgba(255, 255, 255, 0.5);
                    transform: translateY(-2px);
                }

                .form-input:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .submit-button {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                    border: none;
                    border-radius: 10px;
                    font-size: 1rem;
                    font-weight: 700;
                    color: #ffffff;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    box-shadow: 0 10px 25px -5px rgba(245, 87, 108, 0.4);
                }

                .submit-button:hover:not(:disabled) {
                    transform: translateY(-3px);
                    box-shadow: 0 15px 30px -5px rgba(245, 87, 108, 0.6);
                }

                .submit-button:active:not(:disabled) {
                    transform: translateY(-1px);
                }

                .submit-button:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .loading-spinner {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                }

                .spinner-icon {
                    width: 20px;
                    height: 20px;
                    animation: spin 1s linear infinite;
                }

                .auth-footer {
                    margin-top: 2rem;
                    text-align: center;
                }

                .footer-text {
                    font-size: 0.875rem;
                    color: rgba(255, 255, 255, 0.9);
                }

                .footer-link {
                    color: #ffffff;
                    font-weight: 700;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    border-bottom: 2px solid transparent;
                }

                .footer-link:hover {
                    border-bottom-color: #ffffff;
                }

                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }

                @media (max-width: 640px) {
                    .auth-card {
                        padding: 2rem;
                    }

                    .auth-title {
                        font-size: 2rem;
                    }
                }
            `}</style>
        </div>
    );
}
