import fs from "fs";

function getOriginDirectory() {
  const args = process.argv.slice(2);
  const path = args[0];

  if (!path) {
    console.error("Missing path.");
    return null;
  }

  return path;
}

function getDirectoryInfo(originDirectory) {
  const files = getFiles(originDirectory);
  const directories = getDirectories(originDirectory);

  const filesInfo = files.map(getFileInfo);

  if (directories) {
    directories.forEach((directory) => {
      filesInfo.push(...getDirectoryInfo(directory));
    });
  }

  return filesInfo;
}

function getFiles(directory) {
  let files, codeFiles;

  try {
    files = fs.readdirSync(directory);
  } catch (err) {
    console.error(`Error reading files in directory ${directory}`);
  }

  if (files) {
    codeFiles = files.filter((file) => file.indexOf(".js") === file.length - 3);
  } else {
    codeFiles = [];
  }

  return codeFiles.map((file) => formatPath(directory, file));
}

function getDirectories(directory) {
  let files, subDirectories;

  try {
    files = fs.readdirSync(directory);
  } catch (err) {
    console.error(`Error reading files in directory ${directory}`);
  }

  if (files) {
    subDirectories = files.filter((file) =>
      isDirectory(formatPath(directory, file))
    );
  } else {
    subDirectories = [];
  }

  return subDirectories.map((subDirectory) =>
    formatPath(directory, subDirectory)
  );
}

function formatPath(directory, fileOrSubDirectory) {
  if (directory === "./") {
    return `${directory}${fileOrSubDirectory}`;
  }

  return `${directory}/${fileOrSubDirectory}`;
}

function isDirectory(path) {
  try {
    const stats = fs.statSync(path);
    return stats.isDirectory();
  } catch (err) {
    console.error(`Error checking if ${path} is directory`);
  }

  return false;
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
  const originDirectory = getOriginDirectory();

  if (originDirectory) {
    const directoryInfo = getDirectoryInfo(originDirectory);
    const results = createResults(directoryInfo);

    displayResults(results);
    displayTotals(directoryInfo);
  }
}

main();
