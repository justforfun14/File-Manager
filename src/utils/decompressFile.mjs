import { createReadStream, createWriteStream } from "fs";
import getFullPath from "./getFullPath.mjs";
import { createBrotliDecompress } from "node:zlib";
import path from "path";

const decompressFile = async (oldPath, newPath, currentDir) => {
  try {
    const tempOldPath = await getFullPath(oldPath, currentDir);

    const targetPath = path.normalize(newPath);

    const tempNewPath = path.isAbsolute(targetPath)
      ? targetPath
      : path.join(currentDir, targetPath);

    if (!tempOldPath || !tempNewPath) {
      throw new Error();
    }

    const oldFile = createReadStream(tempOldPath);
    const newFile = createWriteStream(tempNewPath, {
      flags: "wx",
    });

    const unbrottled = createBrotliDecompress({});

    oldFile.on("error", () => {
      throw new Error();
    });

    unbrottled.on("error", () => {
      throw new Error();
    });

    await new Promise((resolve, reject) => {
      newFile.on("finish", resolve);
      newFile.on("error", reject);

      oldFile.pipe(unbrottled).pipe(newFile);
    });

    console.log("File decompressed successfully!");
  } catch (e) {
    console.log(e);
    console.error("Unable to decompress:", oldPath);
    return null;
  }
};

export default decompressFile;
