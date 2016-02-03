'use strict';

const express = require('express');
const app = express();
//This will give an alterntive in case I dont pass in a port in terminal
const PORT = process.env.PORT || 3000;

//http.createServer((req, res) => {
  //console.log(req.method, req.url);

  //debugger;
  ////If the code is not with an actual html order this forces it to assume its html

//})

app.get('/hello', (req, res) => {
  const name = req.query.name;
  const msg =`<h1>Hello ${name}!!!!</h1>
  <h2>Goodbye ${name}</h2>`;

  console.log("query params", req.query);

  res.writeHead(200, {
    'Content-type': 'text/html'
  });

    //chunk response by character
    msg.split('').forEach((char, i) => {
      setTimeout (() => {
        res.write(char);
      }, 1000 * i);
     });

    //wait for all characters to be sent
    setTimeout (() => {
    res.end()
    }, msg.length * 1000 + 2000);
 });

app.get('/random/:min/:max', (req, res) => {
  const min = req.params.min;
  const mac = req.params.max;
  res.end(function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  });
});

app.all('*', (req, res) => {
  res
  .status(res)
  .send('Access Denied');
});

app.listen(PORT, () => {
    console.log(`Node.js server started. Listening on port ${PORT}`);
});
