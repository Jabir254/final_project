const express = require('express');
const connectDB = require('./utils/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());



// Routes
// Add your routes here. Example:
// app.use('/api/users', require('./routers/userRouter'));
app.use('/', require('../backend/routes'));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
