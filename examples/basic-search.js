const { getSearchResults } = require('../main');

runSearch();

async function runSearch() {
    const results = await getSearchResults('Shelton CT');
    console.log(results);
}
