/* import {
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    OnNodesChange,
    OnEdgesChange,
    applyNodeChanges,
    applyEdgeChanges,
  } from 'reactflow';
  import { create } from 'zustand';
   
  export type RFState = {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
  };
   
  const useStore = create<RFState>((set, get) => ({
    nodes: [
      {
        id: 'root',
        type: 'mindmap',
        data: { label: 'React Flow Mind Map' },
        position: { x: 0, y: 0 },
      },
    ],
    edges: [],
    onNodesChange: (changes: NodeChange[]) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
  }));
   
  export default useStore; */





/* 
 import {
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    OnNodesChange,
    OnEdgesChange,
    applyNodeChanges,
    applyEdgeChanges,
    XYPosition,
  } from 'reactflow';
  import { create } from 'zustand';
  import { nanoid } from 'nanoid/non-secure';
  
  export type RFState = {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    addChildNode: (parentNode: Node, position: XYPosition) => void;
    updateNodeLabel: (nodeId: string, label: string) => void;
  };
  
  const useStore = create<RFState>((set, get) => ({
    nodes: [
      {
        id: 'root',
        type: 'mindmap',
        data: { label: 'React Flow Mind Map' },
        position: { x: 0, y: 0 },
      },
    ],
    edges: [],
    onNodesChange: (changes: NodeChange[]) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    addChildNode: (parentNode: Node, position: XYPosition) => {
      const newNode = {
        id: nanoid(),
        type: 'mindmap',
        data: { label: 'New Node' },
        position,
        parentNode: parentNode.id,
      };
  
      const newEdge = {
        id: nanoid(),
        source: parentNode.id,
        target: newNode.id,
      };
  
      set({
        nodes: [...get().nodes, newNode],
        edges: [...get().edges, newEdge],
      });
    },
    updateNodeLabel: (nodeId: string, label: string) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            // it's important to create a new object here, to inform React Flow about the changes
            node.data = { ...node.data, label };
          }
  
          return node;
        }),
      });
    },
  }));
  
  export default useStore;

 */

 
  import {
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    OnNodesChange,
    OnEdgesChange,
    applyNodeChanges,
    applyEdgeChanges,
    XYPosition,
  } from 'reactflow';
  import { create } from 'zustand';
  import { nanoid } from 'nanoid/non-secure';
  
  
  export type RFState = {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    addChildNode: (parentNode: Node, position: XYPosition) => void;
    updateNodeLabel: (nodeId: string, label: string) => void;
    removeNode: (nodeId: string) => void;
    updateNodes: (nodes: Node[]) => void;
  
  };
  
  
  const useStore = create<RFState>((set, get) => ({
    nodes: [], // Initialize nodes as an empty array
    edges: [], // Initialize edges as an empty array
 
  
   onNodesChange: (changes: NodeChange[]) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
  
    },
    onEdgesChange: (changes: EdgeChange[]) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    }, 
    addChildNode: (parentNode: Node, position: XYPosition) => {
      const newNode = {
        id: nanoid(),
        type: 'mindmap',
        data: { label: 'New Node' },
        position,
        parentNode: parentNode.id,
      };
  
      const newEdge = {
        id: nanoid(),
        source: parentNode.id,
        target: newNode.id,
      };
  
      set(state => ({
        nodes: [...state.nodes, newNode],
        edges: [...state.edges, newEdge],
      }));
      
    },
    updateNodeLabel: (nodeId: string, label: string) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, label };
        
          }
          return node;
        }),
      });
    },
  
    removeNode: (nodeId: string) => {
      const removeChildren = (nodeId: string) => {
        const childrenToRemove = get().nodes.filter(node => node.parentNode === nodeId);
        childrenToRemove.forEach(child => {
          removeChildren(child.id);
          set({
            edges: get().edges.filter(edge => edge.source !== child.id && edge.target !== child.id),
          });
        });
        set({
          nodes: get().nodes.filter(node => node.id !== nodeId && node.parentNode !== nodeId),
        });
      };
      // console.log( "nodes from remove store"+get().nodes)
      removeChildren(nodeId);
      set({
        nodes: get().nodes.filter(node => node.id !== nodeId),
        edges: get().edges.filter(edge => edge.source !== nodeId && edge.target !== nodeId),
      });
    },
    updateNodes: (nodes: Node[]) => { // Implement updateNodes function
      set({ nodes });
      console.log("nodes from store:", JSON.stringify(nodes, null, 2));
    },
 
  }));
  export default useStore; 