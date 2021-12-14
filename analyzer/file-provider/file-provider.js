import fs from "fs";

function readFile(filename) {
  try {
    return fs.readFileSync(filename, "utf8");
  } catch (err) {
    console.error(`Unable to read file ${filename}`);
  }

  return null;
}

export { readFile };
