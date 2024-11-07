// Node. js runs on a server - not in a browser (backend not frontend)

// The console (in browser inspect) is the terminal window
console.log("Listening on port 3000");

// We have global object instead of window object
console.log(global);

// CommonJs module instead of ES6 modules
const os = require("os");
const path = require("path");
const math = require("./math");
// OR
const { add, subtract } = require("./math");

console.log("=============== Math Module ==========================");
console.log(math.add(4, 2));
console.log(subtract(4, 2));
console.log("====================================");

console.log(os.type());
console.log(os.version());
console.log(os.homedir());

console.log(__dirname);
console.log(__filename);

console.log("================ Path Module ====================");
console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));
console.log(path.parse(__filename));
console.log("====================================");
