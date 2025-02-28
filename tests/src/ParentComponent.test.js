const puppeteer = require('puppeteer');

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto('http://localhost:6969/parent-component');
});

describe('ParentComponent', () => {

  test('Nullstack is auto imported when using inheritance', async () => {
    const element = await page.$('[data-current="ParentComponent"]');
    expect(element).toBeTruthy();
  });

  test('inner components are overridable', async () => {
    const element = await page.$('[data-current="ParentComponent"]');
    expect(element).toBeTruthy();
  });

  test('server functions are bound to the class', async () => {
    const element = await page.$('[data-parent-this="ParentComponent"]');
    expect(element).toBeTruthy();
  });

  test('server functions are bound to the class', async () => {
    const element = await page.$('[data-parent-this="ParentComponent"]');
    expect(element).toBeTruthy();
  });

  test('server functions are bound to the class in spa', async () => {
    await page.waitForSelector('[data-hydrated-parent-this="ParentComponent"]');
    const element = await page.$('[data-hydrated-parent-this="ParentComponent"]');
    expect(element).toBeTruthy();
  });

});

afterAll(async () => {
  browser.close();
});