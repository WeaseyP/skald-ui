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

  const handleFrequencyChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newFrequency = parseFloat(evt.target.value);
    if (!isNaN(newFrequency)) {
        onUpdateNode(selectedNode.id, { frequency: newFrequency });
    }
  }

  const handleTypeChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateNode(selectedNode.id, { type: evt.target.value });
  }

  return (
    <div style={panelStyles}>
      <h2>Parameters: {selectedNode.data.label}</h2>
      <p>ID: {selectedNode.id}</p>
      
      <div style={inputGroupStyles}>
        <label style={labelStyles} htmlFor="frequency">Frequency</label>
        <input 
            style={inputStyles}
            type="number" 
            id="frequency"
            value={selectedNode.data.frequency}
            onChange={handleFrequencyChange}
        />
      </div>

      <div style={inputGroupStyles}>
        <label style={labelStyles} htmlFor="wavetype">Waveform Type</label>
        <select 
            id="wavetype"
            style={inputStyles} 
            value={selectedNode.data.type}
            onChange={handleTypeChange}
        >
            <option value="Sine">Sine</option>
            <option value="Sawtooth">Sawtooth</option>
            <option value="Square">Square</option>
            <option value="Triangle">Triangle</option>
        </select>
      </div>
    </div>
  );
};

export default ParameterPanel;