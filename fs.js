import fs from "fs";
import path from "path";

export const readFile = (filePath) => {
  try {
    const readStream = fs.createReadStream(filePath, "utf-8");
    readStream.on("data", (data) => {
      process.stdout.write(data);
    });
  } catch {
    console.log("Operation failed");
  }
};

export const createFile = (fileName, currentDir) => {
  const fullPath = path.join(currentDir, fileName);
  fs.writeFile(fullPath, "", (err) => {
    if (err) console.log("Operation failed");
  });
};

export const createDir = (dirName, currentDir) => {
  const fullPath = path.join(currentDir, dirName);
  fs.mkdir(fullPath, (err) => {
    if (err) console.log("Operation failed");
  });
};

export const renameFile = (oldPath, newName) => {
  const newPath = path.join(path.dirname(oldPath), newName);
  fs.rename(oldPath, newPath, (err) => {
    if (err) console.log("Operation failed");
  });
};

export const copyFile = (oldPath, newDir) => {
  const fileName = path.basename(oldPath);
  const newPath = path.join(newDir, fileName);

  const readStream = fs.createReadStream(oldPath);
  const writeStream = fs.createWriteStream(newPath);

  readable.on("error", () => {
    console.log("Operation failed");
  });

  writable.on("error", () => {
    console.log("Operation failed");
  });

  readStream.pipe(writeStream);
};

export const moveFile = (oldPath, newDir) => {
  const fileName = path.basename(oldPath);
  const newPath = path.join(newDir, fileName);

  const readStream = fs.createReadStream(oldPath);
  const writeStream = fs.createWriteStream(newPath);

  let hasError = false;

  readStream.on("error", () => {
    console.log("Operation failed");
    hasError = true;
  });

  writeStream.on("error", () => {
    console.log("Operation failed");
    hasError = true;
  });

  writeStream.on("close", () => {
    if (!hasError) {
      fs.unlink(oldPath, (err) => {
        if (err) console.log("Operation failed");
      });
    }
  });

  readStream.pipe(writeStream);
};

export const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) console.log("Operation failed");
  });
};
