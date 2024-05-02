 
import React, { useEffect, useCallback, useRef } from 'react';
import { FaMouse, FaArrowsAlt, FaSearchPlus } from 'react-icons/fa';
import { FaMousePointer } from 'react-icons/fa';

import ReactFlow, {
  Controls,
  OnConnectEnd,
  OnConnectStart,
  Panel,
  useStoreApi,
  Node,
  useReactFlow,
  ReactFlowProvider,
  ConnectionLineType,
} from 'reactflow';

import useStore, { RFState as LocalRFState } from './store';
import MindMapNode from './MindMapNode';
import MindMapEdge from './MindMapEdge';
import 'styles/mindmap.css'
import 'reactflow/dist/style.css';
 
interface Props {
  data: string[] | null;
}
 
const selector: (state: LocalRFState) => {
  nodes: any[];
  edges: any[];
  onNodesChange: (nodes: any[]) => void;
  onEdgesChange: (edges: any[]) => void;
  addChildNode: (parentNode: any, position: { x: number; y: number }) => void;
  updateNodes: (nodes: any[]) => void;
  removeNode: (nodeId: string) => void;
} = (state: LocalRFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  addChildNode: state.addChildNode,
  updateNodes: state.updateNodes,
  removeNode: state.removeNode,
});
 
const nodeTypes = {
  mindmap: MindMapNode,
};
 
const edgeTypes = {
  mindmap: MindMapEdge,
};
 

const connectionLineStyle = {  stroke: '#ffbff1',  strokeWidth: '2px', };
const defaultEdgeOptions = { style: connectionLineStyle, type: 'mindmap' };
 
const Flow = ({ data }: Props) => {
 
  const { nodes, edges,updateNodes, onNodesChange, onEdgesChange, addChildNode,removeNode } = useStore(
    selector,
   
  );
let dataArray = data.map(item => [item]);

   const arrayOfElements = dataArray[0][0];
   console.log("hello")
 
  const nodeSpacingY = 200; 
  const levelSpacing = 300; 
  const nodeGap = 50; 
  const originWithTitle = arrayOfElements[0];
    const originalNodeData = originWithTitle.replace('Title: ', '');
    console.log(arrayOfElements[0][0])
nodes.push({
      id: 'original-node',
      type: 'mindmap',
      position: { x: 0, y: 0 }, 
      data: { label: originalNodeData },
      className:'origin',
     
    })

    const totalBranches =8;
    const angleStep = (2 * Math.PI) / totalBranches; 
  console.log(arrayOfElements)
 
 
    for (let groupIndex = 2; groupIndex <6; groupIndex++) {
      // console.log("groupindex"+groupIndex)
      const group = arrayOfElements[groupIndex-1];
      const groupString1 = JSON.stringify(group);
     // const groupString2 = JSON.stringify(groupString1);
  /*     console.log(typeof(groupString1))
      console.log("groupString"+group) */
      let groupArray;
      if (groupIndex === undefined) {
        // console.log("group is undefined. Terminating code.");
        break;
    }
    if (groupString1 === undefined) {
      // console.log("groupString is undefined. Terminating code.");
      break;
  }
 
     while (true) {     
        const cleanedString2 = groupString1.replace(/[\[\]\n"]/g, '');
      let  newArray  = cleanedString2.split('\\n');
      // console.log("newArray"+newArray)
let groupArrayt =    newArray  .filter(item => item !== '' && item !== 'Main Point');
  groupArray =    groupArrayt .filter(item => item !== 'Main Point');
/* console.log("groupArray"+groupArray);
        console.log(typeof( groupArray))
        console.log(groupArray) */
       
         break;
      }
  
  
  
  
   //let groupArray=["Significance of Fasting ","Spiritual: Deliberate abstention from food and drink for spiritual growth and connection "," Health: Improving physical well-being through weight management, metabolic health, and cellular repair "," Ritualistic: Observing fasting as a cultural or religious tradition."]
  //  console.log("type of group array"+typeof( groupArray))
      const nodesInSmallArray  = groupArray.length;
   
      const branchAngle = angleStep * groupIndex; // Angle for the current branch
      const radius = levelSpacing * 2; // Radius of the circle
      let preYy ;
      let index;
      let subArray
      const preX = radius * Math.cos(branchAngle);
/*       console.log("Zyada:"+(nodesInSmallArray  - 1) * (nodeSpacingY + nodeGap)/2)
      console.log( "prex\t"+preX ) */
  const preY = radius * Math.sin(branchAngle) - (nodesInSmallArray  - 1) * (nodeSpacingY + nodeGap) / 2;
  
      for ( index = 0; index < 4; index++) {
        // console.log("number"+nodesInSmallArray)
    if (groupIndex <= totalBranches / 2) {
  // console.log(groupIndex)
  if(groupIndex==4){
    nodes.push({
      id: `node-${groupIndex}-${0}`, // Correct syntax with backticks
      type: 'mindmap',
      position: {
        x: preX+700,
        y: preY-100,
      },
      data: { label: groupArray[0] },
      className:'level1',
    });
    // console.log( "4444444"+groupArray[0])
  }
      //main sub node
     else if(groupIndex%2==0){
        // console.log("part1"+groupIndex)
        nodes.push({
      id: `node-${groupIndex}-${0}`, // Correct syntax with backticks
      type: 'mindmap',
      position: {
        x: preX+150,
        y: preY,
      },
      data: { label: groupArray[0] },
      className:'level1',
    });}
    else{
  
     //groupIndex=3
      nodes.push({
      id:`node-${groupIndex}-${0}`, // Correct syntax with backticks
      type: 'mindmap',
      position: {
        x: preX-170,
        y: preY+50,
      },
      data: { label: groupArray[0] },
      className:'level1',
    });}
    }
    else {
      // console.log("rani hna"+groupIndex)
      if(groupIndex%2!==0){
        nodes.push({
        id: `node-${groupIndex}-${0}`, // Correct syntax with backticks
        type: 'mindmap',
        position: {
          x: preX ,
          y: preY +350,
        },
        data: { label: groupArray[0] },
        className:'level1',
      });}
      else{
        // console.log("yeey"+groupIndex)
        nodes.push({
          id: `node-${groupIndex}-${0}`, // Correct syntax with backticks
          type: 'mindmap',
          position: {
            x: preX+400,
            y: preY + 50,
          },
          data: { label: groupArray[0][0] },
          className:'level1',
        });
      }
  
    }}
  //  console.log("length"+groupArray.length)
   
      for (let index = 1; index < 4 ; index++) {
          preYy = preY + (nodeSpacingY + nodeGap) * index;
  
          const group = groupArray[index];
          const groupString = JSON.stringify(group);
          if (groupString === undefined) {
            console.log("group is undefined. Terminating code.");
            break;
        }
          while (true) {    
            const cleanedString = groupString.replace(/[\[\]\n"]/g, '');
            const splitGroup = cleanedString.split(': ');
              subArray = splitGroup.map(item => item.trim());
              break;
          }
          
          let prevNode = null; 
          for (let subIndex=0; subIndex<subArray.length; subIndex++) {
            const totalSubBranches =subArray.length;
            const subAngleStep = (2 * Math.PI) / totalSubBranches; // Angle step to distribute branches evenly in a circle
            const subLevelSpacing = 300;
            const nodesInsybArray  = subArray.length;
            const subBranchAngle = subAngleStep * subIndex; // Angle for the current branch
            const subRadius =  subLevelSpacing * 2; // Radius of the circle
            const subSpacingY = 240; // Vertical spacing between nodes
          
            const subNodeGap = 25; // Additional gap between node
            const subPreY = subRadius * Math.sin(subBranchAngle ) - (nodesInsybArray - 1) * (subSpacingY + subNodeGap) / 2;
            const subPreX = subRadius * Math.cos(subBranchAngle);
           const subPreYy = subPreY + (subSpacingY +  subNodeGap) * subIndex;
           if (groupIndex <= totalBranches / 2) {
            if(groupIndex==4){
              /////here too
              // console.log("salam")
              if(subIndex==0){
              nodes.push({
                id: `node-${groupIndex}-${index}-${subIndex}`,
                type: 'mindmap',
                position: {
           
             x:(-1)* (preX + 200*index-500+ index*130)+200,
             y:((-1)*(((1)*preYy + (subSpacingY + subNodeGap) * (subIndex-1)+30+subIndex)))-100,
                },
                data: { label: subArray[subIndex] },
                className:'level2',
            });
          } 
          if(subIndex==1){
            nodes.push({
              id: `node-${groupIndex}-${index}-${subIndex}`,
              type: 'mindmap',
              position: {
         
           x:(-1)* (preX + 200*index-500+ index*130)+200,
           y:((-1)*(((1)*preYy + (subSpacingY + subNodeGap) * (subIndex-1)+30+subIndex)))-100,
              },
              data: { label: subArray[subIndex] },
              className:'level3',
          });
        } 
            }
            else if (groupIndex%2==0){
              console.log("indexxxxxxx"+index)
              if(index==1){
                if(subIndex==0){
              nodes.push({
                  id: `node-${groupIndex}-${index}-${subIndex}`,
                  type: 'mindmap',
                  position: {
                      x:(preX+400)*index,
                      y:(1)*(((1)*preYy + (subSpacingY + subNodeGap) * (subIndex-1)+subIndex)),
                  },
                  data: { label: subArray[subIndex] },
                  className:'level2',
              });}
              if(subIndex==1){
                nodes.push({
                    id: `node-${groupIndex}-${index}-${subIndex}`,
                    type: 'mindmap',
                    position: {
                        x:(preX+400)*index,
                        y:(1)*(((1)*preYy + (subSpacingY + subNodeGap) * (subIndex-1)+subIndex)),
                    },
                    data: { label: subArray[subIndex] },
                    className:'level3',
                });}}
             
              else if(index==2){
                if(subIndex==0){
                nodes.push({
                  id: `node-${groupIndex}-${index}-${subIndex}`,
                  type: 'mindmap',
                  position: {
                    x: (preX + 200*index-10)*index,
                      y:(1)*(((1)*preY + (nodeSpacingY + nodeGap) * 1 + (subSpacingY + subNodeGap) * (subIndex-1)+subIndex)),
                  },
                  data: { label: subArray[subIndex] },
                  className:'level2',
                 
              }); 
              }
              if(subIndex==1){
                nodes.push({
                  id: `node-${groupIndex}-${index}-${subIndex}`,
                  type: 'mindmap',
                  position: {
                    x: (preX + 200*index-10)*index,
                      y:(1)*(((1)*preY + (nodeSpacingY + nodeGap) * 1 + (subSpacingY + subNodeGap) * (subIndex-1)+subIndex)),
                  },
                  data: { label: subArray[subIndex] },
                  className:'level3',
              }); 
              }}
            }
              else{
                // console.log("3333333333"+groupIndex)

                if(subIndex==0){
                nodes.push({
                  id: `node-${groupIndex}-${index}-${subIndex}`,
                  type: 'mindmap',
                  position: {
                    //  x: ((preX) + index-700+ index*200),
                    x: (preX -3*index-10)*index,
                      y: ((1)*preY + (nodeSpacingY + nodeGap)   * (subIndex-1)+300+subIndex)+150,
                  },
                  data: { label: subArray[subIndex] },
                  className:'level2',
              });
            }
            
            if(subIndex==1){
            nodes.push({
              id: `node-${groupIndex}-${index}-${subIndex}`,
              type: 'mindmap',
              position: {
                //  x: ((preX) + index-700+ index*200),
                x: (preX -3*index-10)*index,
                  y: ((1)*preY + (nodeSpacingY + nodeGap)   * (subIndex-1)+300+subIndex)+150,
              },
              data: { label: subArray[subIndex] },
              className:'level3',
          });
        }
              }

                  edges.push({
                      id: `edge-${groupIndex}-${index}-${subIndex}`,
                      source: `node-${groupIndex}-${index}-${subIndex }`,
                      target: `node-${groupIndex}-${index}-${subIndex+1}`,
                  });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
              prevNode = `node-${groupIndex}-${index}-${subIndex}`;
          }
  
 
          else {
            /////here update 
            const radialDistance = 200;
            const angle = subIndex * (2 * Math.PI) / nodesInSmallArray;
            const y = Math.sin(angle) * radialDistance;
            if (groupIndex%2!==0){
              if(subIndex==0){
              nodes.push({
              id: `node-${groupIndex}-${index}-${subIndex}`,
              type: 'mindmap',
              position: {
                  x: (-1)*((preX + 200*index-10)+250*index)-200,
      
                  y:((1)*(((1)*preYy + (subSpacingY + subNodeGap) * (1-1)+30+1)+10))-400,
              },
              data: { label: subArray[subIndex] },
              className:'level2',
          });}
          else if(subIndex==1){
            nodes.push({
              id: `node-${groupIndex}-${index}-${subIndex}`,
              type: 'mindmap',
              position: {
                  x: (-1)*((preX + 200*index-10)+250*index)-200,
      
                  y:((1)*(((1)*preYy + (subSpacingY + subNodeGap) * (0-1)+30+0)+10))-400,
              },
              data: { label: subArray[subIndex] },
              className:'level3',
          });
          }
          // console.log("555555555"+groupIndex+"data"+subArray[subIndex])
    
        edges.push({
          id: `edge-${groupIndex}-${index}-${subIndex}`,
          source: `node-${groupIndex}-${index}-${subIndex +1}`,
          target: `node-${groupIndex}-${index}-${subIndex}`,
      });}
         

          }
          // Connect the last node of the subarray to the main sub node
          edges.push({
              id: `edge-${groupIndex}-${index}-to-main`,
              source: `node-${groupIndex}-${index}-${0}`,
              target: `node-${groupIndex}-0`,
          });
  
          // Connect the main sub node to the original node
          edges.push({
              id: `edge-${groupIndex}-to-original`,
              source: `node-${groupIndex}-0`,
              target: "original-node",
          });
      }
  }
    }
 
/*
 
console.log("Nodes array:");
nodes.forEach(node => {
  console.log(node); // Log the entire node object
  console.log("Node ID:", node.id); // Log specific properties of the node object
  console.log("Node Type:", node.type);
  console.log("Node Position:", node.position);
  console.log("Node Data:", node.data);
});
 
 
  */
 
let uniqueNodes = nodes.filter((node, index, self) =>
index === self.findIndex((n) => n.id === node.id)
);

console.log("Nodes without duplicates:", JSON.stringify(uniqueNodes, null, 2));
console.log("nodes from flow:", JSON.stringify(nodes, null, 2));
 
  const connectingNodeId = useRef<string | null>(null);
  const store = useStoreApi();
  const { screenToFlowPosition } = useReactFlow();
 
  const getChildNodePosition = (
    event: MouseEvent | TouchEvent,
    parentNode?: Node,
  ) => {
    const { domNode } = store.getState();
 
    if (
      !domNode ||
    
      !parentNode?.positionAbsolute ||
      !parentNode?.width ||
      !parentNode?.height
    ) {
      return;
    }
 
    const { top, left } = domNode.getBoundingClientRect();
 
    const isTouchEvent = 'touches' in event;
    const x = isTouchEvent ? event.touches[0].clientX : event.clientX;
    const y = isTouchEvent ? event.touches[0].clientY : event.clientY;
 
    const panePosition = screenToFlowPosition({
      x,
      y,
    });
 
 
    return {
      x: panePosition.x - parentNode.positionAbsolute.x + parentNode.width / 2,
      y: panePosition.y - parentNode.positionAbsolute.y + parentNode.height / 2,
    };
  };
 
  const onConnectStart: OnConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);
 
  const onConnectEnd: OnConnectEnd = useCallback(
    (event) => {
      const { nodeInternals } = store.getState();
      const targetIsPane = (event.target as Element).classList.contains(
        'react-flow__pane',
      );
 
      if (targetIsPane && connectingNodeId.current) {
        const parentNode = nodeInternals.get(connectingNodeId.current);
        const childNodePosition = getChildNodePosition(event, parentNode);
 
        if (parentNode && childNodePosition) {
          console.log("add child called")
          addChildNode(parentNode, childNodePosition);
        }
      }
    },
    [getChildNodePosition],
  );






/*   useEffect(() => {
    updateNodes(nodes); 
  }, [nodes]);  */
  return (

    <ReactFlow
    nodes={nodes }
    edges={edges}
    onNodesChange={onNodesChange}
    onEdgesChange={onEdgesChange}
    nodeTypes={nodeTypes}
    edgeTypes={edgeTypes}
    onConnectStart={onConnectStart}
    onConnectEnd={onConnectEnd}
    connectionLineStyle={connectionLineStyle}
    defaultEdgeOptions={defaultEdgeOptions}
    connectionLineType={ConnectionLineType.Straight}
    fitView
    color='blue'
  >
    <Controls showInteractive={false} />
    <Panel position="top-left" className="header">


    </Panel>
    <div className="interaction-info">
    
      <p>
        <FaMouse /> Click on a node and drag to add a new node
      </p>
      <p>
        <FaMousePointer /> After adding a node, click and drag it to reposition it
      </p>
      <p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zM11 8h2v6h-2z"/>
        </svg> Zoom in and out to enhance visibility of the text within the nodes
      </p>
    </div>
  
  </ReactFlow>

  );
 
 
  }
  Flow.getServerSnapshot = () => {
    return {
      nodes: [],
      edges: [],
    };
  };
  
  export default Flow;