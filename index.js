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

function getFileInfo() {
  return {
    path: "./index.js",
    lines: 10,
    linesOfCode: 5,
  };
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
