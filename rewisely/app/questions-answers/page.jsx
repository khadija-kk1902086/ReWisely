"use client";
import React from 'react'
import UploadButton from "@/components/UploadButton";

export const page = () => {
    return (
        <main>
    
      <p className='illustrateText'>Upload your document to get an insightful Q&A!</p>
      <p className='space'></p>
      <div className='flex items-center justify-center mb-8'><UploadButton className='flex items-center justify-center mb-8'></UploadButton></div>
    </main>
    )
}

export default page;
