import React, { Component } from "react";
import classnames from "classnames";
import Board from "./components/Board";
import Button from "./components/Button";

export default class Game extends Component {
  state = {
    history: [
      {
        squares: Array(9).fill(null)
      }
    ],
    xIsNext: true,
    movesOrderAsc: true,
    currentMove: 0
  };

  handleClick = i => {
    const { currentMove, xIsNext } = this.state;
    const history = this.state.history.slice(0, currentMove + 1);
    const squares = [...history[currentMove].squares];

    if (squares[i] || calculateWinner(squares)) return;

    squares[i] = xIsNext ? "X" : "O";

    this.setState({
      history: history.concat([{
        squares,
        lastStep: {
          num: i,
          row: Math.floor(i / 3) + 1,
          col: i % 3 + 1,
          player: squares[i]
        }
      }]),
      xIsNext: !xIsNext,
      currentMove: history.length
    });
  };

  handleJump = move => {
    this.setState({
      currentMove: move,
      xIsNext: move % 2 === 0
    });
  };

  toggleMovesOrder = () => this.setState(
    prevState => ({
      movesOrderAsc: !prevState.movesOrderAsc
    })
  );

  render() {
    const { currentMove, history, xIsNext, movesOrderAsc } = this.state;
    const { squares, lastStep } = history[currentMove];
    const winner = calculateWinner(squares);

    let status;
    if (winner) {
      status = `Winner is ${winner.name}`;
    } else {
      status = squares.reduce(
        (allSquaresFilled, square) => allSquaresFilled && square,
        true
      )
        ? "Nobody wins :("
        : `Next is ${xIsNext ? "X" : "O"}`;
    }

    const winnerLine = winner ? winner.line : [];

    const lastMove = lastStep && lastStep.num;

    const moveButtons =
      history.map((move, i) => {
        const classes = classnames("button", {
          "current-move": i === currentMove
        });

        return (
          <li key={i}>
            <Button
              className={classes}
              onClick={() => this.handleJump(i)}
            >
              {
                i === 0
                  ? "START"
                  : `${move.lastStep.player}: (${move.lastStep.row}, ${move.lastStep.col})`
              }
            </Button>
          </li>
        );
      });

    if (!movesOrderAsc) moveButtons.reverse();

    return (
      <div className="container">
        <h1 className="main-title">Tic-Tac-Toe</h1>
        <main className="content">
          <div className="board">
            <Board
              squares={squares}
              last={lastMove}
              onClick={this.handleClick}
              winnerLine={winnerLine}
            />
          </div>

          <div className="info">
            <p className="status">{status}</p>
            <div className="sort">
              <p className="sort__text">Toggle order:</p>
              <Button
                className="button sort__button"
                onClick={this.toggleMovesOrder}
              >
                {
                  movesOrderAsc
                    ? <i className="fa fa-sort-numeric-asc"></i>
                    : <i className="fa fa-sort-numeric-desc"></i>
                }
              </Button>
            </div>
            <ol className="move-buttons">
              {moveButtons}
            </ol>
          </div>
        </main>
      </div>
    );
  }
}

function calculateWinner(squares) {
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

  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c])
      return { line, name: squares[a] };
  }
  return null;
}
