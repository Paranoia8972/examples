import express from "express";
import fetch from "node-fetch";
import cheerio from "cheerio";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/meta", async (req, res) => {
  let { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL param is required" });
  }

  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }

  try {
    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body);

    // Extract metadata from the HTML using Cheerio
    const metadata = {
      title: $("title").text(), // Get the text content of the <title> tag
      description: $('meta[name="description"]').attr("content"), // Get the value of the "content" attribute of the <meta name="description"> tag
      image: $('meta[property="og:image"]').attr("content"), // Get the value of the "content" attribute of the <meta property="og:image"> tag
    };

    res.json(metadata); // Send the metadata as a JSON response
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the URL" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
