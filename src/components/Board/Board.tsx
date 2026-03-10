import Cell from "../Cell/Cell";
import type { BoardState } from "../../types/game.types";

interface BoardProps {
  board: BoardState;
  onCellClick: (index: number) => void;
}

function Board({ board, onCellClick }: BoardProps) {
  return (
    <div className="board">
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