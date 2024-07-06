const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const qrouter = require("./routes/quizzes")
const Quiz = require('./models/Quiz');

const app = express();
const port = 5000;

//XFMt2mHTk2wZmkKm

// CORS options
const corsOptions = {
  origin: 'http://localhost:3000',  // Allow requests from this origin
  credentials: true,                // Allow sending cookies and credentials
};

// Use CORS middleware with options
app.use(cors(corsOptions));
  
    
// Connect to MongoDB
mongoose.connect('mongodb+srv://dharshini:XFMt2mHTk2wZmkKm@cluster0.ydjnelx.mongodb.net/Quiz')
  .then(() => {
    console.log(' Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  }); 
  
// Middleware to parse JSON bodies 
app.use(express.json());

// Example route to fetch quizzes
app.get('/allquiz',async (req, res) => {
  // Simulated data for example
  const quizzes = await Quiz.find();
  console.log(quizzes)
  // const quizzes = [
  //   { _id: '1', title: 'Quiz 1' },
  //   { _id: '2', title: 'Quiz 2' },
  // ];
  res.json(quizzes);
});   
 
app.use("/quiz",qrouter)
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
          