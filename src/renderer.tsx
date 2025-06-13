// src/renderer.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';

// The import for './index.css' has been removed.

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);