function Grid({ grid, rows, cols, toggleCell, toggleRow, toggleCol }) {
  return (
    <div className="w-full max-w-full p-2">
      {/* Column labels */}
      <div className="flex ml-16">
        <div className="grid flex-1" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {Array.from({ length: cols }).map((_, colIndex) => (
            <div key={colIndex} className="text-center text-xs text-gray-500">
              {colIndex + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Column toggles */}
      <div className="flex ml-16 mb-1">
        <div className="grid flex-1" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {Array.from({ length: cols }).map((_, colIndex) => (
            <button
              key={colIndex}
              onClick={() => toggleCol(colIndex)}
              className="text-[0.8rem]"
            >
              ⬇
            </button>
          ))}
        </div>
      </div>

      {/* Grid rows */}
      {grid
        .map((row, rowIndex) => ({ row, rowIndex }))
        .reverse()
        .map(({ row, rowIndex }, displayIndex) => (
          <div key={rowIndex} className="flex items-center">
            {/* Row label */}
            <div className="w-8 text-right mr-1 text-xs text-gray-500">
              {rows - displayIndex}
            </div>

            {/* Row toggle */}
            <button
              onClick={() => toggleRow(rowIndex)}
              className="mr-1 text-[0.8rem]"
            >
              ⬅
            </button>

            {/* Cells */}
            <div className="grid flex-1 gap-[1px]" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  onClick={() => toggleCell(rowIndex, colIndex)}
                  className={`aspect-square border border-gray-300 cursor-pointer ${
                    cell ? "bg-black" : "bg-white"
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default Grid;