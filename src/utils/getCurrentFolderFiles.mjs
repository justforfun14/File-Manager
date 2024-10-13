import { readdir } from "fs";
import { promisify } from "util";

const readdirAsync = promisify(readdir);

const getCurrentFolderFiles = async (currPath) => {
  try {
    const files = await readdirAsync(currPath, { withFileTypes: true });

    const fileData = files
      .map((file) => ({
        Name: file.name,
        Type: file.isDirectory() ? "directory" : "file",
      }))
      .sort((a, b) => {
        if (a.Type === "directory" && b.Type !== "directory") return -1;
        if (a.Type !== "directory" && b.Type === "directory") return 1;
        else return 0;
      });

    console.table(fileData);
  } catch (err) {
    console.log("Unable to scan directory: " + err);
  }
};

export default getCurrentFolderFiles;
