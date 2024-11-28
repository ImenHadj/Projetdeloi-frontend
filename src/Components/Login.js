import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const CLIENT_ID = '236663358044-2aoro8elpisontn909g0b5k3gj3cirhg.apps.googleusercontent.com';

const Login = ({ onLoginSuccess, onLoginFailure }) => {
  const navigate = useNavigate();

  const handleSuccess = async (response) => {
    const idToken = response.credential;
    console.log("Received Google ID Token:", idToken);

  
    const payload = { idToken: idToken };

    try {
      const res = await fetch('http://localhost:9090/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.text();

      if (res.ok) {
        console.log("Google login success:", data);
        onLoginSuccess(data);
        navigate('/projects');
      } else {
        console.error("Authentication failed:", data);
        onLoginFailure();
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      onLoginFailure();
    }
  };

  const handleError = (error) => {
    console.error('Google login error:', error);
    onLoginFailure();
  };

  return (
    <div className="container">
      <div className="row justify-content-center min-vh-100 align-items-center">
        <div className="col-lg-5 col-md-7">
          <div className="card">
            <div className="card-header text-center">
              <h4 className="font-weight-bolder">Sign In</h4>
              <p className="mb-0">Enter your email and password to sign in</p>
            </div>
            <div className="card-body">
              <GoogleOAuthProvider clientId={CLIENT_ID}>
                <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
              </GoogleOAuthProvider>
            </div>
            <div className="card-footer text-center">
              <p className="mb-4 text-sm">
                Don't have an account? <a href="#" className="text-primary">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
