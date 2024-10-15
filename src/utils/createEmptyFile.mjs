import { writeFile } from "fs/promises";
import path from "path";

const createEmptyFile = async (fileName, currentDir) => {
  try {
    await writeFile(path.join(currentDir, fileName), "");

    console.log("File created successfully!");
  } catch {
    console.log("Unable to create file: " + fileName);
    return null;
  }
};

export default createEmptyFile;
