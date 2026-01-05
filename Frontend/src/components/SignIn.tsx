import React, { useState } from 'react';
import { authService } from '@/services/authService';
import { useAuth } from '@/context/AuthContext';

interface SignInProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignIn: React.FC<SignInProps> = ({ isOpen, onClose }) => {
  const [isActive, setIsActive] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { login: setAuthUser } = useAuth();

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [country, setCountry] = useState("US");

  // Error and loading states
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleRegisterClick = () => {
    setIsActive(true);
    setShowForgotPassword(false);
    setError("");
  };

  const handleLoginClick = () => {
    setIsActive(false);
    setShowForgotPassword(false);
    setError("");
  };

  const handleForgotPasswordClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowForgotPassword(true);
    setError("");
  };

  const handleBackToLoginClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowForgotPassword(false);
    setError("");
  };

  const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authService.signup({
        username: name,
        email: email,
        password: signupPassword,
        country: country
      });

      // Set authenticated user
      setAuthUser({
        userId: response.userId,
        username: response.username,
        email: response.email,
        role: response.role
      });

      // Clear form
      setName("");
      setEmail("");
      setSignupPassword("");
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignInSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authService.login({
        usernameOrEmail: email,
        password: password
      });

      // Set authenticated user
      setAuthUser({
        userId: response.userId,
        username: response.username,
        email: response.email,
        role: response.role
      });

      // Clear form
      setEmail("");
      setPassword("");
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("Password reset functionality coming soon!");
  };

  return (
    <div className="signin-overlay" onClick={onClose}>
      <div
        className={`signin-container ${isActive ? 'active' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="signin-form-container signin-sign-up">
          <form onSubmit={handleSignUpSubmit}>
            <h1>Create Account</h1>
            <div className="signin-social-icons">
              <a href="#" className="icon" onClick={(e) => e.preventDefault()}><i className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className="icon" onClick={(e) => e.preventDefault()}><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="icon" onClick={(e) => e.preventDefault()}><i className="fa-brands fa-github"></i></a>
              <a href="#" className="icon" onClick={(e) => e.preventDefault()}><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registeration</span>
            {error && isActive && <div className="error-message">{error}</div>}
            <input type="text" placeholder="Username" required value={name} onChange={(e) => setName(e.target.value)} disabled={loading} />
            <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
            <input type="password" placeholder="Password" required value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} disabled={loading} />
            <button type="submit" disabled={loading}>{loading ? 'Creating Account...' : 'Sign Up'}</button>
          </form>
        </div>

        <div className="signin-form-container signin-sign-in">
          <form id="sign-in-form" style={{ display: showForgotPassword ? 'none' : 'flex' }} onSubmit={handleSignInSubmit}>
            <h1>Sign In</h1>
            <div className="signin-social-icons">
              <a href="#" className="icon" onClick={(e) => e.preventDefault()}><i className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className="icon" onClick={(e) => e.preventDefault()}><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="icon" onClick={(e) => e.preventDefault()}><i className="fa-brands fa-github"></i></a>
              <a href="#" className="icon" onClick={(e) => e.preventDefault()}><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <span>or use your email password</span>
            {error && !isActive && !showForgotPassword && <div className="error-message">{error}</div>}
            <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
            <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
            <a href="#" id="forgot-password-link" onClick={handleForgotPasswordClick}>
              Forget Your Password?
            </a>
            <button type="submit" disabled={loading}>{loading ? 'Signing In...' : 'Sign In'}</button>
          </form>

          <form
            id="forgot-password-form"
            style={{ display: showForgotPassword ? 'flex' : 'none' }}
            onSubmit={handleForgotPasswordSubmit}
          >
            <h1 style={{ marginBottom: '20px' }}>Forgot Password</h1>
            <span>Please enter your email to reset</span>
            {error && showForgotPassword && <div className="error-message">{error}</div>}
            <input type="email" placeholder="Email" required />
            <button type="submit" style={{ marginTop: '20px' }}>Send Reset Link</button>
            <a href="#" id="back-to-login-link" style={{ marginTop: '15px' }} onClick={handleBackToLoginClick}>
              Back to Sign In
            </a>
          </form>
        </div>

        <div className="signin-toggle-container">
          <div className="signin-toggle">
            <div className="signin-toggle-panel signin-toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="signin-toggle-button" id="login" onClick={handleLoginClick}>Sign In</button>
            </div>
            <div className="signin-toggle-panel signin-toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of site features</p>
              <button className="signin-toggle-button" id="register" onClick={handleRegisterClick}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

