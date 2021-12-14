function countLines(filename, data) {
  const lines = splitStringByNewlines(data);
  const numLines = lines.length;
  const linesOfCode = lines.filter((line) => line.trim() !== "");
  const numLinesOfCode = linesOfCode.length;

  return {
    filename: filename,
    lines: numLines,
    linesOfCode: numLinesOfCode,
  };
}

function splitStringByNewlines(string) {
  return string.split("\n");
}

export { countLines };
