import { createReadStream, createWriteStream } from "fs";
import path from "path";
import getFullPath from "./getFullPath.mjs";

const copyFile = async (oldPath, newPath, currentDir) => {
  try {
    const tempOldPath = await getFullPath(oldPath, currentDir);
    const tempNewPath = await getFullPath(newPath, currentDir);

    if (!tempOldPath || !tempNewPath) {
      throw new Error();
    }
    const fileName = path.parse(tempOldPath).base;
    const oldFile = createReadStream(tempOldPath);
    const newFile = createWriteStream(path.join(tempNewPath, fileName), {
      flags: "wx",
    });

    oldFile.on("error", () => {
      throw new Error();
    });

    newFile.on("error", () => {
      throw new Error();
    });

    await new Promise((resolve, reject) => {
      newFile.on("finish", resolve);
      newFile.on("error", reject);

      oldFile.pipe(newFile);
    });

    console.log("File copied successfully!");
  } catch {
    console.error("Unable to copy file:", oldPath);
    return null;
  }
};

export default copyFile;
