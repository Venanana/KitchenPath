/* Main-ingredient groups, reviewed per recipe; these are not dietary certifications. */
(function () {
  "use strict";
  const labels = {
    meat: "Meat", mixed: "Meat & Vegetables", vegetables: "Vegetable-based",
    seafood: "Seafood", dairy: "Eggs & Dairy", grains: "Rice & Pasta", sweets: "Sweets"
  };
  const groups = {
    "chicken-adobo": "meat", "pork-adobo": "meat", "chicken-tinola": "mixed",
    "sinigang-na-baboy": "mixed", "nilagang-baboy": "mixed", "chicken-afritada": "mixed",
    "beef-mechado": "mixed", "pork-menudo": "mixed", "bistek-tagalog": "meat",
    "pork-giniling": "mixed", "filipino-chicken-curry": "mixed",
    "ginataang-kalabasa": "vegetables", "ginisang-monggo": "vegetables", "pinakbet": "vegetables",
    "tortang-talong": "vegetables", "ginisang-ampalaya": "vegetables", "adobong-kangkong": "vegetables",
    "chop-suey": "vegetables", "pancit-bihon": "grains", "pancit-canton": "grains",
    "arroz-caldo": "meat", "lugaw": "grains", "sinangag": "grains", "tapsilog": "meat",
    "tocilog": "meat", "daing-na-bangus": "seafood", "lumpiang-shanghai": "mixed",
    "turon": "sweets", "ginataang-mais": "sweets", "champorado": "sweets", "biko": "sweets",
    "maja-blanca": "sweets", "garlic-butter-pasta": "grains", "scrambled-eggs": "dairy",
    "one-pan-chicken-rice": "meat", "tomato-toast": "vegetables", "veg-stir-fry": "vegetables",
    "pancakes": "sweets", "pasta-tomato-sauce": "vegetables", "soup": "vegetables",
    "roast-veg": "vegetables", "quesadilla": "dairy", "salmon": "seafood", "rice-bowl": "grains"
  };
  window.KitchenPathRecipeTags = { labels, groups };
})();
