const express = require("express");
const router = express.Router();
const Survey = require("../components/survey/surveyModel");
const authentication = require("../components/auth/userAuthentication");

//@route Post
//create a new survey
//@access Private(require authentication)
router.post("/create", async (req, res) => {
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

// @route   GET /api/surveys
// @desc    Get all surveys
// @access  Public
router.get("/surveylist", async (req, res) => {
  try {
    const surveys = await Survey.find().populate("creator", "username"); // Populate creator field with username
    res.json(surveys);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET /api/surveys/:id
// @desc    Get a specific survey by ID
// @access  Public
router.get("surveylist/:id", async (req, res) => {
  const surveyId = req.params.id;

  try {
    const survey = await Survey.findById(surveyId).populate(
      "creator",
      "username"
    ); // Populate creator field with username

    if (!survey) {
      return res.status(404).json({ msg: "Survey not found" });
    }

    res.json(survey);
  } catch (error) {
    console.error(error.message);

    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Survey not found" });
    }

    res.status(500).send("Server Error");
  }
});

module.exports = router;
