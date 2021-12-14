import fs from "fs";

import { getPath } from "./command-line/command-line.js";
import { findSourceFilenames } from "./filename-provider/filename-provider.js";

function getDirectoryInfo(originDirectory) {
  const files = findSourceFilenames(originDirectory);
  const filesInfo = files.map(getFileInfo);

  return filesInfo;
}

function getFileInfo(filename) {
  const fileData = readFile(filename);

  if (!fileData) {
    return {
      path: filename,
      lines: 0,
      linesOfCode: 0,
    };
  }

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

function displayTotals(info) {
  let numLines = 0;
  let numLinesOfCode = 0;

  info.forEach((result) => {
    numLines += result.lines;
    numLinesOfCode += result.linesOfCode;
  });

  console.log("\nTotal:");
  console.log(`  Lines: ${numLines}`);
  console.log(`  LOC  : ${numLinesOfCode}`);
}

function main() {
  const originDirectory = getPath();

  if (originDirectory) {
    const directoryInfo = getDirectoryInfo(originDirectory);
    const results = createResults(directoryInfo);

    displayResults(results);
    displayTotals(directoryInfo);
  }
}

main();
