import { useState } from "react";
import Menu from "./Menu";

function App() {
  function createGrid(rows, cols) {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
  }
  
  const [rows, setRows] = useState("10"); 
  const [cols, setCols] = useState("10"); 
  const [grid, setGrid] = useState(createGrid(10, 10));
  const [error, setError] = useState("");

  const handleResize = (newRowsStr, newColsStr) => {
    const newRows = parseInt(newRowsStr, 10);
    const newCols = parseInt(newColsStr, 10);

    if (!newRows || !newCols) {
      setRows(newRowsStr);
      setCols(newColsStr);
      return;
    }

    if (newRows > 100 || newCols > 100) {
      setError("Error: Maximum grid size is 100x100.");
      return;
    }

    setError("");
    setRows(newRowsStr);
    setCols(newColsStr);
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
       <Menu />

      <div className="inputs" style={{ marginBottom: "1rem" }}>
        <label>
        rows: 
        <input
          type="number"
          value={rows}
          min={1}
          max={100}
          onChange={(e) => handleResize(e.target.value, cols)}
        />
        </label>
        <label>
        columns:
        <input
          type="number"
          value={cols}
          min={1}
          max={100}
          onChange={(e) => handleResize(rows, e.target.value)}
        />
        </label>
      </div>

      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>
          {error}
        </div>
      )}

      <div style={{ opacity: "50%", fontSize: "15px" }}>
        <p>Maximum grid size is 100x100</p>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "100vw",
          height: "80vh",
          overflow: "auto",
          padding: "0.5rem",
        }}
      >
        {/* col label */}
        <div style={{ display: "flex", marginLeft: "4rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${cols}, minmax(5px, 1fr))`,
              flex: 1,
            }}
          >
            {Array.from({ length: cols }).map((_, colIndex) => (
              <div
                key={colIndex}
                style={{
                  textAlign: "center",
                  fontSize: "0.75rem",
                  color: "#555",
                }}
              >
                {colIndex + 1}
              </div>
            ))}
          </div>
        </div>

        {/* col toggle */}
        <div
          style={{ display: "flex", marginLeft: "4rem", marginBottom: "4px" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${cols}, minmax(5px, 1fr))`,
              flex: 1,
            }}
          >
            {Array.from({ length: cols }).map((_, colIndex) => (
              <button
                key={colIndex}
                onClick={() => toggleCol(colIndex)}
                style={{ fontSize: "0.8rem" }}
              >
                ⬇
              </button>
            ))}
          </div>
        </div>

        {grid
          .map((row, rowIndex) => ({ row, rowIndex }))
          .reverse()
          .map(({ row, rowIndex }, displayIndex) => (
            <div
              key={rowIndex}
              style={{ display: "flex", alignItems: "center" }}
            >
              {/* row label */}
              <div
                style={{
                  width: "2rem",
                  textAlign: "right",
                  marginRight: "4px",
                  fontSize: "0.75rem",
                  color: "#555",
                }}
              >
                {rows - displayIndex}
              </div>

              {/* row toggle */}
              <button
                onClick={() => toggleRow(rowIndex)}
                style={{ marginRight: "4px", fontSize: "0.8rem" }}
              >
                ⬅
              </button>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${cols}, minmax(5px, 1fr))`,
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
  );
}

export default App;
