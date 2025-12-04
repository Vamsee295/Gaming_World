import React, { useState } from 'react';
import { useUser } from '@/context/UserContext';

interface SignInProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignIn: React.FC<SignInProps> = ({ isOpen, onClose }) => {
  const [isActive, setIsActive] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { signIn } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const handleRegisterClick = () => {
    setIsActive(true);
    setShowForgotPassword(false);
    console.log('Sign Up clicked, isActive:', true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
    setShowForgotPassword(false);
  };

  const handleForgotPasswordClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowForgotPassword(true);
  };

  const handleBackToLoginClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowForgotPassword(false);
  };

  const handleSignUpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle sign up logic here
    signIn({ name: name || 'Player', email: email || 'player@example.com' });
    onClose();
  };

  const handleSignInSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn({ name: name || 'Player', email: email || 'player@example.com' });
    onClose();
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle forgot password logic here
    console.log('Forgot Password submitted');
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
            <input type="text" placeholder="Name" required value={name} onChange={(e)=>setName(e.target.value)} />
            <input type="email" placeholder="Email" required value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder="Password" required />
            <button type="submit">Sign Up</button>
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
            <input type="email" placeholder="Email" required value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder="Password" required />
            <a href="#" id="forgot-password-link" onClick={handleForgotPasswordClick}>
              Forget Your Password?
            </a>
            <button type="submit">Sign In</button>
          </form>

          <form 
            id="forgot-password-form" 
            style={{ display: showForgotPassword ? 'flex' : 'none' }}
            onSubmit={handleForgotPasswordSubmit}
          >
            <h1 style={{ marginBottom: '20px' }}>Forgot Password</h1>
            <span>Please enter your email to reset</span>
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

