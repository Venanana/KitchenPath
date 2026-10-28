export default async function run(page, ui) {
  const out = {};
  const homeUrl = new URL('index.html', page.url()).href;
  const visit = (file) => page.goto(new URL(file, homeUrl).href);
  await visit('recipes.html');

  // --- Search -------------------------------------------------------------
  await page.fill("#recipeSearch", "garlic");
  await page.waitForTimeout(350);
  out.searchGarlic = {
    count: await page.locator(".recipe-card").count(),
    label: await page.locator("#recipeCount").innerText(),
    names: await page.locator(".recipe-card h3").allInnerTexts()
  };

  await page.fill("#recipeSearch", "zzzz");
  await page.waitForTimeout(350);
  out.noResults = {
    count: await page.locator(".recipe-card").count(),
    emptyVisible: await page.locator("#emptyState").isVisible()
  };

  await page.fill("#recipeSearch", "");
  await page.waitForTimeout(350);

  // --- Category filter ----------------------------------------------------
  await page.getByRole("button", { name: "Breakfast", exact: true }).click();
  await page.waitForTimeout(200);
  out.filterBreakfast = {
    count: await page.locator(".recipe-card").count(),
    label: await page.locator("#recipeCount").innerText(),
    categories: await page.locator(".recipe-card .tag:not(.tag-alt)").allInnerTexts()
  };

  await page.getByRole("button", { name: "All", exact: true }).click();
  await page.waitForTimeout(200);
  out.backToAll = await page.locator(".recipe-card").count();

  // --- Dedicated recipe page and day picker -------------------------------
  await page.locator('.recipe-details a').first().click();
  out.recipeDetail = {
    name: await page.locator('main h1').innerText(),
    ingredients: await page.locator('.detail-ingredients li').count(),
    steps: await page.locator('.method-list li').count(),
    photoLoaded: await page.locator('.recipe-detail-header img').evaluate(img => img.complete && img.naturalWidth > 0)
  };
  await page.locator('main .add-to-plan').click();
  out.dayPickerOpen = await page.locator('#planDialog').isVisible();
  await page.locator('#cancelPlan').click();
  out.dayPickerClosed = !(await page.locator('#planDialog').isVisible());

  // --- FAQ accordion ------------------------------------------------------
  await visit('faq.html');
  const faq = page.locator(".faq-item").first();
  out.faqBefore = await page.locator(".faq-question").first().getAttribute("aria-expanded");
  await page.locator(".faq-question").first().click();
  await page.waitForTimeout(400);
  out.faqAfter = {
    expanded: await page.locator(".faq-question").first().getAttribute("aria-expanded"),
    open: await faq.evaluate((el) => el.classList.contains("is-open"))
  };

  // --- Hero shuffle -------------------------------------------------------
  await visit('index.html');
  out.heroBefore = await page.locator("#heroMeal").innerText();
  await page.locator("#shuffleMeal").click();
  await page.waitForTimeout(600);
  out.heroAfter = await page.locator("#heroMeal").innerText();

  // --- Theme toggle -------------------------------------------------------
  out.themeInitial = await page.evaluate(() => document.documentElement.getAttribute("data-theme"));
  await page.locator("#themeToggle").click();
  await page.waitForTimeout(200);
  out.themeToggled = await page.evaluate(() => document.documentElement.getAttribute("data-theme"));
  await page.locator("#themeToggle").click();
  await page.waitForTimeout(200);

  // --- Mobile nav ---------------------------------------------------------
  await page.setViewportSize({ width: 390, height: 800 });
  await page.waitForTimeout(300);
  out.mobileNavToggleVisible = await page.locator("#navToggle").isVisible();
  await page.locator("#navToggle").click();
  await page.waitForTimeout(400);
  out.mobileNavOpen = await page.locator("#primaryNav").evaluate((el) => el.classList.contains("is-open"));
  out.mobileNavLinkVisible = await page.locator('#primaryNav').getByRole("link", { name: "Recipes", exact: true }).isVisible();

  // --- Overflow check at mobile width ------------------------------------
  out.horizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );

  return out;
}
