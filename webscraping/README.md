# Webscraping Example

**Blog Post:** https://blog.encryptopia.dev/post/websraping

## Setup

1. Clone the repository

```bash
git clone https://github.com/Paranoia8972/examples.git
```

2. Installing dependencies

```bash
cd examples/webscraping
npm install
```

3. Create a `.env` file

```bash
BD_AUTH=brd-customer-<ACCOUNT-ID>-zone-<ZONE-NAME>:<PASSWORD>
INSTA_USERNAME=
INSTA_PASSWORD=
```

## Methods:

### Method 1:

**With Cheerio and Node-Fetch**

This method demonstrates how to create a simple web scraping API using Cheerio and Node-Fetch. The API fetches the HTML content of a given URL, parses it using Cheerio, and extracts metadata such as the title, description, and image. The extracted metadata is then returned as a JSON response. This method is useful for quickly retrieving and processing metadata from web pages.

#### Running:

```bash
node cheerio.js
```

### Method 2:

**With Puppeteer**

This method demonstrates how to create a web scraping script using Puppeteer. This is great for pages rendered using javascript in the DOM after the initial page load. The script launches a headless browser, navigates to a specified URL, and extracts all the links from the page. Each link's URL, title, and icon (if available) are collected and printed as a formatted JSON string. This method is useful for extracting structured data from web pages using a headless browser.

#### Running:

```bash
node pptr.js
```

### Method 3:

**With Puppeteer and Bright Data**

> [!WARNING]
> Automating actions on Instagram without explicit permission is against Instagram's Terms of Service. Using scripts to log in and scrape data may result in your account being flagged, restricted, or banned.

This method demonstrates how to create a web scraping script using Puppeteer with Bright Data (formerly Luminati) proxy service. The script connects to a remote browser via a WebSocket endpoint provided by Bright Data, navigates to Instagram, logs in, and extracts image URLs from a user's profile. This method is useful for scraping data from websites that require login and are protected by advanced anti-bot measures.

#### Running:

```bash
node bright_data.js
```

### Puppeteer Stealth Plugin:

The Stealth Plugin for Puppeteer helps to avoid detection by websites that try to identify and block automated browsing. It does this by applying various techniques to make the browser appear more like a regular user-operated browser. Some of the key features include:

1. **Hiding WebDriver Property**: Removes or modifies the `navigator.webdriver` property to prevent detection.
2. **Modifying User-Agent**: Changes the user-agent string to mimic a real browser.
3. **Disabling Headless Mode Detection**: Adjusts settings to make headless mode less detectable.
4. **Faking Plugins and Languages**: Adds fake plugins and languages to the browser to make it look more legitimate.
5. **Disabling Automation Flags**: Removes or modifies flags that indicate automation, such as `window.chrome` and `navigator.plugins`.
