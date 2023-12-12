document.addEventListener("DOMContentLoaded", () => {
  // Function to create a new survey
  window.createSurvey = async () => {
    const title = document.getElementById("title").value;
    const question1 = document.getElementById("question1").value;
    const options1 = document.getElementById("options1").value.split(",");

    // You can add more questions as needed

    try {
      // Assuming you have a function to get the user's authentication token
      const token = getAuthToken();

      // Make a POST request to create a new survey
      const response = await axios.post(
        "create",
        {
          title,
          questions: [
            { questionText: question1, options: options1 },
            // Add more questions here as needed
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Survey created successfully:", response.data);

      // You can reload the survey list or perform other actions
      getSurveys();
    } catch (error) {
      console.error("Error creating survey:", error.response.data.msg);
      // Handle error (e.g., display an error message to the user)
    }
  };

  // Function to retrieve and display existing surveys
  window.getSurveys = async () => {
    try {
      // Make a GET request to retrieve all surveys
      const response = await axios.get("/surveylist");

      // Display the surveys in a list
      const surveyList = document.getElementById("surveyLists");
      surveyList.innerHTML = "";

      response.data.forEach((survey) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Survey Title: ${survey.title}, Creator: ${survey.creator.username}`;
        surveyList.appendChild(listItem);
      });
    } catch (error) {
      console.error("Error retrieving surveys:", error.response.data.msg);
      // Handle error (e.g., display an error message to the user)
    }
  };

  // Call the getSurveys function to display existing surveys on page load
  getSurveys();
});

// Function to get the user's authentication token (replace with your actual implementation)
function getAuthToken() {
  // Implement your logic to retrieve the authentication token
  // from cookies, local storage, or another secure method.
  // Return the token.
  return "example-auth-token";
}
