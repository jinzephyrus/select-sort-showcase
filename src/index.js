import React from 'react';
import ReactDOM from 'react-dom';

import Game from './TicTacToe/Game';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <div className='panel'>
      <Game />
      <span className='separator'></span>
      <Game />
   </div>
);
