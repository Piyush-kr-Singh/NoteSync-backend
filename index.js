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

// Schema

// bodyParser
const allowedOrigins = ['http://localhost:5173']; // Replace with your frontend origin
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

server.use(cors(corsOptions));
server.use(express.json());
server.use(morgan('default'));
server.use(express.static('public'));
server.use('/products', productRouter.router);
server.use('/users', userRouter.router);

server.listen(5000, () => {
  console.log('Server started');
});