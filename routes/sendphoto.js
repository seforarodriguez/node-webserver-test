'use strict';

const express = require('express');
const router = express.Router();

const upload = require('multer')({dest: 'tmp/uploads'});
const fs = require('fs');
//const imgur = require('imgur');

router.get('/sendphotos', (req, res) => {
  res.render('sendphoto');
});

router.post('/sendphotos', upload.single('image'), (req, res) => {
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

module.exports = router