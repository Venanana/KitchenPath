"use strict";
const {test} = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
test("every Basics tutorial button has a specific attributed lesson", () => {
  const root = path.join(__dirname, "..");
  const context = vm.createContext({window: {}});
  vm.runInContext(fs.readFileSync(path.join(root, "js/basics-tutorials.js"), "utf8"), context);
  const lessons = context.window.KITCHENPATH_BASICS_TUTORIALS;
  const html = fs.readFileSync(path.join(root, "basics.html"), "utf8");
  const ids = [...html.matchAll(/data-lesson="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, 10);
  assert.deepEqual(ids.slice().sort(), Object.keys(lessons).sort());
  assert.ok(html.indexOf('src="js/basics-tutorials.js"') < html.indexOf('src="js/app.js"'));
  assert.doesNotMatch(html, /id="skills" hidden/);
  for (const id of ids) {
    const lesson = lessons[id];
    assert.match(lesson.videoId, /^[A-Za-z0-9_-]{11}$/);
    assert.equal(lesson.source, "https://www.youtube.com/watch?v=" + lesson.videoId);
    assert.ok(lesson.label && lesson.title && lesson.creator && lesson.checkedAt, id);
  }
});
