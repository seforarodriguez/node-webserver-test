'use strict';

const http = require('http');
//This will give an alterntive in case I dont pass in a port in terminal
const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  console.log(req.method, req.url);

  debugger;

  //If the code is not with an actual html order this forces it to assume its html

  res.writeHead(200, {
    'Content-type': 'text/html'
  });

  if (req.url === '/hello'){
    const msg = '<h1>Hello World!!</h1>';

    msg.split('').forEach((char, i) => {
      setTimeout (() => {
        res.write(char);
      }, 1000 * i);
     });


    setInterval (() => {
    res.end();
    }, 20000);

  } else if (req.url === '/random') {
    res.end(Math.random().toString());
  } else {
    res.writeHead(403);
    res.end('<h1>Access Denied!!</h1>');
  };

  //If the code has correct html code then it works without the writeHead code
  //res.end('<<h1>Hello World!!</h1>');

}).listen(PORT, () => {
    console.log(`Node.js server started. Listening on port ${PORT}`);
});
