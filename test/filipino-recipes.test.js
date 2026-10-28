"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const root = path.join(__dirname, "..");

test("Filipino catalogue has complete unique recipes and loads before the app", () => {
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(root, "js/filipino-recipes.js"), "utf8"), sandbox);
  const recipes = sandbox.window.KITCHENPATH_FILIPINO_RECIPES;
  assert.equal(recipes.length, 32);
  assert.equal(new Set(recipes.map(recipe => recipe.id)).size, recipes.length);
  for (const recipe of recipes) {
    assert.match(recipe.id, /^[a-z0-9-]+$/);
    assert.equal(recipe.cuisine, "Filipino");
    assert.ok(Number.isInteger(recipe.servings) && recipe.servings > 0, recipe.id);
    assert.ok(recipe.time > 0, recipe.id);
    assert.ok(recipe.ingredients.length >= 4 && recipe.ingredients.every(item => item.trim()), recipe.id);
    assert.ok(recipe.steps.length >= 4 && recipe.steps.every(item => item.trim()), recipe.id);
    if (recipe.photo) {
      assert.ok(fs.existsSync(path.join(root, `images/recipes/${recipe.id}.jpg`)), recipe.id);
      assert.ok(recipe.photo.author && recipe.photo.license && recipe.photo.source, recipe.id);
    }
  }
  for (const file of fs.readdirSync(root).filter(file => file.endsWith(".html"))) {
    const html = fs.readFileSync(path.join(root, file), "utf8");
    const dataIndex = html.indexOf('src="js/filipino-recipes.js"');
    assert.ok(dataIndex > 0 && dataIndex < html.indexOf('src="js/app.js"'), file);
  }
});
