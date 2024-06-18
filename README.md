# Overview

This Node.js script utilizes the Puppeteer library to perform web scraping tasks on the "Pro Clubs Head" website. It is designed to search for a specific club and visit its details page, capturing a screenshot of the page if successful. The script handles consent pop-ups and includes basic error handling and status codes.

# Features

- Automated Browser Interaction: Uses Puppeteer to launch a headless browser and navigate through the website.
- Consent Handling: Automatically clicks the consent button if it appears.
- Search Functionality: Constructs a search URL based on a provided query and navigates to the search results page.
- Club Link Extraction: Extracts the link to the first club from the search results.
- Screenshot Capture: Takes a screenshot of the club's details page and saves it locally.
- Error Handling: Implements basic error handling and returns appropriate status codes.
- 

# Status Codes

- `200 (ok):` Successfully visited the club's details page and captured a screenshot.
- `300 (no_data):` The club's details page does not contain sufficient data.
- `400 (error):` An error occurred during the scraping process.

# Usage

To use the scraper, call the searchAndVisitClub function with a search query string. The function will navigate through the website, handle any consent pop-ups, search for the club, visit its details page, take a screenshot, and return a status code indicating the result.

```js
const { visitClub } = require('./path_to_this_script');

(async () => {
  const statusCode = await visitClub('Your Club Name');
  console.log('Status Code:', statusCode);
})();
```

# Dependencies:
Puppeteer is required to run this script. Install it using npm install puppeteer.
Error Handling: The script captures and logs errors, ensuring the browser closes gracefully even if an error occurs.
Configuration: The browser is launched with the --no-sandbox argument for better compatibility in various environments.
