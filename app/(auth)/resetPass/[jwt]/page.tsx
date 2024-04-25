import ResetPasswordForm from '@/components/ResetPasswordForm'
import { verifyJwt } from '@/lib/jwt'
import React from 'react'

interface Props{
    params:{
        jwt:string
    }
}
 const ResetPassword = ({params}:Props) => {
  const payload = verifyJwt(params.jwt);
  if(!payload) return <div className='flex item-center justify-center h-screen text-red-500 text-2xl'>
    The URL is not valid!
  </div>
  return (
    <div className='flex justify-center'>
      <ResetPasswordForm jwtUserId={params.jwt}/>
    </div>
  )
}

export default ResetPassword;