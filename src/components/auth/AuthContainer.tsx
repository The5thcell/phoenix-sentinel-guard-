
import React, { useState } from 'react';
import AuthForm from './AuthForm';

const AuthContainer: React.FC = () => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto py-8">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">
            {authMode === 'login' ? 'Welcome Back' : 'Join Us Today'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {authMode === 'login'
              ? 'Log in to access your secure dashboard'
              : 'Create an account to get started with our security platform'}
          </p>
        </div>
        
        <AuthForm mode={authMode} onModeChange={setAuthMode} />
      </div>
    </div>
  );
};

export default AuthContainer;
