import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/VerifyEmail.css';
import GlobalLayout from '../components/GlobalLayout';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { verifyEmail, resendVerificationEmail } = useAuth();
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  useEffect(() => {
    if (token) {
      handleVerification();
    } else {
      setStatus('error');
      setMessage('Invalid verification link');
    }
  }, [token]);

  const handleVerification = async () => {
    try {
      setStatus('verifying');
      const result = await verifyEmail(token);
      
      if (result && result.success) {
        setStatus('success');
        setMessage('Your email has been successfully verified!');
        
        // Redirection après 3 secondes
        setTimeout(() => {
          navigate('/login', { 
            state: { 
              message: 'Email verified successfully! You can now log in.' 
            } 
          });
        }, 3000);
      } else {
        setStatus('error');
        setMessage(result?.message || 'Email verification failed');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setStatus('error');
      setMessage('An error occurred during verification');
    }
  };

  const handleResendEmail = async () => {
    try {
      setResendLoading(true);
      setResendSuccess(false);
      
      const result = await resendVerificationEmail();
      
      if (result && result.success) {
        setResendSuccess(true);
        setMessage('A new verification email has been sent to your email address.');
      } else {
        setMessage(result?.message || 'Failed to resend verification email');
      }
    } catch (error) {
      console.error('Resend error:', error);
      setMessage('An error occurred while resending the email');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <GlobalLayout activePage="verify-email">
      <div className="verify-email-container">
        <div className="verify-email-card">
          <div className="verify-email-header">
            <div className="verify-email-icon">
              {status === 'verifying' && (
                <div className="spinner">
                  <svg className="animate-spin h-12 w-12 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              )}
              {status === 'success' && (
                <svg className="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {status === 'error' && (
                <svg className="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              )}
            </div>
            
            <h1 className="verify-email-title">
              {status === 'verifying' && 'Verifying Your Email'}
              {status === 'success' && 'Email Verified!'}
              {status === 'error' && 'Verification Failed'}
            </h1>
          </div>

          <div className="verify-email-content">
            <p className="verify-email-message">
              {status === 'verifying' && 'Please wait while we verify your email address...'}
              {status === 'success' && message}
              {status === 'error' && message}
            </p>

            {status === 'success' && (
              <div className="verify-email-success">
                <p className="redirect-message">
                  You will be redirected to the login page in a few seconds...
                </p>
                <div className="redirect-timer">
                  <div className="timer-bar"></div>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="verify-email-actions">
                <button
                  onClick={handleResendEmail}
                  disabled={resendLoading}
                  className="resend-button"
                >
                  {resendLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </div>
                  ) : (
                    'Resend Verification Email'
                  )}
                </button>
                
                {resendSuccess && (
                  <p className="resend-success">
                    ✅ A new verification email has been sent!
                  </p>
                )}
                
                <button
                  onClick={() => navigate('/login')}
                  className="back-to-login-button"
                >
                  Back to Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
};

export default VerifyEmail;
