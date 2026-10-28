"use strict";

const express = require("express");
const path = require("node:path");

const app = express();
app.disable("x-powered-by");

// Expose only the website pages and assets, not the repository or server files.
const pages = [
  "index.html", "recipes.html", "saved.html", "planner.html",
  "groceries.html", "basics.html", "glossary.html", "faq.html", "recipe.html"
];

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.get(pages.map((page) => `/${page}`), (req, res) => {
  res.sendFile(path.join(__dirname, req.path.slice(1)));
});

for (const directory of ["css", "js", "images"]) {
  app.use(`/${directory}`, express.static(path.join(__dirname, directory), {
    dotfiles: "deny",
    index: false
  }));
}

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use((req, res) => res.status(404).type("text").send("Page not found."));

if (require.main === module) {
  const port = Number(process.env.PORT || 3000);
  app.listen(port, "0.0.0.0", () => {
    console.log(`KitchenPath is listening on port ${port}`);
  });
}

module.exports = app;
