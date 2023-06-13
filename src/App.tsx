import React from 'react';
import logo from './logo.svg';
import './App.css';
import DestinyLogin from './components/DestinyLogin';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <DestinyLogin/>
      </header>
    </div>
  );
}

export default App;
