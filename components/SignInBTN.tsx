import {signIn, useSession } from 'next-auth/react'
import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';

function SignInBTN() {
    const { data: session } = useSession();

    return (
      <div className="flex items-center gap-2 ">
        {session && session.user ? (
          <>
            <Link href={"/profile"}>{`${session.user.name}`}</Link>
            <Link
              className='black_btn'
              href={"/api/auth/signout"}
            >
              Sign Out
            </Link>
          </>
        ) : (
          <>
          <Button onClick={() => signIn()} className='black_btn'>Sign In</Button>
            <Link href="/sign-up">
            <Button className='black_btn'>
              Sign Up
            </Button>
            </Link>
         
          </>
        )}
      </div>
    );
}

export default SignInBTN