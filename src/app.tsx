// src/app.tsx

import React from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';

// NOTE: The CSS import that was here is GONE. We will load it a different way.

const appStyles: React.CSSProperties = {
    width: '100vw',
    height: '100vh',
};

const App = () => {
  const initialNodes = [];
  const initialEdges = [];

  return (
    <div style={appStyles}>
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default App;