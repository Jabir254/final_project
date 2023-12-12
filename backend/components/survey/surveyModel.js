const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [
    { questionText: { type: String, required: true }, options: [String] },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Survey = mongoose.model("Survey", surveySchema);
module.exports = Survey;
