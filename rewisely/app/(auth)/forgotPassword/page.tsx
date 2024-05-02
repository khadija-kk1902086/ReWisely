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
    // bg-white m-80 mt-0 mb-0 p-10 rounded-3xl shadow
    <div className="bg-white m-96 mt-0 mb-0 p-10 rounded-3xl  border border-[#05585C] border-dashed shadow ring ring-offset-4 ring-[#08979D]	">
      <form  
      className="form-container" 
      onSubmit={handleSubmit(submitRequest)}>
        <div className='flex flex-col gap-5 justify-center items-center'>
          <img src="/assets/images/favicon.png"  alt="" className='form-logo'/>
          <h1 className='forgotPassHead'>Find Your Account on ReWisely</h1>
                  <label htmlFor="emailField" className='form-label'>Enter your email:</label>
                  <input
                    {...register("email")}
                    placeholder="mail@example.com"
                    className='form-input'
                     />
                
                
           <div >
           <Button
          className="black_btn"
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