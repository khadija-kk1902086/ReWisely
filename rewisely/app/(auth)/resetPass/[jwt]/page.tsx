import ResetPasswordForm from '@/components/ResetPasswordForm'
import { verifyJwt } from '@/lib/jwt'
import { XCircleIcon } from '@heroicons/react/20/solid'
import React from 'react'

interface Props{
    params:{
        jwt:string
    }
}
 const ResetPassword = ({params}:Props) => {
  const payload = verifyJwt(params.jwt);
  if(!payload) return         <div className="bg-white m-96 mt-0 mb-0 p-10 rounded-3xl  border border-[#05585C] border-dashed shadow ring ring-offset-4 ring-[#08979D]	">
   <div><p className='forgotPassHead'>The URL is not valid!</p><XCircleIcon className='activationIcon'/></div>
  </div>
  return (
    <div className='flex justify-center'>
      <ResetPasswordForm jwtUserId={params.jwt}/>
    </div>
  )
}

export default ResetPassword;