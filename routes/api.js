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

app.post('/api', (req, res) => {
  const obj = _.mapValues(req.body, val => val.toUpperCase());

  const caps = new Allcaps(obj);

  caps.save((err, result) => {
    if (err) throw err;

    res.send(result);
  });
});


app.get('/api/weather', (req, res) => {
  const API_KEY = '5d5ee61ef25ca388f69b39bf5c31e950'
  const url = `https://api.forecast.io/forecast/${API_KEY}/7.8267,-122.423`
  request.get(url, (err, response, body) => {
    if(err) throw err;

		res.send(JSON.parse(body));
	});
});

app.get('/api/news', (req, res) => {
  News.findOne().sort('-_id').exec((err, doc) => {

    if (doc) {
      const FIFTEEN_MINUTES_IN_MS = 15 * 60 * 1000;
      const diff = new Date() - doc._id.getTimestamp() - FIFTEEN_MINUTES_IN_MS;
      const lessThan15MinutesAgo = diff < 0;

      if (lessThan15MinutesAgo) {
        res.send(doc);
        return;
      }
    }

    const url = 'http://cnn.com';

    request.get(url, (err, response, html) => {
      if (err) throw err;

      const news = [];
      const $ = cheerio.load(html);

      const $bannerText = $('.banner-text');

      news.push({
        title: $bannerText.text(),
        url: url + $bannerText.closest('a').attr('href')
      });

      const $cdHeadline = $('.cd__headline');

      _.range(1, 12).forEach(i => {
        const $headline = $cdHeadline.eq(i);

        news.push({
          title: $headline.text(),
          url: url + $headline.find('a').attr('href')
        });
      });

      const obj = new News({top: news})

      obj.save((err, _news) => {
        if (err) throw err

        res.send(news);
      })
    });
  });
});
module.exports = app