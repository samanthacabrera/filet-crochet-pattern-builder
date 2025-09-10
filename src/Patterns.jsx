function generateHeartPattern(rows, cols) {
  const pattern = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = (c / cols) * 3 - 1.5;
      const y = (r / rows) * 3 - 1.5; 

      // Heart equation
      const value = Math.pow(x * x + y * y - 1, 3) - x * x * y * y * y;

      if (value <= 0) {
        pattern[r][c] = 1;
      }
    }
  }

  return pattern;
}

function Patterns({ setGrid, rows, cols }) {
  const applyHeart = () => {
    const heart = generateHeartPattern(rows, cols);
    setGrid(heart);
  };

  return (
    <div id="patterns" className="p-4 mt-16 text-left">
      <h2 className="text-xl mb-4">Patterns</h2>
      <p className="mb-2">Click a pattern to insert it into the grid:</p>

      <div className="flex space-x-4">
        <button
          onClick={applyHeart}
          className="p-2 border rounded hover:bg-red-100"
        >
          ❤️ Heart
        </button>
      </div>
    </div>
  );
}

export default Patterns;
