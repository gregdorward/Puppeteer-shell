'use strict';

const puppeteer = require('puppeteer');
var commonMethods = require("./commonMethods");
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];
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
        const heading = await commonMethods.getTextContent(page, 'h1');
        expect(heading).toEqual('Telcome to the-internet');
    })

    it('can interact with links', async () => {
        await page.goto('http://the-internet.herokuapp.com');
        //extract the link containing the text 'status codes'
        let link = await commonMethods.findLinkByText(page, 'Status Codes');
        await link.click();
        await page.waitForNavigation();
        let pageContent = await commonMethods.getTextContent(page, 'body');
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
        await page.emulate(iPhone);
        const subheading = await commonMethods.getTextContent(page, 'h2');
       const filePath = await './tests/screenshots/testScreenshot2.png';
        await page.screenshot({
            path: filePath
        });
        await expect(subheading).toEqual('Available Examples');
    });

    it('can be stubbed to return a given response', async () => {
        await page.goto('http://the-internet.herokuapp.com');
        let link = await commonMethods.findLinkByText(page, 'Checkboxes');
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
        let textContent = await commonMethods.getTextContent(page, 'body');
        await expect(textContent).toContain('Not Found!');
    })
});