const fetch = require('node-fetch');
const cheerio = require('cheerio');
const moment = require('moment');

/**
 * Utilizes the fact that Singularity Hub formats article links
 * to have YYYY/MM/DD in their titles
 * @param  Array linkStore Array that links will be added to
 * @return Promise           Returns promise so that response can resolve
 */
const scrapeSingularityHub = linkStore => {
  // Scrapes Singularity Hub
  const url = 'https://www.singularityhub.com'
  // request a url
  // load the result into cheerio (parses it)
  return fetch(url)
  .then(response => response.text())
  .then(text => {
    const $ = cheerio.load(text);
    const links = $('a');

    // articles have YYYY/MM/DD in the href, so find the most recent week
    // [for testing purposes, using month only to start]
    const today = moment().format('YYYY/MM');

    links.each(function (i, el) {
      const href = $(this).attr('href');
      if (href && href.includes(today)) {
        linkStore.push(href);
      }
    });

  })
};

module.exports = scrapeSingularityHub;
