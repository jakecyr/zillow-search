# Zillow Search

**NOT AFFILIATED WITH ZILLOW. PERSONAL PROJECT FOR LEARNING PURPOSES**

Simple package to load search results from Zillow given a search term

```javascript
const ZillowSearch = require('zillow-search');
const results = await ZillowSearch.getSearchResults('New York City');

console.log(results);

/*
  [
      {
        address: '13 Birch St, New York, NY',
        price: 389900,
        daysOn: '15 days on Zillow',
        imageSrc: 'https://photos.zillowstatic.com/p_e/ISrpwfy6vq8e0i1000000000.jpg',
        details: [ '4 bds', '3 ba', '1,984 sqft' ]
    },
    ....
  ]
*/
```
