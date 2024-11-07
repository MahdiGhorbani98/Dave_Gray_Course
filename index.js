const fs = require("fs");
const path = require("path");

// ?instead of ./files/news.txt we can write: path.join(__dirname, "files", "news.txt")
fs.readFile("./files/new.txt", "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

console.log("Hello...");

fs.writeFile(
  path.join(__dirname, "files", "writeFile.txt"),
  "Write File Test",

  (err) => {
    if (err) throw err;
    console.log("WRITE DONE!");

    fs.rename(
      path.join(__dirname, "files", "writeFile.txt"),
      path.join(__dirname, "files", "writeFileRenamed.txt"),

      (err) => {
        if (err) throw err;
        console.log("RENAME DONE!");
      }
    );
  }
);

fs.appendFile(
  path.join(__dirname, "files", "appendFile.txt"),
  "Append File Test 2",

  (err) => {
    if (err) throw err;
    console.log("WRITE DONE!");
  }
);

// exit on uncaught exception
process.on("uncaughtException", (err) => {
  console.error(`Error: ${err}`);
  process.exit(1);
});
