/* eslint-disable no-undef */
const express = require("express");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler.js");
const cors = require("cors");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

// ? app.use() is a middleware function

// Custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
const whitelist = [
  "https://khoneko.ir",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
  "http://localhost",
  "http://127.0.0.1",
];
const corsOptions = {
  origin: (origin, callback) => {
    console.log("Request Origin:", origin);
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS!"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Middleware for parsing form data and JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "/public")));

// Routes
app.get(`^/$|/index(.html)?`, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});
app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html");
});

app.get(
  `/hello(.html)?`,
  (req, res, next) => {
    console.log("Attempted to load hello.html");
    next();
  },
  (req, res) => {
    res.send("Hello World!");
  }
);

// Chain route
app.get("/chain(.html)?", [
  (req, res, next) => {
    console.log("one");
    next();
  },
  (req, res, next) => {
    console.log("two");
    next();
  },
  (req, res) => {
    console.log("three");
    res.send("Finished!");
  },
]);

// Catch-all 404
app.all(`*`, (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else res.type("txt").send("404 Not Found");
});

// General error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
