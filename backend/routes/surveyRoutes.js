const express = require("express");
const router = express.Router();
const Survey = require("../components/survey/surveyModel");
const authentication = require("../components/auth/userAuthentication");

//@route Post
//create a new survey
//@access Private(require authentication)
router.post("/", async (req, res) => {
  const { title, questions } = req.body;

  try {
    const creator = req.user.id;
    const newSurvey = new Survey({
      title,
      questions,
      creator,
    });

    const survey = await newSurvey.save();
    res.status(201).json(survey);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
