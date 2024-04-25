"use client"
import React from 'react'
import { signIn, signOut, useSession } from "next-auth/react"


export const SigninButton = () => {
    const { data: session } = useSession();
    console.log(session)
    

    if (session && session.user) {
        return (
            <div className='flex gap-4 ml-auto'>
                <p className='username-text'>{session.user.name} </p>
                <button onClick={() => signOut()} className='black_btn'>
                    Sign Out
                </button>
            </div>)
    }
    return <button onClick={() => signIn()} className= 'black_btn'>
        Sign In
    </button>
}
export default SigninButton;