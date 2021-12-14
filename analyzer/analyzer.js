import { readFile } from "./file-provider/file-provider.js";
import { countLines } from "./lines-of-code/lines-of-code.js";

function analyseFiles(filenames) {
  const files = filenames.map((filename) => {
    return {
      filename: filename,
      data: readFile(filename),
    };
  });
  const validFiles = files.filter((file) => file.data !== null);
  const stats = validFiles.map(({ filename, data }) =>
    countLines(filename, data)
  );

  return stats;
}

export { analyseFiles };
