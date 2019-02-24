const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const bodyParser = require("body-parser");
require("./models/User");
require("./services/passport");

const app = express();

//by default express do not parse payload
// from frontend to our backed thats why se use it explictly check 102 chapter
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoURI);

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app); // midnd the syntex of writing code so after the route is required it imidiatly called by app object

//if it is a production invironment
//check for chapter 112
if (process.env.NODE_ENV === "production") {
  //Express will serve our production accets
  // like our main.js and main.css file
  app.use(exress.static("client/build"));

  //Express will serve index.html file
  //if it dosnot recoganize the routes
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT);
