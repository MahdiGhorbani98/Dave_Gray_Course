const fs = require("fs");

if (!fs.existsSync("./new-folder")) {
  fs.mkdir("./new-folder", (err) => {
    if (err) throw err;
    console.log("Folder created");
  });
}
if (fs.existsSync("./new-folder")) {
  fs.rmdir("./new-folder", (err) => {
    if (err) throw err;
    console.log("Folder removed");
  });
}
