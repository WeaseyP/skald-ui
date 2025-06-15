// src/components/ParameterPanel.tsx

import React from 'react';
import { Node } from 'reactflow';

const panelStyles: React.CSSProperties = {
  padding: '15px',
  borderLeft: '1px solid #ddd',
};

const inputGroupStyles: React.CSSProperties = {
    marginBottom: '10px'
}

const labelStyles: React.CSSProperties = {
    display: 'block',
    marginBottom: '5px',
    color: '#333'
}

const inputStyles: React.CSSProperties = {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    borderRadius: '4px'
}

interface ParameterPanelProps {
  selectedNode: Node | null;
  onUpdateNode: (id: string, data: object) => void;
}

const ParameterPanel: React.FC<ParameterPanelProps> = ({ selectedNode, onUpdateNode }) => {
  
  if (!selectedNode) {
    return (
      <div style={panelStyles}>
        <h2>Parameters</h2>
        <p>Select a node to edit its parameters.</p>
      </div>
    );
  }

  const renderParameters = () => {
    switch (selectedNode.type) {
      case 'oscillator':
        return (
          <>
            <div style={inputGroupStyles}>
              <label style={labelStyles} htmlFor="frequency">Frequency</label>
              <input style={inputStyles} type="number" id="frequency" value={selectedNode.data.frequency}
                onChange={(e) => onUpdateNode(selectedNode.id, { frequency: parseFloat(e.target.value) })}/>
            </div>
            <div style={inputGroupStyles}>
              <label style={labelStyles} htmlFor="wavetype">Waveform Type</label>
              <select id="wavetype" style={inputStyles} value={selectedNode.data.waveform}
                onChange={(e) => onUpdateNode(selectedNode.id, { waveform: e.target.value })}>
                <option value="Sine">Sine</option>
                <option value="Sawtooth">Sawtooth</option>
              </select>
            </div>
          </>
        );
      case 'filter':
        return (
          <>
            <div style={inputGroupStyles}>
              <label style={labelStyles} htmlFor="cutoff">Cutoff Frequency</label>
              <input style={inputStyles} type="number" id="cutoff" value={selectedNode.data.cutoff}
                onChange={(e) => onUpdateNode(selectedNode.id, { cutoff: parseFloat(e.target.value) })} />
            </div>
          </>
        );
      case 'output':
        return <p>This is the final audio output.</p>;
      default:
        return <p>No parameters for this node type.</p>;
    }
  }

  return (
    <div style={panelStyles}>
      <h2>Parameters: {selectedNode.data.label}</h2>
      {renderParameters()}
    </div>
  );
};

export default ParameterPanel;