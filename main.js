const { getElementsFromPage } = require('./scraper.js');

async function getSearchResults(searchString) {
  const formattedSearch = searchString.replace(/\s/g, '_');
  const url = `https://www.zillow.com/homes/${formattedSearch}_rb/`;

  const { elements, browser } = await getElementsFromPage(url, '.list-card');
  const items = [];

  for (const element of elements) {
    const address = await (await element.find('.list-card-addr'))?.text();
    const price = await (await element.find('.list-card-price'))?.text();
    const imageElement = await element.find('.list-card-img img');
    const src = (await imageElement?.getAttribute('src'))?.toString()?.replace('JSHandle:', '');

    if (address && price) {
      items.push({
        address,
        price,
        imageURL: src,
      });
    }
  }

  await browser.close();
  return items;
}

module.exports = {
  getSearchResults,
};
