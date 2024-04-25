'use client'
import React, { useState } from 'react'
import extractText from './extractText';

function UploadForm() {
    const [file, setFile] = useState(null);
    const handleFileChange = (event) =>{
        setFile(event.target.files[0]);

    };
    const handleSubmit = async (event) =>{
        event.preventDefault();
        if(file){
            try{
                const text =await extractText(file);
                if(text){
                    console.log("Text extracted successfully", text);
                }else{
                    console.error("Faild to extract pdf to text");
                }

                }catch(error){
                        console.error(error);
                }
            }
    
  return (
    <div>
        
        <form onSubmit={handleSubmit}>
            <input type="file" accept='.pdf' onChange={handleFileChange} />
            <button type='submit'>Upload Pdf</button>
        </form>
    </div>
  )
}
}

export default UploadForm;