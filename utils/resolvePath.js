import path from "path";

export const resolvePath = (currentDir, inputPath) => {
  return path.isAbsolute(inputPath)
    ? inputPath
    : path.join(currentDir, inputPath);
};
