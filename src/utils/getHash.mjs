import getFullPath from "./getFullPath.mjs";
import crypto from "crypto";
import { createReadStream } from "node:fs";

const getHash = async (pathToFile, currentDir) => {
  try {
    const tempPath = await getFullPath(pathToFile, currentDir);

    if (!tempPath) {
      throw new Error();
    }
    await new Promise((res, rej) => {
      const hash = crypto.createHash("sha256");
      const rs = createReadStream(tempPath);
      rs.on("data", (chunk) => hash.update(chunk));
      rs.on("end", () => {
        console.log(hash.digest("hex"));
        res();
      });

      rs.on("error", rej);
    });
  } catch {
    console.log("Unable to get hash: " + pathToFile);
    return null;
  }
};

export default getHash;
