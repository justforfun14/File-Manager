import path from "path";
import { access } from "fs/promises";

const getFullPath = async (targetDir, currentDir) => {
  if (!targetDir) {
    console.log("Please specify the directory to change to.");
    return null;
  }

  targetDir = path.normalize(targetDir);

  const targetPath = path.isAbsolute(targetDir)
    ? targetDir
    : path.join(currentDir, targetDir);
  try {
    await access(targetPath);

    return targetPath;
  } catch {
    console.log("Operation failed");
    return null;
  }
};

export default getFullPath;
