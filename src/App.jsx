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

  const toggleRow = (rowIndex) => {
    setGrid((prev) => {
      const newGrid = prev.map((r) => [...r]);
      newGrid[rowIndex] = newGrid[rowIndex].map((cell) => (cell ? 0 : 1));
      return newGrid;
    });
  };

  const toggleCol = (colIndex) => {
    setGrid((prev) => {
      const newGrid = prev.map((r) => [...r]);
      for (let i = 0; i < newGrid.length; i++) {
        newGrid[i][colIndex] = newGrid[i][colIndex] ? 0 : 1;
      }
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

      <div
        style={{
          width: "100%",
          maxWidth: "100vw",
          height: "80vh",
          overflow: "auto",
          background: "#f9f9f9",
          padding: "0.5rem",
        }}
      >
        <div className="pixel-grid">
          <div style={{ display: "flex", marginLeft: "2rem" }}>
            {Array.from({ length: cols }).map((_, colIndex) => (
              <button
                key={colIndex}
                onClick={() => toggleCol(colIndex)}
                style={{ margin: "2px", fontSize: "0.8rem" }}
              >
                ⬇
              </button>
            ))}
          </div>

          {grid.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: "flex", alignItems: "center" }}>
              <button
                onClick={() => toggleRow(rowIndex)}
                style={{ marginRight: "4px", fontSize: "0.8rem" }}
              >
                ⬅
              </button>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${cols}, minmax(20px, 1fr))`,
                  gap: "1px",
                  flex: 1,
                }}
              >
                {row.map((cell, colIndex) => (
                  <div
                    key={colIndex}
                    onClick={() => toggleCell(rowIndex, colIndex)}
                    style={{
                      aspectRatio: "1 / 1",
                      background: cell ? "black" : "white",
                      border: "1px solid #ccc",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default App;
