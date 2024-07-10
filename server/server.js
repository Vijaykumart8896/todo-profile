const express = require("express");
const app = express();
const cors = require("cors");
const { PORT } = require("./config/index");
require("colors");
const connectDb = require("./mongoDB/db");
const userRoute = require("./routes/userRoute");
const profileRoute = require("./routes/profileRoute");
// ================================ middleware injecting ========================
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  try {
    return res.status(200).json({
      message: "Hello VIJAY",
    });
  } catch (error) {
    console.error("Something is Broken💔");
    console.error(error);
  }
});

// user router
app.use(userRoute);
app.use(profileRoute);

// ============================== error handling =============================
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// =============================Server creation================================
const StartServer = async () => {
  try {
    app.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`Server Listening PORT number is ${PORT}`.red);
      connectDb();
    });
  } catch (error) {
    console.error(error);
  }
};
StartServer();
