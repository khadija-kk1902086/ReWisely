"use client";
import {
  EnvelopeIcon,
  KeyIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { passwordStrength } from "check-password-strength";
import prisma from "@/lib/prisma";
import { User } from "lucide-react";
import { randomUUID } from "crypto";
import { hash } from "bcrypt";
import PasswordSrength from "./PasswordSrength";
import { registerUser } from "@/lib/actions/authActions";
import PasswordStrength from "./PasswordSrength";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { signIn } from 'next-auth/react';



const FormSchema = z
  .object({
    name: z
    .string()
    .min(2, " Name must be atleast 2 characters")
    .max(45, " Name must be less than 45 characters")
    .regex(new RegExp("^[a-zA-Z]+$"), "No special character allowed!"),
  email: z.string().email("Please enter a valid email address"),
  password: z
  .string()
  .min(6, "Password must be at least 8 characters ")
  .max(50, "Password must be less than 50 characters"),
confirmPassword: z
  .string()
  .min(6, "Password must be at least 6 characters ")
  .max(50, "Password must be less than 50 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password and confirm password doesn't match!",
  });

  type InputType = z.infer<typeof FormSchema>;
  
const SignUpForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const [passStrength, setPassStrength] = useState(0);
const [isVisiblePass, setIsVisiblePass] = useState(false);
const defaultPassword = "";

useEffect(() => {
  const password = watch().password;
  if (typeof password === 'string') {
    setPassStrength(passwordStrength(password).id);
  }
}, [watch().password]);

  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  
  const toggleVisblePass = () => setIsVisiblePass((prev) => !prev);
  
 
 /*  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.firstName + " " + values.lastName,
        email: values.email,
        password: values.password,
      }),
    });

    if (response.ok) {
      router.push("api/auth/signin");
    } else {
      toast({
        title: "Error! Faild to create an account",
        description: "Somthing went wrong!",
        variant: "destructive",
      });
    }
  };
 */
const saveUser: SubmitHandler<InputType> = async(data)=>{
   const {confirmPassword,...user} = data;
   try{
    const result = await registerUser(user) 
    toast({
      title: "Success!",
      description: "The User Registered Successfully! ",
   
    });


}
catch(error){
  toast({
    title: "Error! Faild to create an account",
    description: "Somthing went wrong!",
    variant: "destructive",
    
  });
  console.error(error);
}
}
 

  return (
    <div className="bg-white m-96 mt-0 mb-0 p-10 rounded-3xl  border border-[#05585C] border-dashed shadow ring ring-offset-4 ring-[#08979D]	">
    <Form {...form} >
      <form onSubmit={form.handleSubmit(saveUser)} className="form-container">
        
        <div className="signUpText">
        <img src="/assets/images/logo1.png" alt="" className="logo" />
          Welcome to ReWisely
          </div>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                 <div className="flex items-center">
                  <UserIcon className="formIcon"></UserIcon>
                 <FormLabel className="form-label"> Name</FormLabel>
                 </div>
                
                <FormControl className="border border-purple-500 rounded-md " >
                  <Input
                   
                    placeholder="johndoe"
                    {...field}
                    className="form-input"
                    /*p-2 focus:outline-none*/ 
                  />
                  
                </FormControl>
               {errors && <FormMessage className="text-red-500 border-red">{errors.name?.message}</FormMessage>}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <EnvelopeIcon className="formIcon"></EnvelopeIcon>
                  <FormLabel className="form-label">Email</FormLabel>
                </div>
                
                <FormControl className="border border-orange-500 rounded-md">
                  <Input
                    placeholder="mail@example.com"
                    {...field}
                    className="form-input"
                  />
                </FormControl>
                {errors && <FormMessage className="text-red-500 border-red">{errors.email?.message}</FormMessage>}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                  <div className="flex items-center">
                <KeyIcon className="formIcon"></KeyIcon>
                <FormLabel className="form-label">Enter your password</FormLabel>
                </div>
                
                <FormControl className="border border-orange-500 rounded-md">
                  <Input
                    type="password"
                    placeholder="Re-Enter your password"
                    {...field}
                    className="form-input"
                  />
                </FormControl>
                {errors && <FormMessage className="text-red-500 border-red">{errors.password?.message}</FormMessage>}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                <KeyIcon className="formIcon"></KeyIcon>
                <FormLabel className="form-label">Re-Enter your password</FormLabel>
                </div>
                <FormControl className="border border-orange-500 rounded-md">
                  <Input
                    type="password"
                    placeholder="Re-Enter your password"
                    {...field}
                    className="form-input"
                  />
                </FormControl>
                {errors && <FormMessage className="text-red-500 border-red">{errors.confirmPassword?.message}</FormMessage>}
              </FormItem>
            )}
          />
        </div>
        <Button
          className=" signInBTN"
          type="submit"
        >
          Sign up
        </Button>
      </form>
   {/*    <div className="mx-auto my-4 flex  items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400 text-orange-500">
        or
      </div> */}
     {/*  <div className="googleBTN">
      <Button onClick={() => signIn("google")}  className='bg-purple'/>
      </div> */}
     
      <p className="signIn-text">
        If you already have an account, please&nbsp;
        <Link
          className="signLink"
          href="/api/auth/signin"
        >
          Sign in
        </Link>
      </p>
    </Form>
    </div>
    
  );
};

export default SignUpForm;
