import puppeteer from "puppeteer-core";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

// Stealth plugin for extra securitywa
puppeteer.use(StealthPlugin());

//TODO: Set username of the Instagram account to scrape
const username = "onthepixel_net";

async function run() {
  let browser;

  try {
    //TODO: Add the required credentials
    browser = await puppeteer.connect({
      browserWSEndpoint: `wss://${process.env.BD_AUTH}@brd.superproxy.io:9222`, // Adjust to your Proxy
    });

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(2 * 60 * 1000);

    page.goto("https://www.instagram.com/accounts/login/?hl=en", {
      waitUntil: "domcontentloaded",
    });
    console.log("Page loaded");

    // Accept cookies
    await page.waitForSelector("button._a9--._ap36._a9_0");
    await page.click("button._a9--._ap36._a9_0");

    await new Promise((resolve) => setTimeout(resolve, 3000));
    await page.screenshot({ path: "1.png" });
    console.log("Cookies accepted");

    // Enter username and password
    await page.waitForSelector("input[name='username']");
    await page.type("input[name='username']", `${process.env.INSTA_USERNAME}`);

    await page.waitForSelector("input[name='password']");
    await page.type("input[name='password']", `${process.env.INSTA_PASSWORD}`);
    await page.screenshot({ path: "2.png" });
    console.log("Username and password entered");

    // Click on the login button
    await page.waitForSelector("button[type='submit']");
    await page.click("button[type='submit']");

    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log("Logged in");

    // Go to the user's profile
    await page.goto(`https://www.instagram.com/${username}/`);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log("User's profile loaded");
    await page.screenshot({ path: "3.png" });

    // Extract image URLs from the specified div elements
    const imageUrls = await page.evaluate(() => {
      const divs = document.querySelectorAll(
        "div.x1lliihq.x1n2onr6.xh8yej3.x4gyw5p.xfllauq.xo2y696.x11i5rnm.x2pgyrj"
      );
      const urls = [];
      divs.forEach((div) => {
        const img = div.querySelector("img");
        if (img) {
          urls.push(img.src);
        }
      });
      return urls;
    });

    // Function to download an image
    const downloadImage = (url, filepath) => {
      return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        https
          .get(url, (response) => {
            response.pipe(file);
            file.on("finish", () => {
              file.close(resolve);
            });
          })
          .on("error", (err) => {
            fs.unlink(filepath);
            reject(err.message);
          });
      });
    };

    // Download each image
    for (let i = 0; i < imageUrls.length; i++) {
      const url = imageUrls[i];
      const filepath = `image${i + 1}.jpg`;
      await downloadImage(url, filepath);
      console.log(`Downloaded ${filepath}`);
    }
  } catch (e) {
    console.error("Scrape failed:", e);
  } finally {
    await browser?.close();
  }
}

run();
