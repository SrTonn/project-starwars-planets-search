import React from 'react';
import './App.css';
import Provider from './Context/Provider';

function App() {
  return (
    <Provider>
      <span>Hello, App!</span>
    </Provider>
  );
}

export default App;
