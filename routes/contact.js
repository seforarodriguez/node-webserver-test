'use strict';

const express = require('express');
const router = express.Router();

const Contacts = require('../models/contact');

router.get('/contact', (req, res) => {
  res.render('contact');
});

router.post('/contact', (req, res) => {

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

module.exports = router