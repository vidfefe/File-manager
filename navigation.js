import path from "path";
import fs from "fs";

export const up = (currentDir) => {
  const parentDir = path.dirname(currentDir);
  if (parentDir !== currentDir) {
    return parentDir;
  }
  return currentDir;
};

export const changeDirectory = (newPath) => {
  if (fs.existsSync(newPath) && fs.lstatSync(newPath).isDirectory()) {
    return newPath;
  }

  console.log("Operation failed");
  return null;
};

export const listFiles = (dir) => {
  try {
    const files = fs.readdirSync(dir);
    const folders = [];
    const regularFiles = [];

    files.forEach((file) => {
      const fullPath = path.join(dir, file);
      if (fs.lstatSync(fullPath).isDirectory()) {
        folders.push(file);
      } else {
        regularFiles.push(file);
      }
    });

    const sortedFolders = folders.sort();
    const sortedFiles = regularFiles.sort();

    console.log("\nIndex  Name                          Type");
    console.log("-------------------------------------------");

    sortedFolders.forEach((folder, index) => {
      console.log(`${index + 1}     ${folder.padEnd(30)} directory`);
    });

    sortedFiles.forEach((file, index) => {
      console.log(
        `${index + sortedFolders.length + 1}     ${file.padEnd(30)} file`
      );
    });
  } catch (err) {
    console.log("Operation failed");
    return [];
  }
};
