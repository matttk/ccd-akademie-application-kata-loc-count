import fs from "fs";

function getOriginDirectory() {
  return "./";
}

function getDirectoryInfo(originDirectory) {
  const files = getFiles(originDirectory);
  const directories = getDirectories(originDirectory);

  const filesInfo = files.map(getFileInfo);
  const directoriesInfo = directories.map(getDirectoryInfo);

  return [...filesInfo, ...directoriesInfo];
}

function getFiles() {
  return ["./index.js"];
}

function getDirectories() {
  return [];
}

function getFileInfo(filename) {
  const fileData = readFile(filename);
  const { numLines, numLinesOfCode } = countLines(fileData);

  return {
    path: filename,
    lines: numLines,
    linesOfCode: numLinesOfCode,
  };
}

function readFile(filename) {
  try {
    return fs.readFileSync(filename, "utf8");
  } catch (err) {
    console.error(`Unable to read file ${filename}`);
  }

  return null;
}

function countLines(fileData) {
  const lines = splitStringByNewlines(fileData);
  const numLines = lines.length;
  const linesOfCode = lines.filter((line) => line.trim() !== "");
  const numLinesOfCode = linesOfCode.length;

  return { numLines, numLinesOfCode };
}

function splitStringByNewlines(string) {
  return string.split("\n");
}

function createResults(directoryInfo) {
  return directoryInfo.map(createResult);
}

function createResult(fileInfo) {
  return `${fileInfo.path} ${fileInfo.lines} ${fileInfo.linesOfCode}`;
}

function displayResults(results) {
  results.forEach(displayResult);
}

function displayResult(result) {
  console.log(result);
}

function main() {
  const originDirectory = getOriginDirectory();
  const directoryInfo = getDirectoryInfo(originDirectory);
  const results = createResults(directoryInfo);

  displayResults(results);
}

main();
