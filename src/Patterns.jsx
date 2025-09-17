import { exportAsText, downloadTextFile } from "./ExportPattern";

function generateHeartPattern(rows, cols) {
  const pattern = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = (c / cols) * 3 - 1.5;
      const y = (r / rows) * 3 - 1.5;

      // Heart equation
      const value = Math.pow(x * x + y * y - 1, 3) - x * x * y * y * y;
      if (value <= 0) pattern[r][c] = 1;
    }
  }

  return pattern;
}

function generateCloverPattern(rows, cols) {
  const pattern = Array.from({ length: rows }, () => Array(cols).fill(0));

  const centerX = cols / 2;
  const centerY = rows / 2 + Math.floor(rows / 8);
  const radius = Math.min(rows, cols) / 6;
  const offset = radius * 0.8;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const leaves = [
        { x: centerX - offset, y: centerY - offset },
        { x: centerX + offset, y: centerY - offset },
        { x: centerX - offset, y: centerY + offset },
        { x: centerX + offset, y: centerY + offset },
      ];

      const inLeaf = leaves.some(
        leaf => Math.hypot(c - leaf.x, r - leaf.y) <= radius
      );

      const stemWidth = Math.max(1, Math.floor(cols / 40));
      const stemHeight = Math.floor(rows / 3);
      const stemBottom = centerY - radius;
      const inStem =
        r >= stemBottom - stemHeight &&
        r <= stemBottom &&
        c >= centerX - Math.floor(stemWidth / 2) &&
        c <= centerX + Math.floor(stemWidth / 2);

      if (inLeaf || inStem) pattern[r][c] = 1;
    }
  }

  return pattern;
}

function generateMoonPattern(rows, cols) {
  const pattern = Array.from({ length: rows }, () => Array(cols).fill(0));

  const centerX = cols / 2;
  const centerY = rows / 2;
  const radius = Math.min(rows, cols) / 3;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const dist1 = Math.hypot(c - centerX, r - centerY);
      const dist2 = Math.hypot(c - (centerX + radius / 3), r - centerY);

      if (dist1 <= radius && dist2 > radius / 1.2) {
        pattern[r][c] = 1;
      }
    }
  }

  return pattern;
}

function Patterns({ setGrid, rows, cols }) {
  const handlePattern = (generator, name) => {
    const pattern = generator(rows, cols);
    setGrid(pattern);

    // Export as text + trigger download
    const textChart = exportAsText(pattern);
    downloadTextFile(`${name}-pattern.txt`, textChart);
  };

  return (
    <div id="patterns" className="p-4 mt-16 text-left">
      <h2 className="text-xl mb-4">Patterns</h2>
      <p className="mb-2">Click a pattern to insert and download its chart:</p>

      <div className="flex space-x-4">
        <button
          onClick={() => handlePattern(generateHeartPattern, "heart")}
          className="p-2 border rounded hover:bg-red-100"
        >
          ❤️ Heart
        </button>
        <button
          onClick={() => handlePattern(generateCloverPattern, "clover")}
          className="p-2 border rounded hover:bg-yellow-100"
        >
          🍀 Clover
        </button>
        <button
          onClick={() => handlePattern(generateMoonPattern, "moon")}
          className="p-2 border rounded hover:bg-gray-100"
        >
          🌙 Moon
        </button>
      </div>
    </div>
  );
}

export default Patterns;
