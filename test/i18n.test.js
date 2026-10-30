"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const root = path.join(__dirname, "..");

function catalogue() {
  const state = new Map();
  const context = vm.createContext({
    window: {}, document: { readyState: "loading", addEventListener() {} },
    localStorage: { getItem: key => state.get(key), setItem: (key, value) => state.set(key, value) }
  });
  for (const file of ["filipino-recipes.js", "i18n.js", "recipes-tl.js", "translations-tl.js"]) {
    vm.runInContext(fs.readFileSync(path.join(root, "js", file), "utf8"), context);
  }
  const app = fs.readFileSync(path.join(root, "js/app.js"), "utf8");
  vm.runInContext(app.slice(app.indexOf("  const RECIPES ="), app.indexOf("  /* ----------------------------------------------------------------------\n     HELPERS")) +
    ";window.data = {recipes: RECIPES, hero: HERO_MEALS, glossary: GLOSSARY, faq: FAQS};", context);
  const { recipes, hero, glossary, faq } = context.window.data;
  const i18n = context.window.KitchenPathI18n;
  i18n.registerRecipes(recipes);
  i18n.registerContent(hero, glossary, faq);
  return { i18n, recipes, translated: context.window.KITCHENPATH_RECIPES_TL };
}

test("every recipe has complete Tagalog instructions and preserves cooking temperatures", () => {
  const { i18n, recipes, translated } = catalogue();
  assert.equal(recipes.length, 44);
  for (const recipe of recipes) {
    assert.equal(translated[recipe.id].length, recipe.steps.length + 1, recipe.id);
    assert.notEqual(i18n.translate(recipe.blurb, true), recipe.blurb, recipe.id);
    recipe.steps.forEach((step) => {
      const output = i18n.translate(step, true);
      assert.ok(output && output !== step, `${recipe.id}: ${step}`);
      for (const temperature of step.match(/\d+°[CF]/g) || []) assert.ok(output.includes(temperature), `${recipe.id}: ${temperature}`);
    });
  }
});

test("translation keeps English as default and supports ingredients and changing counts", () => {
  const { i18n } = catalogue();
  assert.equal(i18n.translate("Ingredients"), "Ingredients");
  assert.equal(i18n.translate("Ingredients", true), "Mga sangkap");
  assert.equal(i18n.translate("1/3 cup soy sauce", true), "1/3 tasa ng toyo");
  assert.equal(i18n.translate("Salt and pepper to taste", true), "Asin at paminta ayon sa panlasa");
  assert.equal(i18n.translate("1 can (400g) chopped tomatoes", true), "1 lata (400g) ng tinadtad na kamatis");
  assert.equal(i18n.translate("Monday's dinner: 2 of 8 ingredient entries checked", true), "Hapunan sa Lunes: 2 sa 8 sangkap ang namarkahan");
  assert.equal(i18n.translate("2 of 7 dinners planned", true), "2 sa 7 hapunan ang nakaplano");
  assert.equal(i18n.translate("Mutti Polpa", true), "Mutti Polpa");
});

test("all pages load translations before the app", () => {
  for (const file of fs.readdirSync(root).filter(file => file.endsWith(".html"))) {
    const html = fs.readFileSync(path.join(root, file), "utf8");
    const runtime = html.indexOf('src="js/i18n.js"');
    const recipes = html.indexOf('src="js/recipes-tl.js"');
    const text = html.indexOf('src="js/translations-tl.js"');
    const app = html.indexOf('src="js/app.js"');
    assert.ok(runtime > 0 && runtime < recipes && recipes < text && text < app, file);
  }
});
