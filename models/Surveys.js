const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecipientSchema = require("./Recipient.js");

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  //unserscore prefix _user indicate that it is refrenced attribute
  _user: { type: Schema.ObjectId, ref: "User" },
  dateSent: Date,
  lastResponded: Date
});

mongoose.model("surveys", surveySchema);
