"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const { once } = require("node:events");
const app = require("../server");

test("serves all website pages and assets without exposing project files", async (t) => {
  const server = app.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const base = `http://127.0.0.1:${server.address().port}`;

  for (const page of ["", "index.html", "recipes.html", "saved.html", "planner.html", "groceries.html", "basics.html", "glossary.html", "faq.html", "recipe.html?id=garlic-butter-pasta"]) {
    const response = await fetch(`${base}/${page}`);
    assert.equal(response.status, 200, page || "/");
    assert.match(response.headers.get("content-type"), /text\/html/);
    assert.match(await response.text(), /KitchenPath/);
  }

  const photos = require("../images/credits.json").photos;
  for (const id of Object.keys(photos)) {
    const response = await fetch(`${base}/images/recipes/${id}.jpg`);
    assert.equal(response.status, 200, id);
    assert.match(response.headers.get("content-type"), /image\/jpeg/);
    assert.ok((await response.arrayBuffer()).byteLength > 1000, id);
  }

  for (const [asset, type] of [["css/styles.css", /text\/css/], ["js/app.js", /javascript/], ["js/filipino-recipes.js", /javascript/]]) {
    const response = await fetch(`${base}/${asset}`);
    assert.equal(response.status, 200, asset);
    assert.match(response.headers.get("content-type"), type);
  }

  const health = await fetch(`${base}/health`);
  assert.equal(health.status, 200);
  assert.deepEqual(await health.json(), { status: "ok" });

  for (const file of ["server.js", "package.json", "package-lock.json", ".env", ".git/config", "README.md", "qa.mjs", "tmp/planner-check.cjs", "missing.html"]) {
    assert.equal((await fetch(`${base}/${file}`)).status, 404, file);
  }
  assert.equal((await fetch(`${base}/planner.html`, { method: "HEAD" })).status, 200);
});
