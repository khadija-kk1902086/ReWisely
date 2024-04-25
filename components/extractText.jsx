'use client'
import React from 'react'
import pdfToText from 'react-pdftotext'
import { useState } from 'react';
import { error } from 'console';
import UploadForm from '../../components/UploadForm';

async function extractText(file) {

try{
  const text = await pdfToText(file);
  console.log(text)
  return text;
}catch(error){
  console.error("Faild to extract text from pdf", error);
  return null;
}
}


 


export default extractText