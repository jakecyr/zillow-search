const { fetch } = require("./scrapers/index.js");
const cheerio = require('cheerio');

async function getSearchResults(searchString) {
    const formattedSearch = searchString.replace(/\s/g, '_');
    const url = `https://www.zillow.com/homes/${formattedSearch}_rb/`;
    const html = await fetch(url);

    return new Promise((resolve) => {
        const $ = cheerio.load(html);
        const data = [];

        $('.list-card').each((index, element) => {
            const address = $(element).find('.list-card-addr').text();
            const price = parseInt($(element).find('.list-card-price').text().slice(1).replace(/,/g, '')) || null;
            const daysOn = $(element).find('.list-card-variable-text').text();
            const imageSrc = $(element).find('img').attr('src');
            const details = [];

            $(element).find('.list-card-details li').each((index, detailElement) => {
                details.push($(detailElement).text());
            });

            data.push({ address, price, daysOn, imageSrc, details });
        });

        resolve(data);
    });
}

module.exports = {
    getSearchResults,
};
