const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");
module.exports = app => {
  app.post("/api/stripe", async (req, res) => {
    console.log("comming here");
    //becuse charge.create() returns the procmise we can use async and await here
    //we will wrap up or above handeler method wth async keyword
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      source: req.body.id,
      description: "5$ for 5 credits"
    });
    req.user.credits += 5;

    const user = await req.user.save();
    res.send(user);
  });
};
