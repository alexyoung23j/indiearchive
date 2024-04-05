// import puppeteer, { Page } from "puppeteer";
// import fs from "fs";
// import path from "path";
// import { URL } from "url";

// async function downloadResource(
//   page: Page,
//   resourceUrl: string,
//   outputPath: string
// ): Promise<void> {
//   const localFilename = path.basename(new URL(resourceUrl).pathname);
//   const localFilePath = path.join(outputPath, localFilename);
//   const viewSource = await page.goto(resourceUrl);
//   if (viewSource) {
//     fs.writeFileSync(localFilePath, await viewSource.buffer());
//   }
// }

// async function captureSite(siteUrl: string, outputPath: string): Promise<void> {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(siteUrl, { waitUntil: "networkidle2" });

//   // Remove all <script> tags from the page
//   await page.evaluate(() => {
//     // Remove or modify href attributes in <a> tags
//     document.querySelectorAll("a").forEach((a) => {
//       a.removeAttribute("href");
//       // Alternatively, set it to "#" or "javascript:void(0)" to keep the element clickable without redirect
//       // a.href = "javascript:void(0)";
//     });

//     // Remove meta refresh tags
//     document
//       .querySelectorAll('meta[http-equiv="refresh"]')
//       .forEach((meta) => meta.remove());

//     // Remove or modify form actions
//     document.querySelectorAll("form").forEach((form) => {
//       form.removeAttribute("action");
//       // Alternatively, set action to "javascript:void(0);" to prevent form submission
//       // form.action = "javascript:void(0);";
//     });
//     const scripts = document.querySelectorAll("script");
//     scripts.forEach((script) => script.remove());
//   });

//   // Get all CSS file URLs
//   const cssUrls = await page.$$eval('link[rel="stylesheet"]', (links) =>
//     links.map((link) => link.href)
//   );

//   // Fetch and concatenate the CSS content
//   const cssContents = await Promise.all(
//     cssUrls.map(async (url) => {
//       const response = await fetch(url);
//       return response.ok ? await response.text() : "";
//     })
//   );

//   // Embed the fetched CSS in <style> tags in the head of the document
//   await page.evaluate((cssText) => {
//     const styleEl = document.createElement("style");
//     styleEl.type = "text/css";
//     styleEl.textContent = cssText;
//     document.head.appendChild(styleEl);
//   }, cssContents.join("\n"));

//   // Save the modified HTML content with inlined CSS
//   const content = await page.content();
//   fs.writeFileSync(path.join(outputPath, "index.html"), content);

//   await browser.close();
// }

// // Example usage
// captureSite("https://referlink.xyz", "./output").then(() =>
//   console.log("Capture complete")
// );
