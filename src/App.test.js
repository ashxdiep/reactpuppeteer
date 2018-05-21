const faker = require('faker');
const puppeteer = require ('puppeteer');

const person = {
  name: faker.name.firstName() + ' ' + faker.name.lastName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  message: faker.random.words()
};

describe('H1 Text', () => {

  test ('h1 loads correctly', async() =>{
    // browser is launched with puppeteer with option of headless to false
    // so we can see the browser while testing
    let browser = await puppeteer.launch({
      headless:false
    });

    //creating a new page
    let page = await browser.newPage();

    //emulating certain device metrics
    page.emulate({
      viewport: {
        width: 500,
        height: 2400
      },
      userAgent: ''
    });

    //testing with go to and tell puppeteer to hold on until selector has been
    //loaded on to the DOM
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.App-title');

    const html = await page.$eval('.App-title', e => e.innerHTML);
    expect(html).toBe('Welcome to React');

    //browser is closed
    browser.close();
  }, 16000);
});


describe ('Contact Form', ()  => {
  test('Can submit contact form', async() => {

    // launches a new browser along with config. devtools displays chrome
    // devtools and slowmo sows down puppeteer processes by specified amount of
    // milliseconds to see what is going on
    let browser = await puppeteer.launch({
      headless: false,
      devtools: true,
      slowMo: 250
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 500,
        height: 900
      },
      userAgent: ''
    });


    //users can log in
    //users can log out
    //users are redirected to login page for unauthorized view
    //nonexistent views returns a 404 page
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.contact-form');
    await page.click('input[name=fullname]');
    await page.type("input[name=fullname]", person.name);
    await page.click("input[name=email]");
    await page.type("input[name=email]", person.email);
    await page.click('textarea[name=message]');
    await page.click("input[type=checkbox]");

    await page.click("input[name=question]");

    await page.click("button[type=submit]");

    browser.close();
  }, 900000);
});
