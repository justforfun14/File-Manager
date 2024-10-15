const getUsername = () => {
  for (const arg of process.argv) {
    if (arg.startsWith("--username")) {
      return arg.split("=")[1];
    }
  }
  return "";
};

export default getUsername;
