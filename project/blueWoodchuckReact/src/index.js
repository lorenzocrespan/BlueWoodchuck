import React from 'react';
import ReactDOM from 'react-dom/client';
import { MetaMaskProvider } from 'metamask-react';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
        <MetaMaskProvider>
                <App />
        </MetaMaskProvider>
);
