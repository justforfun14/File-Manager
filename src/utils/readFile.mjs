import { createReadStream } from "fs";
import getFullPath from "./getFullPath.mjs";

const readFile = async (targetDir, currentDir) => {
  try {
    const tempPath = await getFullPath(targetDir, currentDir);

    if (!tempPath) {
      throw new Error();
    }

    const file = await new Promise((res, rej) => {
      const file = createReadStream(tempPath, { encoding: "utf-8" });
      let fileData = "";

      file.on("data", (chunk) => {
        fileData += chunk;
      });

      file.on("end", () => {
        res(fileData);
      });

      file.on("error", (e) => {
        rej(e);
      });
    });

    console.log(file);
  } catch {
    console.log("Unable to read file: " + targetDir);
    return null;
  }
};

export default readFile;
