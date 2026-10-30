"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const source = fs.readFileSync(path.join(__dirname, "../js/profiles.js"), "utf8");
const keys = { profile: "kitchenpath-profile", saved: "kitchenpath-saved-recipes", plan: "kitchenpath-meal-plan", preferences: "kitchenpath-planner-preferences", groceries: "kitchenpath-grocery-checks" };
function fixture(initial = {}) {
  const data = new Map(Object.entries(initial));
  const storage = { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, String(value)) };
  const context = vm.createContext({ window: {} });
  vm.runInContext(source, context);
  return { data, storage, open: () => context.window.KitchenPathProfiles.createStore(storage, keys) };
}

test("profiles isolate saved recipes, plans, preferences, and checks across switches and reloads", () => {
  const fixtureData = fixture({ [keys.saved]: '["chicken-adobo"]', [keys.plan]: '{"Monday":"chicken-adobo"}', [keys.preferences]: '{"time":60}', [keys.groceries]: '["1 cup water"]' });
  let store = fixtureData.open();
  const first = store.create("Venan", "🥑");
  const firstKeys = store.keys();
  for (const field of ["saved", "plan", "preferences", "groceries"]) assert.equal(fixtureData.data.get(firstKeys[field]), fixtureData.data.get(keys[field]), field);
  const second = store.create("Maria", "🍓");
  const secondKeys = store.keys();
  for (const field of ["saved", "plan", "preferences", "groceries"]) {
    assert.notEqual(secondKeys[field], firstKeys[field]);
    assert.equal(fixtureData.data.has(secondKeys[field]), false, `${field} starts empty`);
  }
  fixtureData.storage.setItem(secondKeys.saved, '["pancakes"]');
  store = fixtureData.open();
  assert.equal(store.active().id, second.id);
  store.select(first.id);
  store = fixtureData.open();
  assert.equal(store.active().name, "Venan");
  assert.equal(fixtureData.data.get(store.keys().saved), '["chicken-adobo"]');
  store.update(first.id, "Ven", "🍳");
  assert.equal(store.active().name, "Ven");
  assert.equal(store.keys().saved, firstKeys.saved, "Editing preserves the data scope");
  store.select(null);
  store = fixtureData.open();
  assert.equal(store.active(), null);
  assert.equal(store.keys().saved, keys.saved, "Guest keeps its original data");
  store.select(second.id);
  assert.equal(fixtureData.data.get(store.keys().saved), '["pancakes"]');
});

test("legacy optional-name profile migrates once with its existing data", () => {
  const { open, data } = fixture({ [keys.profile]: '{"name":"Venan"}', [keys.saved]: '["pancakes"]' });
  const store = open();
  assert.equal(store.active().name, "Venan");
  assert.equal(data.get(store.keys().saved), '["pancakes"]');
  assert.equal(open().list().length, 1);
  store.select(null);
  assert.equal(open().active(), null, "Guest selection survives the legacy name remaining in storage");
});

test("profile validation handles corrupt storage and rejects blank names or unknown profiles", () => {
  const { open, data } = fixture({ "kitchenpath-profiles": "invalid JSON" });
  const store = open();
  assert.equal(store.active(), null);
  assert.throws(() => store.create("   "), /profile name/);
  assert.throws(() => store.select("missing"), /not found/);
  const created = store.create("  Home  ", "invalid avatar");
  assert.equal(created.name, "Home");
  assert.equal(created.avatar, "👤");
  assert.throws(() => store.update(created.id, " ", "🍓"), /profile name/);
  assert.equal(JSON.parse(data.get("kitchenpath-profiles")).profiles.length, 1);
});

test("every page loads the profile store before the app and has the picker controls", () => {
  const root = path.join(__dirname, "..");
  for (const file of fs.readdirSync(root).filter(file => file.endsWith(".html"))) {
    const html = fs.readFileSync(path.join(root, file), "utf8");
    assert.ok(html.indexOf('src="js/profiles.js"') > 0 && html.indexOf('src="js/profiles.js"') < html.indexOf('src="js/app.js"'), file);
    for (const id of ["profileList", "profileAvatars", "addProfile", "editProfile", "guestProfile"]) assert.ok(html.includes(`id="${id}"`), `${file}: ${id}`);
  }
});
