'use strict';

const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose')


const routes = require('./routes/routes');
const api = require('./routes/api');

//This will give an alterntive in case I dont pass in a port in terminal
const PORT = process.env.PORT || 3000;
const MONGODB_URL = 'mongodb://localhost:27017/WEBSERVER';


app.set('view engine', 'jade');
app.locals.title = "The Super Cool App";

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.use(routes);
app.use(api);

mongoose.connect(MONGODB_URL);

 mongoose.connection.on('open', () => {
  console.log('MONGO OPEN!');
  
  app.listen(PORT, () => {
      console.log(`Node.js server started. Listening on port ${PORT}`);
  });
});

module.export = app;






