import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n';
import App from './App';
import { AppErrorBoundary } from './AppErrorBoundary';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </React.StrictMode>
);
