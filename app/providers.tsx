'use client'
import {NextUIProvider} from "@nextui-org/react";
//import {NextUIProvider} from '@nextui-org/react'

export function Providers({children}: { children: React.ReactNode }) {
  return (

    <NextUIProvider>
      {children}
    </NextUIProvider>
    
  )
}

export default Providers;

