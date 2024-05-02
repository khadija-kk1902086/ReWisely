import React from 'react'
import Flow from './mindmap'  
import 'styles/mindmap.css'
//  import { getFlowComponentWithData } from './mindmap'; 
import { ReactFlowProvider } from 'reactflow';
import { blue } from '@mui/material/colors';

function App1({ choices }) {
   // Extract content from choices and populate the data array
 
 let data = choices.map((choice) => {
  let splitContent = choice.message.content.split(/(?=[1234])/); 
  return splitContent;
});

 let separatedData = data.map((element) => element.map((line) => [line])); 
/* 
 const FlowWithData = getFlowComponentWithData(separatedData); */

 console.log("c"+data);
 
   return (
     <div style={{  height: "1600px",
     width: "1300px",backgroundColor: "  rgb(215, 223, 221)",marginTop:"200px",borderRadius:"3%"}} >
 

         <ReactFlowProvider>
           <Flow data={data} /> 
         </ReactFlowProvider>

     </div>
   );
}
 
export default App1;