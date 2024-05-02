import {signIn, useSession } from 'next-auth/react'
import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';

function SignInBTN() {
    const { data: session } = useSession();

    return (
      <div className="flex items-center gap-4 m-4">
        {session && session.user ? (
          <>
            <Link className="nav-text" href={"/profile"}>{`${session.user.name}`}</Link>
            <Link
              className='black_btn'
              href={"/api/auth/signout"}
            >
              Sign Out
            </Link>
          </>
        ) : (
          <div className='signBtn'>
          <Button onClick={() => signIn()} className='black_btn'>Sign In</Button>
            <Link href="/sign-up">
            <Button className='black_btn'>
              Sign Up
            </Button>
            </Link>
         
          </div>
        )}
      </div>
    );
}

export default SignInBTN