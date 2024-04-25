import { FC, ReactNode } from 'react';
import { Button } from './ui/button';
import React from 'react'

interface GoogleSignInButtonProps {
  children: ReactNode;
}
const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const loginWithGoogle = () => console.log('login with google');

  return (
    <Button onClick={loginWithGoogle} className='bg-purple'>
      {children}
    </Button>
  );
};

export default GoogleSignInButton;