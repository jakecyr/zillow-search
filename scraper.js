const puppeteer = require('puppeteer');
const { ElementHandle } = require('puppeteer');

const getElementsFromPage = async (url, selector) => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    slowMo: 10,
    args: ['--disable-notifications'],
  });

  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector(selector);

  const foundElements = await page.$$(selector);

  if (!foundElements || foundElements.length === 0) {
    throw new Error('Element not found: ' + selector);
  }

  return {
    elements: foundElements.map((foundElement) => element(foundElement)),
    browser,
  };
};

/**
 * @param {ElementHandle} e
 * @returns
 */
const element = (e) => {
  return {
    getAttribute: async (attributeName) => {
      const prop = await e.getProperty(attributeName);
      return prop.toString();
    },
    text: () => e.evaluate((e) => e.textContent),
    find: async (selector) => {
      try {
        const foundElement = await e.$(selector);

        if (!foundElement) {
          throw new Error('Element not found: ' + selector);
        }

        return element(foundElement);
      } catch {
        return null;
      }
    },
    subtract: async (selector) => {
      const parentText = await e.evaluate((e) => e.textContent);
      const childElement = await e.$(selector);
      const childElementText = await childElement?.evaluate((e) => e.textContent);
      return parentText?.replace(childElementText || '', '').trim() || null;
    },
    findAll: async (selector) => {
      const elements = await e.$$(selector);
      return elements.map((curElement) => element(curElement));
    },
  };
};

module.exports = {
  getElementsFromPage,
  element,
};
