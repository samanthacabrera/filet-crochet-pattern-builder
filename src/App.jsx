import { useState } from "react";

function App() {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);

  function createGrid(rows, cols) {
    const grid = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push(0); 
      }
      grid.push(row);
    }
    return grid;
  }

  const grid = createGrid(rows, cols);

  return (
    <div>
      <h1>Filet Crochet Custom Pattern Builder</h1>

      <div className="inputs">
        <label>
          Rows:
          <input
            type="number"
            value={rows}
            min={1}
            max={50}
            onChange={(e) => setRows(Number(e.target.value))}
          />
        </label>
        <label>
          Columns:
          <input
            type="number"
            value={cols}
            min={1}
            max={50}
            onChange={(e) => setCols(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="pixel-grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((pixel, colIndex) => (
              <span key={colIndex}> ▢ </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
