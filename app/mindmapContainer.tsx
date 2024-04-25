import React from 'react'
import Flow from './mindmap'  
//  import { getFlowComponentWithData } from './mindmap'; 
import { ReactFlowProvider } from 'reactflow';

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
     <div style={{ height: "2000px", width: "2000px" }}>


         <ReactFlowProvider>
           <Flow data={data} /> 
         </ReactFlowProvider>

       
     </div>
   );
}
 
export default App1;