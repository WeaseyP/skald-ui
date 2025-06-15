// src/app.tsx

import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
    Background,
    Controls,
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    Node,
    Edge,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    useReactFlow,
    OnSelectionChangeParams,
} from 'reactflow';
import 'reactflow/dist/style.css';

import Sidebar from './components/Sidebar';
import ParameterPanel from './components/ParameterPanel';

const appContainerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#f0f0f0'
};

const sidebarPanelStyles: React.CSSProperties = {
    width: '200px',
    backgroundColor: '#fff',
};

const mainCanvasStyles: React.CSSProperties = {
    flexGrow: 1,
};

const parameterPanelStyles: React.CSSProperties = {
    width: '250px',
    backgroundColor: '#fff',
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const EditorLayout = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const { screenToFlowPosition, setViewport } = useReactFlow();

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) return;
      
      const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });

      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { 
          label: `Oscillator`,
          frequency: 440,
          type: "Sine"
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition]
  );

  const onSelectionChange = useCallback((params: OnSelectionChangeParams) => {
    const selected = params.nodes;
    if (selected.length === 1) {
        setSelectedNode(selected[0]);
    } else {
        setSelectedNode(null);
    }
  }, []);

  const updateNodeData = (nodeId: string, newData: object) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          // It's important to create a new object to trigger a re-render
          node.data = { ...node.data, ...newData };
        }
        return node;
      })
    );
    // Also update the selectedNode state if it's the one being changed
    setSelectedNode(prev => prev ? {...prev, data: {...prev.data, ...newData}} : null)
  };

  return (
    <div style={appContainerStyles}>
      <div style={sidebarPanelStyles}>
        <Sidebar />
      </div>
      <div style={mainCanvasStyles} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onSelectionChange={onSelectionChange}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      <div style={parameterPanelStyles}>
        <ParameterPanel 
            selectedNode={selectedNode}
            onUpdateNode={updateNodeData} 
        />
      </div>
    </div>
  );
}

const App = () => {
  return <EditorLayout />;
};

export default App;