import * as bcrypt from "bcrypt";
import {prisma} from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as z from 'zod'
/* interface RequestBody{
    name: string;
    email: string;
    password: string;
}
export async function POST(request: Request){
    const body: RequestBody = await request.json();

    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: await bcrypt.hash(body.password, 10),
            
        }
    });

    const { password, ...result } = user;
    return new Response(JSON.stringify(result));
} */

const UserSchema = z
  .object({
    name: z.string(),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
  })


export async function POST(request:Request){
    try {
        const body = await request.json();
        const {name, email, password} = UserSchema.parse(body);

        const existingEmail = await prisma.user.findUnique({
          where: {email:email}  
        });
        if(existingEmail){
            return NextResponse.json({user: null, message: "User with this email alread exists!"}, {status: 409})
        }
        const hashPassword = await bcrypt.hash(password,10);
        const newUser = await prisma.user.create({
            data:{
               name: body.name,
               email,
               password: hashPassword 
            }
        })

        const {password: newUserPassword, ...rest} = newUser;
        return NextResponse.json({user: rest, message: "User created successfully!"},{status : 201});
    } catch (error) {
        return NextResponse.json({ message: "Somthing went wrong!!!!!"},{status : 500});
    }
}