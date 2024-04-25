 import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ReactFlowProvider } from 'reactflow';
import 'styles/mindmap.css';
import App1 from "./mindmapContainer";
  interface Choice {
  message: {
    content: string;
  };
}
 
const rootElement = document.getElementById('root') as HTMLElement;
const [choices, setChoices] = useState<Choice[]>([]);
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ReactFlowProvider>
        <App1 choices={choices} />  
    </ReactFlowProvider>
  </React.StrictMode>,
); 
/*
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./mindmap";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
        <App1 choices={choices} />  
  </StrictMode>
);
*/