# Puppeteer-shell
The shell of a Puppeteer/Jest test suite

To run the tests, navigate to the directory and use the 'npm test' command

To run the tests headlessly, update the following line before running the 'npm test' command again:

'browser = await puppeteer.launch({headless: false});' >> 'browser = await puppeteer.launch();'
