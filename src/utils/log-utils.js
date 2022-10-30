const dayjs = require("dayjs");
const fs = require("fs");
const getDatetoIsoString = () => {
  try {
    return dayjs().format("DD-MM-YYYY");
  } catch (error) {
    return error;
  }
};

let stream;
let filename;
let filenameindex = 1;
let count = 1;
let curDate = getDatetoIsoString();

export const debug = (preMsg, msg, requestOrResponse) => {
  if (!preMsg) {
    preMsg = "";
  }
  if (!msg) {
    msg = "";
  }
  if (!requestOrResponse) {
    requestOrResponse = "";
  }
  if (!fs.existsSync("./log/")) {
    fs.mkdirSync("./log/");
  }
  if (curDate != getDatetoIsoString()) {
    curDate = getDatetoIsoString();
    count = 0;
    filenameindex = 0;
  }
  if (count % 1000 === 0) {
    filenameindex++;
  }
  const curFilename = `./log/` + curDate + `-${filenameindex}` + "-debug.log";
  if (filename != curFilename) {
    if (stream) {
      stream.end();
    }
    stream = fs.createWriteStream(curFilename, { flags: "a" });
    filename = curFilename;
  }
  stream.write(
    `${dayjs().format(
      "DD-MM-YYYY HH:mm:ss"
    )} DEBUG    ${preMsg}   ${msg}   ${requestOrResponse}` + "\n"
  );
  count++;
};

