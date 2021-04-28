const puppeteer = require('puppeteer');

let browser;

beforeAll(async () => {
  browser = await puppeteer.launch();
});

describe('RenderableComponent', () => {

  let page;

  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:6969/renderable-component');
  });

  test('elements are being rendered', async () => {
    const element = await page.$('.RenderableComponent');
    expect(element).toBeTruthy();
  });

  test('elements to accept normal html attributes', async () => {
    const element = await page.$('label[for="input"]');
    expect(element).toBeTruthy();
  });

  test('elements accept boolean attributes', async () => {
    const element = await page.$('button[disabled]');
    expect(element).toBeTruthy();
  });

  test('false boolean attributes are not rendered', async () => {
    const element = await page.$('.conditionally-disabled[disabled]');
    expect(element).toBeFalsy();
  });

  test('inner components are being rendered', async () => {
    const element = await page.$('.InnerComponent');
    expect(element).toBeTruthy();
  });

  test('inner components can be nested', async () => {
    const element = await page.$('[data-nested]');
    expect(element).toBeTruthy();
  });

  test('lists are being rendered', async () => {
    const element = await page.$$('li');
    expect(element.length).toBe(6);
  });

  test('elements are being conditionally hidden', async () => {
    const element = await page.$('.condition');
    expect(element).toBeFalsy();
  });

  test('elements accept an html attribute', async () => {
    const element = await page.$('a[href="/"]');
    expect(element).toBeTruthy();
  });

  test('children are being rendered', async () => {
    const element = await page.$('.children');
    expect(element).toBeTruthy();
  });

  test('head tag child elements are rendered in the head', async () => {
    const element = await page.$('head [as="fetch"]');
    expect(element).toBeTruthy();
  });

  test('head tag child elements are not rendered in the body', async () => {
    const element = await page.$('body [as="fetch"]');
    expect(element).toBeFalsy();
  });

  test('element tag is being conditionally rendered', async () => {
    const element = await page.$('span.element');
    expect(element).toBeTruthy();
  });

  test('headless components are allocated with a comment', async () => {
    const type = await page.$eval('.RenderableComponent', (element) => element.childNodes[0].nodeType);
    expect(type).toBe(8);
  });

  test('attributes with object values should not be rendered', async () => {
    const element = await page.$('[data-object]');
    expect(element).toBeFalsy();
  });

  test('attributes with function values should not be rendered', async () => {
    const element = await page.$('[data-function]');
    expect(element).toBeFalsy();
  });

  test('svg component with showing-svg class should be rendered', async () => {
    const element = await page.$('.showing-svg');
    expect(element).toBeTruthy();
  })

  test('svg component with hidden-svg class should not be rendered', async () => {
    const element = await page.$('.hidden-svg');
    expect(element).toBeFalsy();
  })

});

describe('RenderableComponent ?showSVG=true', () => {
  let page;

  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:6969/renderable-component');
    await page.click('.show-svg');
    await page.waitForSelector('svg.hidden-svg');
  });

  test('svg component with hidden-svg class should be rendered', async () => {
    const element = await page.$('.hidden-svg');
    expect(element).toBeTruthy();
  })

  test('svg component with showing-svg class should not be rendered', async () => {
    const element = await page.$('.showing-svg');
    expect(element).toBeFalsy();
  })
})


describe('RenderableComponent ?condition=true', () => {

  let page;

  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:6969/renderable-component');
    await page.click('.true-condition');
    await page.waitForSelector('[data-condition]');
  });

  test('boolean attributes that have a true value should be empty', async () => {
    const value = await page.$eval('[data-condition]', (element) => element.getAttribute('data-condition'));
    expect(value).toBeFalsy();
  });

  test('elements are being conditionally rendered', async () => {
    const element = await page.$('.condition');
    expect(element).toBeTruthy();
  });

  test('true boolean attributes are rendered', async () => {
    const element = await page.$('.conditionally-disabled[disabled]');
    expect(element).toBeTruthy();
  });

  test('element tag is being conditionally updated', async () => {
    const element = await page.$('div.element');
    expect(element).toBeTruthy();
  });

});

describe('RenderableComponent ?shortList=true', () => {

  let page;

  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:6969/renderable-component');
    await page.click('.short-list');
    await page.waitForSelector('[data-short-list]');
  });

  test('lists are being updated', async () => {
    const element = await page.$$('li');
    expect(element.length).toBe(3);
  });

});

afterAll(async () => {
  browser.close();
});