import SignInForm from '@/components/SignInForm';
import Link from 'next/link';
import React from 'react'

const page = () => {
  return <div>
    <SignInForm/>
    <Link href={"/forgotPassword"}>Forgot Your Password?</Link>
    </div>
};

export default page