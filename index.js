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
import { compressFile, decompressFile } from "./compression.js";
import {
  logArchitecture,
  logCPUs,
  logEOL,
  logHomedir,
  logUsername,
} from "./os.js";

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
        } else {
          console.log("Operation failed");
        }
        break;
      case "ls":
        listFiles(currentDir);
        break;
      case "cat":
        if (args.length > 0) {
          const filePath = resolvePath(currentDir, args[0]);
          readFile(filePath);
        } else {
          console.log("Operation failed");
        }
        break;
      case "add":
        if (args.length > 0) {
          createFile(args[0], currentDir);
        } else {
          console.log("Operation failed");
        }
        break;
      case "mkdir":
        if (args.length > 0) {
          createDir(args[0], currentDir);
        } else {
          console.log("Operation failed");
        }
        break;
      case "rn":
        if (args.length === 2) {
          const oldPath = path.join(currentDir, args[0]);
          const newName = args[1];
          renameFile(oldPath, newName);
        } else {
          console.log("Operation failed");
        }
        break;
      case "cp":
        if (args.length === 2) {
          const oldPath = path.join(currentDir, args[0]);
          const newName = path.join(currentDir, args[1]);
          copyFile(oldPath, newName);
        } else {
          console.log("Operation failed");
        }
        break;
      case "mv":
        if (args.length === 2) {
          const oldPath = path.join(currentDir, args[0]);
          const newName = path.join(currentDir, args[1]);
          moveFile(oldPath, newName);
        } else {
          console.log("Operation failed");
        }
        break;
      case "rm":
        if (args.length > 0) {
          const filePath = path.join(currentDir, args[0]);
          deleteFile(filePath);
        } else {
          console.log("Operation failed");
        }
        break;
      case "hash":
        if (args.length > 0) {
          const filePath = resolvePath(currentDir, args[0]);
          calculateHash(filePath);
        } else {
          console.log("Operation failed");
        }

        break;
      case "compress":
        if (args.length === 2) {
          const oldPath = resolvePath(currentDir, args[0]);
          const newPath = resolvePath(currentDir, args[1]);
          compressFile(oldPath, newPath);
        } else {
          console.log("Operation failed");
        }
        break;
      case "decompress":
        if (args.length === 2) {
          const oldPath = resolvePath(currentDir, args[0]);
          const newPath = resolvePath(currentDir, args[1]);
          decompressFile(oldPath, newPath);
        } else {
          console.log("Operation failed");
        }
        break;
      case "os":
        switch (args[0]) {
          case "--EOL":
            logEOL();
            break;
          case "--cpus":
            logCPUs();
            break;
          case "--homedir":
            logHomedir();
            break;
          case "--username":
            logUsername();
            break;
          case "--architecture":
            logArchitecture();
            break;
          default:
            console.log(`Invalid input: ${args[0]}`);
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
