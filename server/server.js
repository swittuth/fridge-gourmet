const express = require("express");
const queryRouter = require("./routers/queryRoute.js");
const authRouter = require("./routers/authRoute.js");
const cors = require("cors");
const app = express();
const keys = require("./services/keys");
const passport = require("passport");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const passportSetup = require("./services/passport_setup");
const cookieSession = require("cookie-session");

const PORT = 3001;

app.use(express.json());
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// end point that starts with '/'
app.use("/", queryRouter);

app.use("/auth", authRouter);

app.use((req, res) => res.status(404).send("Invalid endpoint"));

app.use((err, req, res, next) => {
  const defaultError = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultError, err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

module.exports = app;
