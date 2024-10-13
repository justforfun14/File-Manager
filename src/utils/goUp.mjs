import path from "path";

const goUp = (currentDirectory) => {
  return path.dirname(currentDirectory);
};

export default goUp;
