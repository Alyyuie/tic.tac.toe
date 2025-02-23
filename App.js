import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ X: 0, O: 0 });

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    checkWinner(newBoard);
  };

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        updateScore(board[a]);
        return;
      }
    }
    if (!board.includes(null)) {
      setWinner('Draw');
    }
  };

  const updateScore = (winner) => {
    setScore((prevScore) => ({
      ...prevScore,
      [winner]: prevScore[winner] + 1,
    }));
  };

  const nextRound = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const resetScore = () => {
    setScore({ X: 0, O: 0 });
  };

  const renderSquare = (index) => (
    <button className="square" onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  return (
    <div className="game">
      <h1>Tic-Tac-Toe</h1>
      <div className="status">
        {winner ? (winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}`) : `Next Player: ${isXNext ? 'X' : 'O'}`}
      </div>
      <div className="board">
        {Array(3).fill(null).map((_, row) => (
          <div key={row} className="board-row">
            {Array(3).fill(null).map((_, col) => renderSquare(row * 3 + col))}
          </div>
        ))}
      </div>
      <button className="next-round-button" onClick={nextRound} disabled={!winner}>Next Round</button>
      <button className="reset-score-button" onClick={resetScore}>Reset Score</button>
      <div className="scoreboard">
        <h2>Score</h2>
        <p>X: {score.X} - O: {score.O}</p>
      </div>
    </div>
  );
};

export default App;