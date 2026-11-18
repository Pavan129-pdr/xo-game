
import { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState("");
  const [draw, setDraw] = useState(false);

  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Check winner
  const checkWinner = (updatedBoard) => {
    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;

      if (
        updatedBoard[a] !== "" &&
        updatedBoard[a] === updatedBoard[b] &&
        updatedBoard[a] === updatedBoard[c]
      ) {
        return updatedBoard[a];
      }
    }

    return "";
  };

  // Handle cell click
  const handleClick = (index) => {
    if (board[index] !== "" || winner || draw) {
      return;
    }

    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;

    setBoard(updatedBoard);

    const gameWinner = checkWinner(updatedBoard);

    if (gameWinner) {
      setWinner(gameWinner);
    } else if (updatedBoard.every((cell) => cell !== "")) {
      setDraw(true);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  // Restart game
  const restartGame = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinner("");
    setDraw(false);
  };

  return (
    <div className="game-page">
      <div className="game-container">

        {/* Header */}
        <div className="game-header">
          <div className="game-logo">XO</div>

          <p className="game-subtitle">TWO PLAYER GAME</p>

          <h1>Tic-Tac-Toe</h1>

          <p className="game-description">
            Take your turn. Make your move. Claim victory.
          </p>
        </div>

        {/* Players */}
        <div className="player-section">

          <div
            className={`player-card ${
              currentPlayer === "X" && !winner && !draw
                ? "active-player"
                : ""
            }`}
          >
            <div className="player-symbol x-symbol">X</div>

            <div>
              <h3>Player 1</h3>
              <p>Playing as X</p>
            </div>
          </div>

          <div className="vs-text">VS</div>

          <div
            className={`player-card ${
              currentPlayer === "O" && !winner && !draw
                ? "active-player"
                : ""
            }`}
          >
            <div className="player-symbol o-symbol">O</div>

            <div>
              <h3>Player 2</h3>
              <p>Playing as O</p>
            </div>
          </div>

        </div>

        {/* Game Status */}
        <div className="game-status">
          {winner ? (
            <h2 className="winner-message">
              🎉 Player {winner} Wins!
            </h2>
          ) : draw ? (
            <h2 className="draw-message">
              🤝 It's a Draw!
            </h2>
          ) : (
            <h2>
              Player{" "}
              <span
                className={
                  currentPlayer === "X" ? "x-text" : "o-text"
                }
              >
                {currentPlayer}
              </span>
              's Turn
              <span className="turn-dot"></span>
            </h2>
          )}
        </div>

        {/* Game Board */}
        <div className="game-board">
          {board.map((cell, index) => (
            <button
              key={index}
              className={`game-cell ${
                cell === "X"
                  ? "cell-x"
                  : cell === "O"
                  ? "cell-o"
                  : ""
              }`}
              onClick={() => handleClick(index)}
              disabled={cell !== "" || winner !== "" || draw}
            >
              {cell}
            </button>
          ))}
        </div>

        {/* Restart Button */}
        <button
          className="restart-button"
          onClick={restartGame}
        >
          ↻ Restart Game
        </button>

        {/* Footer */}
        <div className="game-footer">
          <p>Player X starts first</p>
          <p>Made with React & useState</p>
        </div>

      </div>
    </div>
  );
}

export default App;
