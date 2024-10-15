import os from "os";

const getOSInfo = (ar) => {
  const arg = ar.toString().replace("--", "");
  if (arg === "EOL") {
    console.log(JSON.stringify(os.EOL));
  }

  if (arg === "cpus") {
    const cpus = os.cpus();
    cpus.forEach((item) => {
      item.model = item.model.trim();
      delete item.times;
    });

    console.table(cpus);
  }

  if (arg === "homedir") {
    console.log(os.homedir());
  }

  if (arg === "username") {
    console.log(os.userInfo().username);
  }

  if (arg === "architecture") {
    console.log(os.arch());
  }
};

export default getOSInfo;
