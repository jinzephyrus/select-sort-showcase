import React from "react";
import Square from "./Square";

export default class Board extends React.Component {
  renderSquare(i, highlight) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        highlight={highlight}
      />
    );
  }

  render() {
    const board = (row, col) => {
      let list = [];
      const wayToWin = this.props.wayToWin;

      for (let i = 0; i < row; i++) {
        let rowList = [];

        for (let j = 0; j < col; j++) {
          let idx = i * 3 + j;
          let highlightArray;

          if (wayToWin.length !== 0) {
            highlightArray = wayToWin.map((val) => val === idx);
          }

          let highlight =
            highlightArray === undefined
              ? false
              : highlightArray.find((val) => val);

          rowList.push(
            this.renderSquare(idx, highlight === undefined ? false : highlight)
          );
        }

        list.push(
          <div key={i} className='board-row'>
            {rowList}
          </div>
        );
      }

      return list;
    };

    return board(3, 3);
  }
}
