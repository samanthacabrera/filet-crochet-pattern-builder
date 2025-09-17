// Convert a numeric crochet pattern grid into a filet crochet text chart.

export function exportAsText(pattern) {
  return pattern
    .map(row => row.map(cell => (cell ? "■" : "□")).join(" "))
    .reverse() // bottom row is row 1
    .join("\n");
}

// Trigger a download of the crochet text chart as a .txt file.
export function downloadTextFile(filename, text) {
  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
