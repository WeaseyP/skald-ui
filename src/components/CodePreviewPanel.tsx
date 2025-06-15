// src/components/CodePreviewPanel.tsx

import React from 'react';

const panelStyles: React.CSSProperties = {
  padding: '15px',
  borderLeft: '1px solid #ddd',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  boxSizing: 'border-box'
};

const preStyles: React.CSSProperties = {
    backgroundColor: '#2e2e2e',
    color: '#d4d4d4',
    padding: '10px',
    borderRadius: '4px',
    flexGrow: 1,
    overflow: 'auto',
    whiteSpace: 'pre-wrap',
    fontFamily: 'monospace'
}

const closeButtonStyles: React.CSSProperties = {
    padding: '10px',
    backgroundColor: '#e03131',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px'
}

interface CodePreviewProps {
    code: string;
    onClose: () => void;
}

const CodePreviewPanel: React.FC<CodePreviewProps> = ({ code, onClose }) => {
  return (
    <div style={panelStyles}>
      <h2>Generated Code</h2>
      <pre style={preStyles}>
        <code>{code}</code>
      </pre>
      <button style={closeButtonStyles} onClick={onClose}>Close</button>
    </div>
  );
};

export default CodePreviewPanel;