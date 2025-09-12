import { useState } from "react";
import Menu from "./Menu";
import Grid from "./Grid";
import Patterns from "./Patterns";

function App() {
  function createGrid(rows, cols) {
    return Array.from({ length: rows }, () => Array(cols).fill(0));
  }

  const [rows, setRows] = useState("50");
  const [cols, setCols] = useState("50");
  const [grid, setGrid] = useState(createGrid(50, 50));
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

  const sizeOptions = Array.from({ length: 51 }, (_, i) => i + 50);

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
    <div className="text-center p-12">
      <Menu />

      <h1 className="text-2xl mb-4">Filet Crochet Custom Pattern Builder</h1>

      <div className="mb-4 space-x-4">
        <label>
          Rows:
          <select
            value={rows}
            onChange={(e) => handleResize(e.target.value, cols)}
            className="ml-2 border border-gray-300 rounded px-2 py-1"
          >
            {sizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
        <label>
          Columns:
          <select
            value={cols}
            onChange={(e) => handleResize(rows, e.target.value)}
            className="ml-2 border border-gray-300 rounded px-2 py-1"
          >
            {sizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <div className="opacity-50 text-sm mb-2">
        <p>Maximum grid size is 100x100</p>
      </div>

      <Grid
        grid={grid}
        rows={parseInt(rows)}
        cols={parseInt(cols)}
        toggleCell={toggleCell}
        toggleRow={toggleRow}
        toggleCol={toggleCol}
      />

      <Patterns setGrid={setGrid} rows={parseInt(rows)} cols={parseInt(cols)}/>
    </div>
  );
}

export default App;
