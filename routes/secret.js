'use strict';

const express = require('express');
const router = express.Router();

router.all('/secret', (req, res) => {
  res
  .status(403)
  .send('Access Denied');
});

module.exports = router