import fs from "fs";
import zlib from "zlib";

export const compressFile = (oldPath, newPath) => {
  const readStream = fs.createReadStream(oldPath);
  const writeStream = fs.createWriteStream(newPath);
  const brotli = zlib.createBrotliCompress();

  readStream.on("error", () => console.log("Operation failed"));
  brotli.on("error", () => console.log("Operation failed"));
  writeStream.on("error", () => console.log("Operation failed"));

  readStream.pipe(brotli).pipe(writeStream);
};

export const decompressFile = (oldPath, newPath) => {
  const readStream = fs.createReadStream(oldPath);
  const writeStream = fs.createWriteStream(newPath);
  const brotli = zlib.createBrotliDecompress();

  readStream.on("error", () => console.log("Operation failed"));
  brotli.on("error", () => console.log("Operation failed"));
  writeStream.on("error", () => console.log("Operation failed"));

  readStream.pipe(brotli).pipe(writeStream);
};
