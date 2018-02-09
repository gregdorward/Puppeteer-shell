module.exports = {
    async findLinkByText(page, text) {
        let link = (await page.$x("//a[contains(text()," + "'" + text + "'" + ")]"))[0];
        return link;
    },
    async getTextContent(page, area) {
        let textContent = await page.$eval(area, el => el.textContent);
        return textContent;
    }
  };