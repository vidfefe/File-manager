import { createHash } from "crypto";
import fs from "fs";

export const calculateHash = (filePath) => {
  const hash = createHash("sha256");
  const stream = fs.createReadStream(filePath);

  stream.on("error", () => {
    console.log("Operation failed");
  });

  stream.on("data", (data) => {
    hash.update(data);
  });

  stream.on("end", () => {
    console.log(hash.digest("hex"));
  });
};
