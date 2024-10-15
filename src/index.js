import os from "os";
import getUsername from "./utils/getUsername.mjs";
import getCurrentFolderFiles from "./utils/getCurrentFolderFiles.mjs";
import goUp from "./utils/goUp.mjs";
import changeDirectory from "./utils/changeDirectory.mjs";
import getOSInfo from "./utils/getOsInfo.mjs";
import readFile from "./utils/readFile.mjs";
import createEmptyFile from "./utils/createEmptyFile.mjs";
import renameFile from "./utils/renameFile.mjs";
import copyFile from "./utils/copyFile.mjs";
import removeFile from "./utils/removeFile.mjs";
import getHash from "./utils/getHash.mjs";
import compressFile from "./utils/compressFile.mjs";
import decompressFile from "./utils/decompressFile.mjs";

const username = getUsername();
let currentPath = os.homedir();

const init = async () => {
  console.log(`Welcome to the File Manager, ${username}!`);
  console.log(`You are currently in ${currentPath}`);

  process.stdin.on("data", async (d) => {
    const [data, ...args] = d.toString().trim().split(" ");

    if (data === ".exit") {
      process.exit();
    }

    if (data === "ls") {
      await getCurrentFolderFiles(currentPath);
      console.log(`You are currently in ${currentPath}`);
      return;
    }

    if (data === "up") {
      currentPath = goUp(currentPath);
      console.log(`You are currently in ${currentPath}`);
      return;
    }

    if (data === "cd") {
      const newDir = await changeDirectory(args[0], currentPath);
      if (newDir) {
        currentPath = newDir;
      }
      console.log(`You are currently in ${currentPath}`);
      return;
    }

    if (data === "os") {
      getOSInfo(args[0]);
      console.log(`You are currently in ${currentPath}`);
      return;
    }

    if (data === "cat") {
      await readFile(args[0], currentPath);
      console.log(`You are currently in ${currentPath}`);
      return;
    }

    if (data === "add") {
      await createEmptyFile(args[0], currentPath);
      console.log(`You are currently in ${currentPath}`);
      return;
    }

    if (data === "rn") {
      await renameFile(args[0], args[1], currentPath);
      console.log(`You are currently in ${currentPath}`);
      return;
    }

    if (data === "cp") {
      await copyFile(args[0], args[1], currentPath);
      console.log(`You are currently in ${currentPath}`);
      return;
    }

    if (data === "rm") {
      await removeFile(args[0], currentPath);
      console.log(`You are currently in ${currentPath}`);
      return;
    }

    if (data === "mv") {
      await copyFile(args[0], args[1], currentPath);
      await removeFile(args[0], currentPath);
      console.log(`You are currently in ${currentPath}`);
      return;
    }

    if (data === "hash") {
      await getHash(args[0], currentPath);
      console.log(`You are currently in ${currentPath}`);
      return;
    }

    if (data === "compress") {
      await compressFile(args[0], args[1], currentPath);

      console.log(`You are currently in ${currentPath}`);
      return;
    }

    if (data === "decompress") {
      await decompressFile(args[0], args[1], currentPath);
      console.log(`You are currently in ${currentPath}`);
      return;
    }
  });

  process.on("SIGINT", () => {
    process.exit();
  });

  process.on("exit", () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  });

  process.on("uncaughtException", (data) => {
    console.log(data.toString());
  });
};

init();
