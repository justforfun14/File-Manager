import { unlink } from "fs/promises";
import getFullPath from "./getFullPath.mjs";

const removeFile = async (pathToFile, currentDir) => {
  try {
    const tempPath = await getFullPath(pathToFile, currentDir);

    if (!tempPath) {
      throw new Error();
    }

    await unlink(tempPath);

    console.log("File deleted successfully!");
  } catch {
    console.log("Unable to delete file: " + pathToFile);
    return null;
  }
};

export default removeFile;
