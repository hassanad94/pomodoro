import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import SettingsContext from './context/SettingContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SettingsContext>
    <App />
  </SettingsContext>


);

