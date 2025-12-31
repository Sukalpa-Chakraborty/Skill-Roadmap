import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  // Removed StrictMode to avoid double rendering issues during development
  <App />
);