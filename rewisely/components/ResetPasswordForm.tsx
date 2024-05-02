'use client'
import {
    EnvelopeIcon,
    EyeIcon,
    EyeSlashIcon,
    KeyIcon,
    PhoneIcon,
    UserIcon,
  } from "@heroicons/react/20/solid";
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordStrength } from 'check-password-strength';
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod'
import PasswordStrength from "./PasswordSrength";
import { Button } from "@mui/material";
import { resetPassword } from "@/lib/actions/authActions";
import { toast } from "./ui/use-toast";

interface Props{
    jwtUserId: string
}


const FormSchema = z.object({
    password: z.string().min(6,"Password must be at least 6 characters!").max(52,"Password must be less than 52 characters!"),
    confirmPassword: z.string()
}).refine(data=> data.password === data.confirmPassword,{
    message: "Password does not match!",
    path:["confirmPassword"]
})

type InputType = z.infer<typeof FormSchema>;

const ResetPasswordForm = ({jwtUserId}: Props)=> {

    const {register, handleSubmit, reset,watch, formState:{errors, isSubmitting}} = useForm<InputType>({
        resolver: zodResolver(FormSchema)
    })
    const [passStrength, setPassStrength] = useState(0);
    const [isVisiblePass, setIsVisiblePass] = useState(false);

    useEffect(() => {
        const password = watch().password;
        if (typeof password === 'string') {
          setPassStrength(passwordStrength(password).id);
        }
      }, [watch().password]);
      const toggleVisblePass = () => setIsVisiblePass((prev) => !prev);

      const resetPass:SubmitHandler<InputType> = async(data) =>{
        try {
            const result = await resetPassword(jwtUserId, data.password)
            if(result==="success"){
                toast({
                    title: "Success!",
                    description: "Your Password has been reset successfully!",
                    
                  });
            }
        } catch (error) {
            toast({
                title: "Error! Faild to sign in",
                description: "Somthing went wrong!",
                variant: "destructive",
              });
              console.log(error);
              
        }
      }
  return (
    <div className="bg-white m-96 mt-0 mb-0 p-10 rounded-3xl  border border-[#05585C] border-dashed shadow ring ring-offset-4 ring-[#08979D]	">

    <form onSubmit={handleSubmit(resetPass)} className="form-container">
        <div className="forgotPassHead">Reset Your Password</div>
        <div className="flex items-center">
                <KeyIcon className="formIcon"></KeyIcon>
        <label htmlFor="passwordField" className="form-label">Password</label>
        </div>
        <input  type={isVisiblePass ? "text" : "password"} className='form-input' {...register("password")}/>{
          isVisiblePass ? (
            <EyeIcon
              className="w-4 cursor-pointer"
              onClick={toggleVisblePass}
            />
          ) : (
            <EyeSlashIcon
              className="w-4 cursor-pointer"
              onClick={toggleVisblePass}
            />  )}
        {errors.password &&(<p className="error-message">{errors.password.message}</p>)}
        <PasswordStrength passStrength={passStrength} />
        <div className="flex items-center">
                <KeyIcon className="formIcon"></KeyIcon>
                  <label htmlFor="confirmePasswordField" className="form-label">Confirm Password</label>
        </div>
        <input  type={isVisiblePass ? "text" : "password"}  className='form-input' {...register("confirmPassword")}  />{
          isVisiblePass ? (
            <EyeIcon
              className="w-4 cursor-pointer"
              onClick={toggleVisblePass}
            />
          ) : (
            <EyeSlashIcon
              className="w-4 cursor-pointer"
              onClick={toggleVisblePass}
            />  )}
        {errors.confirmPassword && (
  <p className="error-message">{errors.confirmPassword.message}</p>
)}
        <div className="flex justify-center">
        <Button
          className="black_btn"
          type="submit"
          
        >
         {isSubmitting? "Please wait...": "Submit"}
        </Button>
        </div>
    </form>
    </div>
  )
}

export default ResetPasswordForm