import { createReadStream, createWriteStream } from "fs";
import path from "path";
import getFullPath from "./getFullPath.mjs";
import { createBrotliCompress } from "node:zlib";

const compressFile = async (oldPath, newPath, currentDir) => {
  try {
    const tempOldPath = await getFullPath(oldPath, currentDir);
    const tempNewPath = await getFullPath(newPath, currentDir);

    if (!tempOldPath || !tempNewPath) {
      throw new Error();
    }

    const newFileName = path.parse(tempOldPath).name + ".br";
    const oldFile = createReadStream(tempOldPath);
    const newFile = createWriteStream(path.join(tempNewPath, newFileName), {
      flags: "w",
    });

    const brottled = createBrotliCompress();

    oldFile.on("error", () => {
      throw new Error();
    });

    brottled.on("error", () => {
      throw new Error();
    });

    await new Promise((resolve, reject) => {
      newFile.on("finish", resolve);
      newFile.on("error", reject);

      oldFile.pipe(brottled).pipe(newFile);
    });

    console.log("File compressed successfully.");
  } catch {
    console.error("Unable to compress:", oldPath);
    return null;
  }
};

export default compressFile;
