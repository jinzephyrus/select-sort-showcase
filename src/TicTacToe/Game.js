/* Tic Tac Toe
   TODO:
      [ OK ] 在游戏历史记录列表显示每一步棋的坐标，格式为 (列号, 行号)。
      [ OK ] 在历史记录列表中加粗显示当前选择的项目。
      [ OK ] 使用两个循环来渲染出棋盘的格子，而不是在代码里写死（hardcode）。
      [ OK ] 添加一个可以升序或降序显示历史记录的按钮。
      [ OK ] 每当有人获胜时，高亮显示连成一线的 3 颗棋子。
      [ OK ] 当无人获胜时，显示一个平局的消息。
 */

import React from "react";
import Board from "./Board";

import './Game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        stepClick: -1
      }],
      stepNumber: 0,
      xIsNext: true
    };
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
  
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {
          winner: squares[a],
          line: [a, b, c]
        };
      }
    }
  
    return null;
  };

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({ 
      history: history.concat([{
        squares: squares,
        stepClick: i
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      reverseList: this.state.reverseList
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  strong(text) {
    return <strong>{ text }</strong>;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);

    const moves = history.map((step, move, array) => {
      const idx = this.state.reverseList ? array.length - 1 - move : move;
      
      const clickToAxis = (i) => {
        const row = 3;

        return {
          x: i % row,
          y: Math.floor(i / row)
        };
      };

      let desc;

      if (idx) {
        let axis = clickToAxis(array[idx].stepClick);

        desc = '#' + idx + " - (" + axis.x + ", " + axis.y + ")";
      } else {
        desc = 'Game start';
      }

      return (
        <li key={ idx }>
          <button onClick={ () => this.jumpTo(idx) }>{ array[idx] === current ? this.strong(desc) : desc }</button>
        </li>
      );
    });

    let status;

    const hasEmptySquares = (squares) => {
      return squares.find(val => !val) !== undefined;
    }

    if (winner) {
      status = 'Winner: ' + winner.winner;
    } else if (!hasEmptySquares(current.squares)) {
      status = 'Round draw!';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={ current.squares }
            onClick={ (i) => this.handleClick(i) }
            wayToWin={ winner ? winner.line : [] }
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <button onClick={ () => this.setState({
            history: this.state.history,
            stepNumber: this.state.stepNumber,
            xIsNext: this.state.xIsNext,
            reverseList: !this.state.reverseList
          }) }>{ this.state.reverseList ? "Descending" : "Ascending" }</button>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }
}

export default Game;