/* P1 smoke test: console errors, anchors, fonts, screenshots at 3 breakpoints */
import { chromium } from "playwright";

const browser = await chromium.launch();
const errors = [];
const viewports = [
  { name: "1440", width: 1440, height: 900 },
  { name: "1024", width: 1024, height: 768 },
  { name: "390", width: 390, height: 844 },
];

for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`[${vp.name}] console: ${m.text()}`);
  });
  page.on("pageerror", (e) => errors.push(`[${vp.name}] pageerror: ${e.message}`));
  page.on("requestfailed", (r) => errors.push(`[${vp.name}] failed: ${r.url()}`));

  await page.goto("http://localhost:3100", { waitUntil: "networkidle" });

  const h1Font = await page
    .locator("#hero-title")
    .evaluate((el) => getComputedStyle(el).fontFamily);

  await page.click('nav[aria-label="Jump to a required section"] a[href="#logo"]');
  await page.waitForTimeout(1500);
  const logoInView = await page.locator("#logo").evaluate((el) => {
    const r = el.getBoundingClientRect();
    return r.top >= -50 && r.top < window.innerHeight;
  });

  const hScroll = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1,
  );

  // Rubric smoke: all 4 required components present & labeled
  const required = await page.evaluate(() => {
    const text = document.body.innerText;
    return {
      pt1: !!document.querySelector('[data-section="concept"]') && text.includes("PT#1"),
      ct1: !!document.querySelector('[data-section="logo"]') && text.includes("CT#1"),
      ct2: !!document.querySelector('[data-section="post"]') && text.includes("CT#2"),
      ct3: !!document.querySelector('[data-section="poster"]') && text.includes("CT#3"),
      owners: text.includes("Meet the owners"),
      caption: text.includes("Hello, Boracay"),
      posterPalette: text.includes("#043A84"),
      noPosterExplanation: !document
        .querySelector('[data-section="poster"]')
        ?.innerText.includes("Split-Complementary"),
    };
  });

  await page.screenshot({ path: `p1-${vp.name}-top.png` });
  await page.screenshot({ path: `p1-${vp.name}-full.png`, fullPage: true });

  console.log(
    `[${vp.name}] h1:${h1Font.split(",")[0]} anchor:${logoInView} h-scroll:${hScroll} required:${JSON.stringify(required)}`,
  );
  await page.close();
}

await browser.close();
if (errors.length) {
  console.log("ERRORS:");
  errors.forEach((e) => console.log("  " + e));
  process.exit(1);
}
console.log("SMOKE_OK — no console errors, no failed requests");
