"use client"
import UploadButton from "@/components/UploadButton";
import React, { useState } from 'react'

export const page = () => {


  return (
    <main>
      <p  className='illustrateText'>
        Upload your document to get a Mind Map customized just for you!</p>
    <p className='space'></p>
    <div className='flex items-center justify-center mb-8'><UploadButton className='flex items-center justify-center mb-8'></UploadButton></div>
  </main>

  )
}
export default page