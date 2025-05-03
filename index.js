import os from "os";
import readline from "readline";
import { printCurrentDir, printGoodbye, printWelcome } from "./utils/print.js";
import { changeDirectory, listFiles, up } from "./navigation.js";

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
    } else if (trimmedInput === "up") {
      currentDir = up(currentDir);
    } else if (trimmedInput.startsWith("cd ")) {
      const newDir = trimmedInput.slice(3).trim();
      if (newDir) {
        const changedDir = changeDirectory(newDir, currentDir);
        if (changedDir) currentDir = changedDir;
      }
    } else if (trimmedInput === "ls") {
      const files = listFiles(currentDir);
    } else {
      console.log(`Invalid input: ${trimmedInput}`);
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
