/* P0 smoke test: console errors, anchors, fonts, screenshots at 3 breakpoints */
const { chromium } = require("playwright");

(async () => {
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

    // fonts actually applied?
    const h1Font = await page.locator("#hero-title").evaluate((el) => getComputedStyle(el).fontFamily);
    const taglineFont = await page.locator("#hero-title + p").evaluate((el) => getComputedStyle(el).fontFamily);

    // anchor jump works
    await page.click('nav[aria-label="Jump to a required section"] a[href="#logo"]');
    await page.waitForTimeout(1500);
    const logoInView = await page.locator("#logo").evaluate((el) => {
      const r = el.getBoundingClientRect();
      return r.top >= -50 && r.top < window.innerHeight;
    });

    // no horizontal scroll
    const hScroll = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);

    await page.screenshot({ path: `p0-${vp.name}-top.png`, fullPage: false });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    await page.screenshot({ path: `p0-${vp.name}-full.png`, fullPage: true });

    console.log(
      `[${vp.name}] h1: ${h1Font.split(",")[0]} | tagline: ${taglineFont.split(",")[0]} | ` +
        `anchor#logo in view: ${logoInView} | h-scroll: ${hScroll}`
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
})();
