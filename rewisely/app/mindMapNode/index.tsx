/*  import { Radius } from 'lucide-react';
import React, { useRef, useEffect } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import 'styles/mindmap.css';

export type NodeData = {
  label: string;
};

function MindMapNode({ id, data, type }: NodeProps<NodeData>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  return (
    
    <div className="react-flow__node-mindmap">

      <div className="inputWrapper">
        <div className="dragHandle">
          <svg viewBox="0 0 24 24">
            <path
              fill="#333"
              stroke="#333"
              strokeWidth="1"
              d="M15 5h2V3h-2v2zM7 5h2V3H7v2zm8 8h2v-2h-2v2zm-8 0h2v-2H7v2zm8 8h2v-2h-2v2zm-8 0h2v-2H7v2z"
            />
          </svg>
        </div>
        <textarea
          defaultValue={data.label}
          ref={textareaRef}
          className="input"
          style={{
       
          }}
        />
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default MindMapNode;

 */

/* 

import React, { useRef } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import useStore from "../store";

export type NodeData = {
  label: string;
};

function MindMapNode({ id, data }: NodeProps<NodeData>) {
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Use RefObject<HTMLTextAreaElement>

  const updateNodeLabel = useStore((state) => state.updateNodeLabel);
  
  const handleInputChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNodeLabel(id, evt.target.value);
  };

  return (
    <>
      <div className="inputWrapper">
        <div className="dragHandle">
          <svg viewBox="0 0 24 24">
            <path
              fill="#333"
              stroke="#333"
              strokeWidth="1"
              d="M15 5h2V3h-2v2zM7 5h2V3H7v2zm8 8h2v-2h-2v2zm-8 0h2v-2H7v2zm8 8h2v-2h-2v2zm-8 0h2v-2H7v2z"
            />
          </svg>
        </div>
        <textarea
          value={data.label}
          onChange={handleInputChange}
          className="input"
          ref={textareaRef}
        />
      </div>
   
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Top} />
    </>
  );
}

export default MindMapNode;



 */

/* 
import React, { useRef, useEffect } from 'react';
import { Handle, NodeProps, Position } from "reactflow";
import useStore from "./store";

export type NodeData = {
  label: string;
};

function MindMapNode({ id, data }: NodeProps<NodeData>) {
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Use RefObject<HTMLTextAreaElement>
  const containerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);
  const updateNodeLabel = useStore((state) => state.updateNodeLabel);
  
  const handleInputChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNodeLabel(id, evt.target.value);
  };

  return (
    <>
      <div className="inputWrapper">
        <div className="dragHandle">
          <svg viewBox="0 0 24 24">
            <path
              fill="#333"
              stroke="#333"
              strokeWidth="1"
              d="M15 5h2V3h-2v2zM7 5h2V3H7v2zm8 8h2v-2h-2v2zm-8 0h2v-2H7v2zm8 8h2v-2h-2v2zm-8 0h2v-2H7v2z"
            />
          </svg>
        </div>
        <textarea
          defaultValue={data.label}
          ref={textareaRef}
          className="input"
          style={{
       
          }}
        />
      </div>

=
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Top} />
    </>
  );
}

export default MindMapNode;
 */


import React, { useRef, useEffect } from 'react';
import { Handle, NodeProps, Position } from "reactflow";
import useStore from "../store";

export type NodeData = {
  label: string;
};

function MindMapNode({ id, data }: NodeProps<NodeData>) {
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Use RefObject<HTMLTextAreaElement>
  const containerRef = useRef<HTMLDivElement>(null);
  const removeNode = useStore((state) => state.removeNode); // New addition

  const handleDeleteClick = () => {
    console.log("removed from node")
    console.log(id)
    removeNode(id);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);
  const updateNodeLabel = useStore((state) => state.updateNodeLabel);

 const handleInputChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNodeLabel(id, evt.target.value);
  }; 
  

  return (
    <>
      <div className="inputWrapper">
      <button onClick={handleDeleteClick} className="deleteButton">
      <img width="64" height="64" src="https://img.icons8.com/dusk/64/000000/filled-trash.png" alt="filled-trash" className='deleteIcon'/>

    </button> 
        <div className="dragHandle">
          <svg viewBox="0 0 24 24">
         {/*    <path
              fill="#333"
              stroke="#333"
              strokeWidth="1"
              d="M15 5h2V3h-2v2zM7 5h2V3H7v2zm8 8h2v-2h-2v2zm-8 0h2v-2H7v2zm8 8h2v-2h-2v2zm-8 0h2v-2H7v2z"
            /> */}
          </svg>
          
        </div>
       
        <textarea
          defaultValue={data.label}
          //readOnly={true}
          ref={textareaRef}
          className="input"
          style={{
           // backgroundColor: 'white'
          }}
              // readOnly 
        />
      </div>

    
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Top} />
    </>
  );
}

export default MindMapNode; 

