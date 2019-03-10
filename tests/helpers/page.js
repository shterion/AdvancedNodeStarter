const puppeteer = require("puppeteer");

class CustomPage {
  static async build() {
    const browser = await puppeteer.launch({
      headless: false
    });

    const page = browser.newPage();
    const customPage = new CustomPage(page);
    return new Proxy(customPage, {
      get: function(target, property) {
        return target[property] || page[property] | browser[property];
      }
    });
  }

  constructor(page) {
    this.page = page;
  }
}

module.exports = CustomPage;
