const express = require('express');
const fs = require('fs');

const app = express();

const scrapeSingularityHub = require('./scrapers/singularity_hub');

app.get('/scrape', (req, res) => {
  const links = [];

  scrapeSingularityHub(links)
  .then(() => {
    console.log('LINKS', links);
    res.sendStatus(200);
  });

});

app.listen('8000', () => {
  console.log('Magic happens on port 8000!');
});
