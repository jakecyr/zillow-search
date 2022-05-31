const { getSearchResults } = require('../main');

getSearchResults('Shelton CT').then((results) => {
  console.log(results);
});
