const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

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

// Define the allowed origins for CORS
const allowedOrigins = [
  'https://6536940ed17584330ad6504e--iridescent-douhua-044a68.netlify.app',
  // Add more origins if needed
];

// Set up CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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
