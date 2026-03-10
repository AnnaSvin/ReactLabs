import type { CellValue } from "../../types/game.types";

interface CellProps {
  value: CellValue;
  onClick: () => void;
}

function Cell({ value, onClick }: CellProps) {
  return (
    <button className="cell" onClick={onClick}>
      {value}
    </button>
  );
}

export default Cell;