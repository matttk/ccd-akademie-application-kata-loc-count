const COMMENT_SYMBOL = "//";

function countLines(filename, data) {
  const lines = splitStringByNewlines(data);
  const numLines = lines.length;
  const linesOfCode = lines.filter(isLineOfCode);
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

function isLineOfCode(line) {
  return line.trim() !== "" && line.indexOf(COMMENT_SYMBOL) !== 0;
}

export { countLines };
