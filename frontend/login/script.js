document.addEventListener("DOMContentLoaded", () => {
  window.registerUser = async () => {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await axios.post("/", {
        // Assuming same-origin, use relative URLs
        username,
        email,
        password,
      });

      const token = response.data.token;

      // Store the token securely (e.g., in an HTTP-only cookie for added security)
      document.cookie = `token=${token}; secure; samesite=strict`;

      console.log("User registered successfully. Token:", token);

      // Redirect the user or perform other actions
    } catch (error) {
      console.error("Error registering user:", error.response.data.msg);
      // Handle error (e.g., display an error message to the user)
    }
  };
});
