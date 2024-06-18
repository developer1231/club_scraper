const puppeteer = require("puppeteer");
const errorCodes = {
  ok: 200, // OK
  error: 400, // Error
  no_data: 300, // Not enough data
};
async function searchAndVisitClub(searchQuery) {
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();

  try {
    const searchUrl = `https://proclubshead.com/24/search/?p=gen5&c=${encodeURIComponent(
      searchQuery
    )}`;
    await page.goto(searchUrl, { waitUntil: "networkidle2" });
    try {
      const consentButtonSelector =
        "button.fc-button.fc-cta-consent.fc-primary-button";
      await page.waitForSelector(consentButtonSelector, { timeout: 5000 });
      await page.click(consentButtonSelector);
    } catch (e) {}

    await page.waitForSelector("ul.list-unstyled", { timeout: 10000 });

    const clubLink = await page.$eval("ul.list-unstyled li a", (a) => a.href);

    if (clubLink) {
      await page.goto(clubLink, { waitUntil: "networkidle2" });

      const pageTitle = await page.title();
      console.log(pageTitle);
      if (
        pageTitle ===
        "In-depth clubs, matches and players stats to EA Sports FC 24 Clubs | Pro Clubs Head"
      ) {
        return errorCodes.no_data;
      }
      // Take a screenshot
      const screenshotPath = "club_screenshot.png";
      await page.screenshot({ path: screenshotPath });

      return errorCodes.ok;
    }
  } catch (error) {
    return errorCodes.error;
  } finally {
    console.log("closed browser");
    await browser.close();
  }
}

module.exports = {
  visitClub: searchAndVisitClub,
};
