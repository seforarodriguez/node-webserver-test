'use strict';

const express = require('express');
const app = express.Router();

const upload = require('multer')({dest: 'tmp/uploads'});
const request = require('request');
const _ = require('lodash');
const cheerio = require('cheerio');

// we need the fs module for moving the uploaded files
const fs = require('fs');

const News = require('../models/news');
const Allcaps = require('../models/allcaps');
const Contacts = require('../models/contact');

app.get('/', (req, res) => {
  News.findOne().sort('-_id').exec((err, doc) => {
    if(err) throw err;

    doc = doc || {top: ''};

      console.log('doc',doc);

    res.render('index', {
      date: new Date(),
      doc: doc.top[0] 
    });
  });
});


app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/contact', (req, res) => {

  const obj = new Contact({
    name: req.body.name,
    email:req.body.email,
    message:req.body.message
  });


  obj.save(function(err, newObj) {
    if(err) throw err;
    
    console.log(newObj);
    res.render('contact_answer', {
      obj: obj
    }); 
  })
});

app.get('/sendphotos', (req, res) => {
  res.render('sendphoto');
});

app.post('/sendphotos', upload.single('image'), (req, res) => {
  console.log(req.body, req.file);
   // get the temporary location of the file
  var tmp_path = req.file.path;
    // set where the file should actually exists - in this case it is in the "images" directory
  var target_path = req.file.path + path.extname(req.file.originalname);
    // move the file from the temporary location to the intended location
  fs.rename(tmp_path, target_path, function(err) {
    if (err) throw err;
        // delete the temporary file,
        // so that the explicitly set temporary upload dir does not get filled with unwanted files
    fs.unlink(tmp_path, function() {
    });
  // A single images
    imgur.uploadFile(req.file.path)
     .then(function (json) {
       console.log(json.data.link);
     })
     .catch(function (err) {
       console.error(err.message);
     });
    res.send('<h1>Thanks for sending your photo</h1>');
  });
});

app.get('/hello', (req, res) => {
  const name = req.query.name;
  const msg = `<h1>Hello ${name}!!!!</h1>
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

app.all('/secret', (req, res) => {
  res
  .status(403)
  .send('Access Denied');
});

module.exports = app
