import React from 'react';
import './App.css';
import Board from './components/Board'

function App() {
  return (
    <div>
    <header style={{textAlign:'center',fontSize:'200%'}}>Checkers Game</header>
    <Board />
    </div>
  );
}

export default App;
