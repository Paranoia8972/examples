import { launch } from "puppeteer";

(async () => {
  // Launch a new browser instance
  const browser = await launch();

  // Create a new page in the browser
  const page = await browser.newPage();

  // Navigate to the specified URL
  await page.goto("https://encryptopia.dev/links");

  // Extract the links from the page
  const links = await page.evaluate(() => {
    // Select all anchor elements on the page
    const anchorElements = document.querySelectorAll("a");

    // Convert the anchor elements into an array of objects
    return Array.from(anchorElements).map((anchor) => ({
      href: anchor.href,
      title: anchor.title || anchor.textContent.trim(),
      icon: anchor.querySelector("img")
        ? anchor.querySelector("img").src
        : null,
    }));
  });

  // Print the links as a formatted JSON string
  console.log(JSON.stringify(links, null, 2));

  // Close the browser
  await browser.close();
})();
