
const heartPattern = [
    [0, 0, 1, 0, 0],
    [0,1,1,1,0],
    [1,1,1,1,1],
    [1,1,1,1,1],
    [0,1,0,1,0],
];

function Patterns({ setGrid, rows, cols }) {
  const applyPattern = (pattern) => {
    const newGrid = Array.from({ length: rows }, () => Array(cols).fill(0));
    const offsetRow = Math.floor((rows - pattern.length) / 2);
    const offsetCol = Math.floor((cols - pattern[0].length) / 2);

    pattern.forEach((row, rIdx) => {
      row.forEach((cell, cIdx) => {
        if (cell && newGrid[offsetRow + rIdx] && newGrid[offsetRow + rIdx][offsetCol + cIdx] !== undefined) {
          newGrid[offsetRow + rIdx][offsetCol + cIdx] = 1;
        }
      });
    });

    setGrid(newGrid);
  };

  return (
    <div id="patterns" className="p-4 mt-16 text-left">
      <h2 className="text-xl mb-4">Patterns</h2>
      <p className="mb-2">Click a pattern to insert it into the grid:</p>

      <div className="flex space-x-4">
        <button
          onClick={() => applyPattern(heartPattern)}
          className="p-2 border rounded hover:bg-red-100"
        >
          ❤️ Heart
        </button>
      </div>
    </div>
  );
}

export default Patterns;