'use strict';

const express = require('express');
const router = express.Router();

router.get('/random/:min/:max', (req, res) => {
  const min = req.params.min;
  const mac = req.params.max;
  res.end(function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  });
});

module.exports = router