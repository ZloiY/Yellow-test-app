import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

window.addEventListener('load', () => {
  if (!sessionStorage.getItem('isActive'))
      localStorage.clear();

  sessionStorage.setItem('isActive', true);
})
