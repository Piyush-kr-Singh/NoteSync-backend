const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const server = express();
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');

// Set up CORS to allow requests from your frontend URL
server.use(cors({
  origin: 'https://note-sync-backend-p8aaq7yaw-piyush-kr-singh.vercel.app', // Remove the trailing slash
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// Database connection
main().catch(err => console.log(err));

async function main() {
  // Replace the MongoDB URL with your online database URL
  await mongoose.connect('mongodb+srv://sujal:mEWyNJUUc3ZgQQkF@notesync.tykgj0w.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Database connected');
}

server.use(express.json());
server.use(morgan('default'));
server.use(express.static('public'));
server.use('/products', productRouter.router);
server.use('/users', userRouter.router);

const PORT = process.env.PORT || 8080; // Use process.env.PORT if available

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
