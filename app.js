const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const pretty = require('pretty');

const url = 'https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3';

async function scrapeData() {
    try{
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const listItems = $('.plainlist ul li');
        const countries = [];
        listItems.each((idx, ele) => {
            const country = { name: '', iso3: '' };
            country.name = $(ele).children('a').text();
            country.iso3 = $(ele).children('span').text();
            countries.push(country);
        });

        console.dir(countries);

        fs.writeFile('countries.json', JSON.stringify(countries, null, 2), (err) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log('Successfully written data to file.');
        })
    } catch (err) {
        console.log(err);
    }
}

scrapeData();

// const markup = `
// <ul class="fruits">
//   <li class="fruits__mango"> Mango </li>
//   <li class="fruits__apple"> Apple </li>
// </ul>
// `;

// const $ = cheerio.load(markup);
// console.log(pretty($.html()));

// const mango = $('.fruits__mango');
// console.log(mango.html());

// const apple = $('.fruits__apple');
// console.log(apple.attr('class'));

// Loops through elements
// const listItems = $('li');
// listItems.each((idx, el) => {
//     console.log($(el).text());
// })

// Append and Prepend an element to markup
// const ul = $('ul');
// ul.append('<li>Banana</li>');
// ul.prepend('<li>Pineapple</li>');
// console.log(pretty($.html()));