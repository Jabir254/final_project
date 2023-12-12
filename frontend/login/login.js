document.addEventListener('DOMContentLoaded', () => {
  window.loginUser = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await axios.post('/login', {
        email,
        password,
      });

      const token = response.data.token;

      // Store the token securely (e.g., in an HTTP-only cookie for added security)
      document.cookie = `token=${token}; secure; samesite=strict`;

      console.log('User logged in successfully. Token:', token);

      // Redirect the user to the survey page
      window.location.href = '/survey.html'; // Change this to the actual URL of your survey page
    } catch (error) {
      console.error('Error logging in:', error.response.data.msg);
      // Handle error (e.g., display an error message to the user)
    }
  };
});
