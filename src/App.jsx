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
    const newRows = parseInt(newRowsStr, 50);
    const newCols = parseInt(newColsStr, 50);

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
    <div className="text-center p-12">
      <Menu />

      <h1 className="text-2xl mb-4">Filet Crochet Custom Pattern Builder</h1>

      <div className="mb-4 space-x-4">
        <label>
          rows:
          <input
            type="number"
            value={rows}
            min={1}
            max={100}
            onChange={(e) => handleResize(e.target.value, cols)}
            className="ml-2 border border-gray-300 rounded px-2 py-1"
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
            className="ml-2 border border-gray-300 rounded px-2 py-1"
          />
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
