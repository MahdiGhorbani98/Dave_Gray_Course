const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

// built-in middleware to handle urlencoded data
// in other words, form data:
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//serve static files
app.use(express.static(path.join(__dirname, "/public")));

app.get(`^/$|/index(.html)?`, (req, res) => {
  res.sendFile("./views/index.html", { root: __dirname });
});
app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});
app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html"); // 302 by default
});

app.get(
  `/hello(.html)?`,
  (req, res, next) => {
    console.log("attempted to load hello.html");
    next(); // call next function in a chain
  },
  // this function
  (req, res) => {
    res.send("Hello World!");
  }
);

const one = (req, res, next) => {
  console.log("one");
  next();
};

const two = (req, res, next) => {
  console.log("two");
  next();
};

const three = (req, res) => {
  console.log("three");
  res.send("Finished!");
};

app.get("/chain(.html)?", [one, two, three]);

app.get(`/*`, (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
