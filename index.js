import os from "os";
import readline from "readline";
import { printCurrentDir, printGoodbye, printWelcome } from "./utils/print.js";
import { changeDirectory, listFiles, up } from "./navigation.js";
import { resolvePath } from "./utils/resolvePath.js";
import {
  createDir,
  createFile,
  deleteFile,
  moveFile,
  readFile,
  renameFile,
} from "./fs.js";
import path from "path";
import { copyFile } from "fs";
import { calculateHash } from "./hash.js";

const main = async () => {
  const username = process.argv.find((arg) => arg.startsWith("--username="));
  const user = username ? username.split("=")[1] : "Anonymus";

  let currentDir = os.homedir();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
  });

  printWelcome(user);
  printCurrentDir(currentDir);

  rl.prompt();

  rl.on("line", async (input) => {
    const trimmedInput = input.trim();
    if (trimmedInput === ".exit") {
      rl.close();
      return;
    }
    const [command, ...args] = trimmedInput.split(" ");

    switch (command) {
      case "up":
        currentDir = up(currentDir);
        break;
      case "cd":
        if (args.length > 0) {
          const newPath = resolvePath(currentDir, args[0]);
          const changedDir = changeDirectory(newPath);
          if (changedDir) currentDir = changedDir;
        }
        break;
      case "ls":
        const files = listFiles(currentDir);
        break;
      case "cat":
        if (args.length > 0) {
          const filePath = resolvePath(currentDir, args[0]);
          readFile(filePath);
        }
        break;
      case "add":
        if (args.length > 0) {
          createFile(args[0], currentDir);
        }
        break;
      case "mkdir":
        if (args.length > 0) {
          createDir(args[0], currentDir);
        }
        break;
      case "rn":
        if (args.length === 2) {
          const oldPath = path.join(currentDir, args[0]);
          const newName = args[1];
          renameFile(oldPath, newName);
        }
        break;
      case "cp":
        if (args.length === 2) {
          const oldPath = path.join(currentDir, args[0]);
          const newName = path.join(currentDir, args[1]);
          copyFile(oldPath, newName);
        }
        break;
      case "mv":
        if (args.length === 2) {
          const oldPath = path.join(currentDir, args[0]);
          const newName = path.join(currentDir, args[1]);
          moveFile(oldPath, newName);
        }
        break;
      case "rm":
        if (args.length > 0) {
          const filePath = path.join(currentDir, args[0]);
          deleteFile(filePath);
        }
        break;
      case "hash":
        if (args.length > 0) {
          const filePath = resolvePath(currentDir, args[0]);
          calculateHash(filePath);
        }
        break;
      default:
        console.log(`Invalid input: ${trimmedInput}`);
        break;
    }

    printCurrentDir(currentDir);
    rl.prompt();
  });

  rl.on("close", () => {
    printGoodbye(user);
    process.exit(0);
  });

  rl.on("SIGINT", () => {
    rl.close();
  });
};

await main();
