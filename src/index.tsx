import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './access/transition-group.css';

import App from './App';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(event => {
            console.log('Service worker registered', event);
        });
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

