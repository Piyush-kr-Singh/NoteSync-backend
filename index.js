const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios'); // Import the axios library

const server = express();
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');

// db connection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://sujal:mEWyNJUUc3ZgQQkF@notesync.tykgj0w.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Database connected');
}

// Set up CORS options
const corsOptions = {
  origin: '*',
  methods: 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
};

// Apply CORS middleware
server.use(cors(corsOptions));

// Other middleware
server.use(express.json());
server.use(morgan('default'));
server.use(express.static('public'));

// Define routes
server.use('/products', productRouter.router);
server.use('/users', userRouter.router);

server.listen(5000, () => {
  console.log('Server started');
});

// Define an async function to get the IP address
async function getIpAddress() {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    const ip = response.data.ip;
    console.log('Your IP address is:', ip);
  } catch (error) {
    console.error('Error fetching IP address:', error);
  }
}

// Call the async function to get the IP address
getIpAddress();
