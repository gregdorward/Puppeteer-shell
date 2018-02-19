# Puppeteer-shell
The shell of a Puppeteer/Jest test suite

- git clone <this repo>
  
- npm install (to install dependencies)
  
To run the tests, navigate to the directory and use the 'npm test' command

To run the tests headlessly, update the following line before running the 'npm test' command again:

'browser = await puppeteer.launch({headless: false});' >> 'browser = await puppeteer.launch();'

If you're having trouble running the tests, make sure your installed version of node is up to date. If not, run the command nvm install NEW_VERSION --reinstall-packages-from=OLD_VERSION
