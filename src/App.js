import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentMove, setHistory, setXIsNext } from './gameSlice';

function Square({value, onSquareClick}) {
  return (
    <button
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  )
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

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}

function Board({xIsNext, squares, onPlay}) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();

    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }


  const winner = calculateWinner(squares)
  let status;

  status = winner
    ? "Winner: " + winner
    : "Next player: " + (
    xIsNext
      ? "X"
      : "O"
  );

  return (
    <>
      <div className="status">{status}</div>
      <div className={"board-row"}>
        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
        />
      </div>
      <div className={"board-row"}>
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
        />
      </div>
      <div className={"board-row"}>
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
        />
      </div>
    </>
  );
}

export default function Game() {
  const dispatch = useDispatch();
  const history = useSelector((state) => state.game.history);
  const currentMove = useSelector((state) => state.game.currentMove);
  const xIsNext = useSelector((state) => state.game.xIsNext);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    dispatch(setHistory({nextHistory: nextHistory}));
    dispatch(setCurrentMove({move: nextHistory.length - 1}));
    dispatch(setXIsNext());
  }

  function jumpTo(nextMove) {
    dispatch(setCurrentMove({move: nextMove}));
  }

  const moves = history.map((squares, move) => {
    let description;
    description = move > 0 ? 'Go to move #' + move : 'Go to game start';

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
