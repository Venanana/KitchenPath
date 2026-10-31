"use strict";
const {test} = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const context = vm.createContext({window:{}});
vm.runInContext(fs.readFileSync(path.join(__dirname,"../js/meal-plan.js"),"utf8"),context);
const model = context.window.KitchenPathMealPlan;

test("old dinner plans become dinner slots without changing their saved source", () => {
  const old = {Monday:"chicken-adobo",Wednesday:"pork-adobo"};
  const plan = model.normalize(old);
  assert.equal(plan.Monday.Dinner,"chicken-adobo");
  assert.equal(plan.Wednesday.Dinner,"pork-adobo");
  assert.equal(plan.Monday.Breakfast,undefined);
  assert.equal(old.Monday,"chicken-adobo");
  assert.equal(model.entries(plan).length,21);
});

test("setting or removing one meal preserves other meals on the same day", () => {
  const plan = model.normalize({Monday:{Breakfast:"scrambled-eggs",Lunch:"soup",Dinner:"chicken-adobo"}});
  model.set(plan,"Monday","Lunch","rice-bowl");
  model.set(plan,"Monday","Breakfast",null);
  assert.equal(plan.Monday.Lunch,"rice-bowl");
  assert.equal(plan.Monday.Dinner,"chicken-adobo");
  assert.equal(plan.Monday.Breakfast,undefined);
  assert.equal(model.entries(plan).filter(entry=>entry.id).length,2);
  model.set(plan,"Monday","Lunch",null);
  model.set(plan,"Monday","Dinner",null);
  assert.equal(plan.Monday,undefined);
});

test("normalization ignores invalid days, meal names, and malformed values", () => {
  const plan = model.normalize({Monday:{Breakfast:{id:"bad"},Lunch:12,Dinner:"salmon",Snack:"pancakes"},Other:"soup"});
  assert.equal(Object.keys(plan).join(),"Monday");
  assert.equal(Object.keys(plan.Monday).join(),"Dinner");
  model.set(plan,"Other","Breakfast","pancakes");
  model.set(plan,"Monday","Snack","pancakes");
  assert.equal(Object.keys(plan).length,1);
  assert.equal(Object.keys(plan.Monday).length,1);
  assert.equal(Object.keys(model.normalize(null)).length,0);
});
