/* import React from "react";
import { BaseEdge, EdgeProps, getStraightPath } from "reactflow";

function MindMapEdge(props: EdgeProps) {
  const { sourceX, sourceY, targetX, targetY } = props;
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY: sourceY + 500,
    targetX,
    targetY,
  });
  return <BaseEdge path={edgePath} {...props} />;
}
export default MindMapEdge;
 */

import React from 'react';
import { BaseEdge, EdgeProps, getStraightPath } from 'reactflow';

function MindMapEdge(props: EdgeProps) {
  const { sourceX, sourceY, targetX, targetY } = props;

  const [edgePath] = getStraightPath({
    sourceX,
    sourceY: sourceY ,
    targetX,
    targetY,
  });

  const edgeStyle = {
    stroke: ' #CCABD8 ', // Set the edge color
    strokeWidth: '2px',

  };

  return <BaseEdge path={edgePath} {...props} style={edgeStyle} />;
}

export default MindMapEdge;
