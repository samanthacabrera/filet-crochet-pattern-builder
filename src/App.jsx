import { useState } from "react";

function App() {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [grid, setGrid] = useState(createGrid(10, 10));

  function createGrid(rows, cols) {
    return Array.from({ length: rows }, () => Array(cols).fill(0));
  }

  // update grid whenever rows/cols change
  const handleResize = (newRows, newCols) => {
    setRows(newRows);
    setCols(newCols);
    setGrid(createGrid(newRows, newCols));
  };

  const toggleCell = (row, col) => {
    setGrid((prev) => {
      const newGrid = prev.map((r) => [...r]);
      newGrid[row][col] = newGrid[row][col] ? 0 : 1;
      return newGrid;
    });
  };

  return (
    <div>
      <h1>Filet Crochet Custom Pattern Builder</h1>

      <div className="inputs" style={{ marginBottom: "1rem" }}>
        <label>
          Rows:
          <input
            type="number"
            value={rows}
            min={1}
            max={50}
            onChange={(e) => handleResize(Number(e.target.value), cols)}
          />
        </label>
        <label>
          Columns:
          <input
            type="number"
            value={cols}
            min={1}
            max={50}
            onChange={(e) => handleResize(rows, Number(e.target.value))}
          />
        </label>
      </div>

      {/* scrollable container */}
      <div
        style={{
          width: "80vw",
          height: "80vh",
          overflow: "auto",
          background: "#f9f9f9"
        }}
      >
        <div className="pixel-grid">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex}>
              {row.map((cell, colIndex) => (
                <span
                  key={colIndex}
                  onClick={() => toggleCell(rowIndex, colIndex)}
                  style={{
                    cursor: "pointer",
                    color: cell ? "black" : "lightgray",
                  }}
                >
                  {cell ? "■" : "□"}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
