'use strict';

const puppeteer = require('puppeteer');
let page;
let browser;

beforeAll(async () => {
    browser = await puppeteer.launch({headless: false});
    page = await browser.newPage();
});
afterAll(() => {
     browser.close();
});

describe('basic example UI tests', async () => {

    it('can assert on elements, such as the page title', async () => {
        await page.goto('http://the-internet.herokuapp.com');
        const title = await page.title();
        await expect(title).toBe('The Internet');
    });

    //This is a failing test
    it('has the correct page heading - example of a failing test', async () => {
        await page.goto('http://the-internet.herokuapp.com');
        //extract the heading text from the h1 header element
        const heading = await page.$eval('h1', el => el.textContent);
        expect(heading).toEqual('Telcome to the-internet');
    })

    it('can interact with links', async () => {
        await page.goto('http://the-internet.herokuapp.com');
        //extract the link containing the text 'status codes'
        const link = (await page.$x("//a[contains(text(), 'Status Codes')]"))[0];
        await link.click();
        await page.waitForNavigation();
        let pageContent = await page.$eval('body', el => el.textContent);
        console.log(pageContent);
        //check that the page displays all of the following codes
        await expect(pageContent).toContain
            (
            '200' &&
            '301' &&
            '404' &&
            '500'
            );
    })
    
    it('can output screenshots, even in headless mode', async () => {
        await page.goto('http://the-internet.herokuapp.com');
        await page.setViewport({
            width: 320,
            height: 800
        });
        const subheading = await page.$eval('h2', el => el.textContent);
       const filePath = await './tests/screenshots/testScreenshot2.png';
        await page.screenshot({
            path: filePath
        });
        await expect(subheading).toEqual('Available Examples');
    });

    it('can be stubbed to return a given response', async () => {
        await page.goto('http://the-internet.herokuapp.com');
        const link = (await page.$x("//a[contains(text(), 'Status Codes')]"))[0];
        await page.setRequestInterception(true);
        await link.click();
        await page.on('request', request => {
            request.respond({
                status: 404,
                contentType: 'text/plain',
                body: 'Not Found!'
            });
        });
        await page.waitForNavigation();
        let pageContent = await page.$eval('body', el => el.textContent);
        await expect(pageContent).toContain('Not Found!');
    })
});
