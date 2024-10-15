import getFullPath from "./getFullPath.mjs";

const changeDirectory = async (targetDir, currentDir) => {
  return await getFullPath(targetDir, currentDir);
};

export default changeDirectory;
