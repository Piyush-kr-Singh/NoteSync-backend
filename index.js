// require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors=require('cors');

const server = express();
const productRouter = require('./routes/product')
const userRouter = require('./routes/user')

// console.log('env',process.env.DB_PASSWORD)

//db connection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/employees');
  console.log('database connected')
}
//Schema


//bodyParser
server.use(cors());
server.use(express.json());
server.use(morgan('default'));
server.use(express.static('public'));
server.use('/products',productRouter.router);
server.use('/users',userRouter.router);





server.listen(8080, () => {
  console.log('server started');
});