import { activateUser } from '@/lib/actions/authActions'
import React from 'react'
import {
CheckBadgeIcon,
RocketLaunchIcon,
FaceFrownIcon,
XCircleIcon
} from "@heroicons/react/20/solid";
interface Props{
    params:{
        jwt:string
    }
}

const ActivationPage= async ({params}:Props)=> {
  const result = await activateUser(params.jwt)
  return (
    <div className="bg-white m-96 mt-0 mb-0 p-10 rounded-3xl  border border-[#05585C] border-dashed shadow ring ring-offset-4 ring-[#08979D]	">
      {result==="userNotExist"? <div><p className='forgotPassHead'>The user does not exist</p><XCircleIcon/></div>:
      result ==="alreadyActivated"?<div><p className='forgotPassHead'>The User is already activated</p> <RocketLaunchIcon className='activationIcon'/></div>:
      result === "success"?<div> <p className='forgotPassHead'>Success! The user is now activated</p><CheckBadgeIcon className='activationIcon'/></div>:
      <div><p className='forgotPassHead'>Oops! Somthing Went Wrong!</p><FaceFrownIcon/></div>
      }
      </div>
  )
}

export default ActivationPage