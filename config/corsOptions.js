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

module.exports = corsOptions;
