'use client'
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { forgotPassword } from '@/lib/actions/authActions';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@mui/material';
import React from 'react'
import { z } from 'zod'
const FormSchema = z.object({
    email:z.string().email("Please enter a valid email!")
})

type InputType = z.infer<typeof FormSchema>;


const ForgotPassword=()=> {
    const{register,handleSubmit,reset,formState:{errors, isSubmitting}}=useForm<InputType>({
        resolver: zodResolver(FormSchema),
    })

    const submitRequest:SubmitHandler<InputType> = async (data) =>{
        try {
            const result = await forgotPassword(data.email);
            if (result)    toast({title: "Reset Password!", description: "The Rest Password email was sent! ",});
           
            reset();
          } catch (e) {
            console.log(e);
            toast({
                title: "Error! Faild to create an account",
                description: "Somthing went wrong!",
                variant: "destructive",
              });
          }
        
    }
  return (
    <div className='flex justify-center items-start border'>
      <form  
      className="bg-white p-40  flex flex-col gap-5 p-2 m-2 border rounded-md shadow" 
      onSubmit={handleSubmit(submitRequest)}>
        <div className='flex flex-col gap-5 justify-center items-start'>
          <h1 className='forgotPassHead'>Forgot Your Password</h1>
                  <label htmlFor="emailField" className='forgotPassLabel'>Enter your email:</label>
                  <input
                    {...register("email")}
                    placeholder="mail@example.com"
                    className='border w-full p-3'
                     />
                
                
           <div className='flex items-center'>
           <Button
          className=" black_btn"
          type="submit"
          
        >
         {isSubmitting? "Please wait...": "Submit"}
        </Button>
           </div>
          
        </div>
       </form>
         
    
    </div>
  )
}

export default ForgotPassword