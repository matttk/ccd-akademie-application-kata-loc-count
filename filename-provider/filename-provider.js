import fs from "fs";

function findSourceFilenames(originDirectory) {
  const files = getFiles(originDirectory);
  const directories = getDirectories(originDirectory);

  if (directories) {
    directories.forEach((directory) => {
      files.push(...findSourceFilenames(directory));
    });
  }

  return files;
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

export { findSourceFilenames };
