function getPath() {
  const args = process.argv.slice(2);
  const path = args[0];

  if (!path) {
    console.error("Missing path.");
    return null;
  }

  return path;
}

export { getPath };
