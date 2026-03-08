import Cell from "../Cell/Cell";

function Board() {
  const cells = Array.from({ length: 9 });

  return (
    <div className="board">
      {cells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  );
}

export default Board;