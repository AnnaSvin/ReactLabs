import Cell from "../Cell/Cell";
import type { BoardState } from "../../types/game.types";

interface BoardProps {
  board: BoardState;
  boardSize: number;
  onCellClick: (index: number) => void;
}

function Board({ board, boardSize, onCellClick }: BoardProps) {
  return (
    <div
      className="board"
      style={{ gridTemplateColumns: `repeat(${boardSize}, 100px)` }}
    >
      {board.map((value, index) => (
        <Cell
          key={index}
          value={value}
          onClick={() => onCellClick(index)}
        />
      ))}
    </div>
  );
}

export default Board;