// src/components/Sidebar.tsx

import React from 'react';

const sidebarStyles: React.CSSProperties = {
  padding: '15px',
  borderRight: '1px solid #ddd',
};

const nodeButtonStyles: React.CSSProperties = {
    border: '2px solid #777',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#fff',
    cursor: 'grab',
    textAlign: 'center',
    marginBottom: '10px'
}

const Sidebar = () => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div style={sidebarStyles}>
      <h2>Node Library</h2>
      <div 
        style={nodeButtonStyles}
        onDragStart={(event) => onDragStart(event, 'default')} 
        draggable
      >
        Oscillator Node
      </div>
    </div>
  );
};

export default Sidebar;