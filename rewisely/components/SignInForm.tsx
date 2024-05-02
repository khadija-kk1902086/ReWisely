"use client";

import { useForm } from "react-hook-form";
import React from "react";
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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { EnvelopeIcon, KeyIcon } from "@heroicons/react/20/solid";
 


const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    ,
});

const SignInForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (signInData?.error) {
      toast({
        title: "Error! Faild to sign in",
        description: "Somthing went wrong! You may need to verify your email!",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome!",
        description: "Sign in Successfully",
        variant: "destructive",
      });
      router.push("/");
    }
  };

  return (
    <div className="bg-white m-96 mt-0 mb-0 p-10 rounded-3xl  border border-[#05585C] border-dashed shadow ring ring-offset-4 ring-[#08979D]	">
    <Form
      {...form}
      
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="form-container" >
      
        <img src="/assets/images/favicon.png" className="form-logo"></img>
        <p className="flex justify-center items-center text-[#6EC6CA] font-bold">Welcome to ReWisely</p>
        <div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                <EnvelopeIcon className="formIcon"></EnvelopeIcon>
                <FormLabel className="form-label">Email</FormLabel>
                </div>
              
                <FormControl>
                  <Input
                    className="form-input"
                    placeholder="mail@example.com"
                    {...field}
                   
                  />
                </FormControl>
                <FormMessage />
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
                <FormLabel className="form-label">Password</FormLabel>
                </div>
       
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    className="form-input"
                    {...field}
                     
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="black_btn"
         
        >
          Sign in
        </Button>
      </form>
       
      {/* <Button onClick={() => signIn("google")}  className='bg-purple'>Sign-in with google</Button> */}
       <p className="signIn-text">
        If you don't have an account, please&nbsp;
        <Link className="signLink" href="/sign-up">
          Sign up
        </Link>
      </p>
      <Link href={"/forgotPassword"} className="signIn-text">Forgot Your Password?</Link>
    </Form>
    </div>
  );
};

export default SignInForm;
