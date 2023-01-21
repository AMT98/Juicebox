require('dotenv').config();
const cors = require('cors');

const PORT = 3500;
const express = require('express');
const server = express();
const { client } = require('./db');

//middleware
server.use(cors());

client.connect();


const morgan = require('morgan');
server.use(morgan('dev'));

server.use(express.json())

const apiRouter = require('./api');
server.use('/api', apiRouter);



server.use((req, res, next) => {
  console.log("<---- Body Logger START ---->");
  console.log(req.body);
  console.log("<---- Body Logger END ---->");
  
  next();
});

server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});