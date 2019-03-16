const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin.js");
const requireCredits = require("../middlewares/requireCredits.js");
const Surveys = mongoose.model("surveys");
const Mailer = require("../services/Mailer");
const serveyTemplate = require("../services/emailTemplates/surveyTemplate");
module.exports = app => {
  app.get("/api/surveys/thanks", (req, res) => {
    res.send("Thanks for taking this survey");
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, body, subject, recipients } = req.body;

    const survey = new Surveys({
      title,
      body,
      subject,
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    //good place to start our mailer
    const mailer = new Mailer(survey, serveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      console.log("[Error: ]", err);
      res.status(422).send(err);
    }
  });
};
