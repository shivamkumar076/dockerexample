const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// The connection string uses 'mongo', which will be the name of our database service in Docker Compose.
const MONGO_URI = 'mongodb://mongo:27017/mydatabase';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Define a simple schema and model
const UserSchema = new mongoose.Schema({ name: String });
const User = mongoose.model('User', UserSchema);

// Base route
app.get('/', (req, res) => {
  res.send('Hello from Node.js, Docker, and MongoDB!');
});

// Route to create a new user
app.post('/users', async (req, res) => {
  try {
    const user = new User({ name: req.body.name });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save user' });
  }
});

// Route to fetch all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});