export default async function run(page, ui) {
  const out = {};

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

  // --- Recipe steps accordion --------------------------------------------
  const firstToggle = page.locator(".recipe-toggle").first();
  out.stepsBefore = {
    label: await firstToggle.innerText(),
    expanded: await firstToggle.getAttribute("aria-expanded")
  };
  await firstToggle.click();
  await page.waitForTimeout(400);
  out.stepsAfter = {
    label: await firstToggle.innerText(),
    expanded: await firstToggle.getAttribute("aria-expanded"),
    cardOpen: await page.locator(".recipe-card").first().evaluate((el) => el.classList.contains("is-open"))
  };
  await firstToggle.click();
  await page.waitForTimeout(400);

  // --- FAQ accordion ------------------------------------------------------
  const faq = page.locator(".faq-item").first();
  out.faqBefore = await page.locator(".faq-question").first().getAttribute("aria-expanded");
  await page.locator(".faq-question").first().click();
  await page.waitForTimeout(400);
  out.faqAfter = {
    expanded: await page.locator(".faq-question").first().getAttribute("aria-expanded"),
    open: await faq.evaluate((el) => el.classList.contains("is-open"))
  };

  // --- Hero shuffle -------------------------------------------------------
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
  out.mobileNavLinkVisible = await page.getByRole("link", { name: "Recipes", exact: true }).isVisible();

  // --- Overflow check at mobile width ------------------------------------
  out.horizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );

  return out;
}
