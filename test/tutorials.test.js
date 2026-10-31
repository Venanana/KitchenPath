"use strict";
const {test} = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.join(__dirname, "..");

test("all 44 recipes have a specific tutorial with creator and source attribution", () => {
  const context = vm.createContext({window:{}});
  for (const file of ["filipino-recipes.js", "tutorials.js"]) vm.runInContext(fs.readFileSync(path.join(root,"js",file),"utf8"),context);
  const app = fs.readFileSync(path.join(root,"js/app.js"),"utf8");
  vm.runInContext(app.slice(app.indexOf("  const RECIPES ="),app.indexOf("  const $ ="))+";window.recipes=RECIPES;",context);
  const videos = context.window.KITCHENPATH_TUTORIALS;
  assert.equal(Object.keys(videos).length,44);
  for (const recipe of context.window.recipes) {
    const video = videos[recipe.id];
    assert.ok(video,recipe.id);
    assert.match(video.videoId,/^[A-Za-z0-9_-]{11}$/);
    assert.ok(video.title && video.creator && video.checkedAt,recipe.id);
    assert.equal(new URL(video.source).protocol,"https:");
  }
});

test("each page loads the tutorial catalogue before the main app", () => {
  for (const file of fs.readdirSync(root).filter(file=>file.endsWith(".html"))) {
    const html = fs.readFileSync(path.join(root,file),"utf8");
    const index = html.indexOf('src="js/tutorials.js"');
    assert.ok(index>0 && index<html.indexOf('src="js/app.js"'),file);
  }
});
