"use client";
import React from "react";
import UploadButton from "../../components/UploadButton";

const page = () => {
  return (
    <main>
      <p  className="illustrateText">Upload your document to get the perfect Summary tailored just for you!</p>
      <p className='space'></p>
      <div className='flex items-center justify-center mb-8'><UploadButton className='flex items-center justify-center mb-8'></UploadButton></div>
    </main>
  );
};

export default page;
