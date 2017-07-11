const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const port = '3000';

let targetUrl = 'https://www.petfinder.com/dog-breeds?see-all=1'
let breedReport = '';

let fetchDogBreeds = () => {
  let jsonArray = [];

  request(targetUrl, (error, response, html) => {
    if (error){ throw new Error(error) };

    $ = cheerio.load(html)
    let breed, breedDescription, breedImage;
    let jsonObject = {breed: '', breedDescription: '', breedImage: ''};

    $('.breed').each(function(i, elem){
      breed = $(this).children('a').text()
      breedDescription = $(this).children('p').text()
      breedReport += `${i}. ${breed}: ${breedDescription} \n`
      jsonObject['breed'] = breed
      jsonObject['breedDescription'] = breedDescription
      // console.log(breedReport)
      jsonArray.push(jsonObject)
    });
  });
  process.on('exit', () => {
    console.log(breedReport)
  })
};

module.exports = fetchDogBreeds();
