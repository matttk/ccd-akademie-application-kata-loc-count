import { analyseFiles } from "./analyzer/analyzer.js";
import { getPath } from "./command-line/command-line.js";
import { findSourceFilenames } from "./filename-provider/filename-provider.js";

function createResults(directoryInfo) {
  return directoryInfo.map(createResult);
}

function createResult(fileInfo) {
  return `${fileInfo.filename} ${fileInfo.lines} ${fileInfo.linesOfCode}`;
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
    const filenames = findSourceFilenames(originDirectory);
    const directoryInfo = analyseFiles(filenames);
    const results = createResults(directoryInfo);

    displayResults(results);
    displayTotals(directoryInfo);
  }
}

main();
