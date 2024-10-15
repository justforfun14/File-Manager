import { rename } from "fs/promises";
import path from "path";
import getFullPath from "./getFullPath.mjs";

const renameFile = async (pathToFile, newFileName, currentDir) => {
  try {
    const tempPath = await getFullPath(pathToFile, currentDir);

    if (!tempPath) {
      throw new Error();
    }
    const pathToNewFile = path.join(path.parse(tempPath).dir, newFileName);

    await rename(tempPath, pathToNewFile);

    console.log("File renamed successfully!");
  } catch {
    console.log("Unable to rename file: " + pathToFile);
    return null;
  }
};

export default renameFile;
