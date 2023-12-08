document.addEventListener("DOMContentLoaded", () => {
  const registrationForm = document.getElementById("registrationForm");

  registrationForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      // Make a POST request to the backend to register the user
      const response = await axios.post("/api/users", {
        username,
        email,
        password,
      });

      // Assuming the backend returns a token upon successful registration
      const token = response.data.token;

      document.cookie = `token = ${token}; secure; samesite= strict`;

      // You can handle the token as needed (e.g., store it in localStorage for future requests)
      console.log("User registered successfully. Token:", token);

      // You may redirect the user or perform additional actions here
    } catch (error) {
      if (error.response) {
        // The request was made, and the server responded with a status code
        console.error(
          "Server responded with an error:",
          error.response.data.msg
        );
        // Handle the error (e.g., display an error message to the user)
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server");
        // Handle the error (e.g., display an error message to the user)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
        // Handle the error (e.g., display an error message to the user)
      }
    }
  });
});
