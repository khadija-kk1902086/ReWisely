"use client";
import UploadButton from "../../components/UploadButton";
import React from "react";
const page = () => {
  return (
    <main>
      <p className="illustrateText">
        Upload your document to get insightful flashcards tailored just for you!
      </p>
      <p className="space"></p>
      <div className="flex items-center justify-center mb-8">
        <UploadButton className="flex items-center justify-center mb-8"></UploadButton>
      </div>
    </main>
  );
};

export default page;