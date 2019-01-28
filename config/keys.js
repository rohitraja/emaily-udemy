//keys.js figure out which file needs to be used

if (process.env.NODE_ENV === "production") {
  //we are in production- return prodtion set of keys
  module.exports = require("./prod");
} else {
  //we are in dev -> return dev set of keys
  module.exports = require("./dev");
}
