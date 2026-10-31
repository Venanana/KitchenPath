/* ==========================================================================
   KitchenPath — app.js
   Vanilla JS. No build step, no dependencies.
   Sections: data → theme → nav → skills → recipes → glossary → faq → misc
   ========================================================================== */

(function () {
  "use strict";

  /* ----------------------------------------------------------------------
     DATA
     ---------------------------------------------------------------------- */

  const RECIPES = [
    ...(window.KITCHENPATH_FILIPINO_RECIPES || []),
    {
      id: "garlic-butter-pasta",
      name: "Garlic Butter Pasta",
      icon: "🍝",
      category: "Dinner",
      time: 15,
      difficulty: "Very easy",
      blurb: "Pasta tossed with garlic butter and parmesan.",
      ingredients: ["200g pasta (any shape)", "3 cloves garlic", "40g butter", "Handful of parmesan"],
      steps: [
        "Boil salted water and cook the pasta 1 minute less than the box says.",
        "Meanwhile, melt butter in a pan over medium-low heat and add sliced garlic. Cook 1 minute — don't let it brown.",
        "Scoop out 1 cup of pasta water, then drain the pasta.",
        "Toss pasta into the pan with a splash of the pasta water and the parmesan. Stir until glossy."
      ]
    },
    {
      id: "scrambled-eggs",
      name: "Soft Scrambled Eggs",
      icon: "🍳",
      category: "Breakfast",
      time: 5,
      difficulty: "Very easy",
      blurb: "Soft eggs cooked slowly with butter and a splash of milk.",
      ingredients: ["3 eggs", "1 tbsp butter", "1 tbsp milk", "Salt"],
      steps: [
        "Whisk eggs, milk, and a pinch of salt until completely smooth.",
        "Melt butter in a pan over LOW heat.",
        "Pour in eggs and stir slowly with a spatula, pushing from the edges to the middle.",
        "Take them off the heat while still slightly wet — they keep cooking in the pan."
      ]
    },
    {
      id: "one-pan-chicken-rice",
      name: "One-Pan Chicken & Rice",
      icon: "🍗",
      category: "Dinner",
      time: 35,
      difficulty: "Easy",
      blurb: "Chicken thighs and rice cooked together in one pan.",
      ingredients: ["2 chicken thighs", "1 cup rice", "2 cups stock or water", "1 onion", "1 tbsp cooking oil", "Salt and pepper to taste"],
      steps: [
        "Season chicken with salt and pepper, then sear in a hot pan 4 minutes per side. Set aside.",
        "Cook diced onion in the same pan 3 minutes.",
        "Add rice and stir 1 minute, then pour in the liquid.",
        "Put the chicken back on top, cover, and simmer on low 20 minutes. Rest 5 minutes before opening."
      ]
    },
    {
      id: "tomato-toast",
      name: "Garlic Tomato Toast",
      icon: "🍞",
      category: "Snack",
      time: 8,
      difficulty: "Very easy",
      blurb: "Crisp toast with fresh tomato, garlic, and olive oil.",
      ingredients: ["2 slices bread", "1 ripe tomato", "1 clove garlic", "Olive oil", "Salt to taste"],
      steps: [
        "Toast the bread until crisp.",
        "Rub the raw garlic clove over the hot toast — it melts right in.",
        "Grate or chop the tomato and pile it on.",
        "Drizzle with olive oil, add salt, and eat immediately."
      ]
    },
    {
      id: "veg-stir-fry",
      name: "Everything Stir-Fry",
      icon: "🥦",
      category: "Dinner",
      time: 20,
      difficulty: "Easy",
      blurb: "A quick vegetable stir-fry with soy sauce, served over rice.",
      ingredients: ["Any vegetables you have", "2 tbsp soy sauce", "1 tsp sugar", "1 tbsp cooking oil", "Rice to serve"],
      steps: [
        "Chop everything into similar-sized pieces so it cooks evenly.",
        "Heat the pan until very hot, add oil, then the hardest vegetables first (carrot, broccoli).",
        "Add softer vegetables (pepper, onion) after 2 minutes.",
        "Mix soy sauce and sugar, pour it in, toss 30 seconds, and serve over rice."
      ]
    },
    {
      id: "pancakes",
      name: "Fluffy Pancakes",
      icon: "🥞",
      category: "Breakfast",
      time: 20,
      difficulty: "Easy",
      blurb: "Simple pancakes made with flour, milk, eggs, and baking powder.",
      ingredients: ["1 cup flour", "1 cup milk", "1 egg", "1 tbsp sugar", "1 tsp baking powder"],
      steps: [
        "Whisk the dry ingredients in one bowl and the wet in another.",
        "Combine them with a few folds — lumps are fine. Over-mixing makes them tough.",
        "Cook over MEDIUM heat: pour batter, wait for bubbles on top, then flip.",
        "The first one is always a test pancake. Adjust the heat and continue."
      ]
    },
    {
      id: "pasta-tomato-sauce",
      name: "Simple Tomato Sauce",
      icon: "🍅",
      category: "Dinner",
      time: 25,
      difficulty: "Easy",
      blurb: "A tomato, onion, and garlic sauce to serve with your choice of pasta.",
      ingredients: ["1 can (400g) chopped tomatoes", "1 onion", "2 cloves garlic", "Olive oil", "Salt to taste", "Pinch of sugar or splash of vinegar (optional, to balance the sauce)"],
      steps: [
        "Cook diced onion in olive oil over medium heat for 5 minutes until soft.",
        "Add garlic and cook 1 minute more.",
        "Pour in the tomatoes, season with salt, and simmer 15 minutes.",
        "Taste it. If it's flat, add a pinch of sugar or a splash of vinegar."
      ]
    },
    {
      id: "soup",
      name: "Any-Vegetable Soup",
      icon: "🥣",
      category: "Lunch",
      time: 30,
      difficulty: "Easy",
      blurb: "Vegetables simmered in stock, served chunky or blended smooth.",
      ingredients: ["Any vegetables", "1 onion", "4 cups stock", "Olive oil"],
      steps: [
        "Soften diced onion in oil over medium heat, 5 minutes.",
        "Add chopped vegetables and stir 2 minutes.",
        "Pour in stock, bring to a simmer, and cook 20 minutes until everything is tender.",
        "Blend it smooth or leave it chunky — both work."
      ]
    },
    {
      id: "roast-veg",
      name: "Roasted Vegetables",
      icon: "🥕",
      category: "Side",
      time: 35,
      difficulty: "Very easy",
      blurb: "Chopped vegetables roasted with olive oil, salt, and pepper.",
      ingredients: ["Any vegetables", "2 tbsp olive oil", "Salt", "Pepper"],
      steps: [
        "Heat the oven to 200°C / 400°F.",
        "Cut vegetables into even chunks and toss with oil, salt, and pepper on a tray.",
        "Spread them out — no overlapping, or they'll steam instead of roast.",
        "Roast 25–30 minutes, turning once halfway."
      ]
    },
    {
      id: "quesadilla",
      name: "Cheese Quesadilla",
      icon: "🧀",
      category: "Snack",
      time: 10,
      difficulty: "Very easy",
      blurb: "Toasted tortillas filled with melted cheese.",
      ingredients: ["2 tortillas", "1 cup grated cheese", "1 tbsp butter", "Optional: beans or onion"],
      steps: [
        "Sprinkle cheese over one tortilla and top with the second.",
        "Melt butter in a pan over medium heat.",
        "Cook 2–3 minutes per side until golden and the cheese has melted.",
        "Rest 1 minute before cutting, or the cheese will run everywhere."
      ]
    },
    {
      id: "salmon",
      name: "Pan-Seared Salmon",
      icon: "🐟",
      category: "Dinner",
      time: 15,
      difficulty: "Medium",
      blurb: "Pan-seared salmon finished with a squeeze of lemon.",
      ingredients: ["1 salmon fillet", "1 tbsp oil", "Half a lemon", "Salt"],
      steps: [
        "Pat the salmon completely dry with paper towel — this is what makes the skin crisp.",
        "Season with salt. Heat oil in a pan over medium-high heat.",
        "Cook skin-side down 4–5 minutes without moving it.",
        "Flip, cook 2 more minutes, then squeeze lemon over the top."
      ]
    },
    {
      id: "rice-bowl",
      name: "Loaded Rice Bowl",
      icon: "🍚",
      category: "Lunch",
      time: 15,
      difficulty: "Very easy",
      blurb: "A bowl of rice topped with an egg, vegetables, and soy sauce.",
      ingredients: ["1 cup cooked rice", "1 egg", "Soy sauce", "1 tsp cooking oil", "Any leftover vegetables"],
      steps: [
        "Warm the rice in a bowl.",
        "Fry an egg in a hot pan until the edges are crisp.",
        "Put the egg on the rice and add whatever vegetables you have.",
        "Finish with soy sauce and stir everything together."
      ]
    }
  ];

  // Approximate yield of the ingredient amounts shown, before any portion adjustments.
  const SERVINGS = {
    "garlic-butter-pasta": 2, "scrambled-eggs": 1, "one-pan-chicken-rice": 2,
    "tomato-toast": 1, "veg-stir-fry": 2, "pancakes": 2, "pasta-tomato-sauce": 4,
    "soup": 4, "roast-veg": 2, "quesadilla": 1, "salmon": 1, "rice-bowl": 1
  };
  (window.KITCHENPATH_FILIPINO_RECIPES || []).forEach((recipe) => { SERVINGS[recipe.id] = recipe.servings; });

  const CATEGORIES = ["All", "Breakfast", "Lunch/Dinner", "Side", "Snack", "Dessert"];
  const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const MEAL_SLOTS = ["Breakfast", "Lunch", "Dinner"];
  const STORAGE_KEYS = {
    profile: "kitchenpath-profile",
    saved: "kitchenpath-saved-recipes",
    plan: "kitchenpath-meal-plan",
    preferences: "kitchenpath-planner-preferences",
    groceries: "kitchenpath-grocery-checks"
  };

  const HERO_MEALS = [
    { name: "Chicken Adobo", desc: "Chicken simmered in soy sauce, vinegar, garlic, and bay leaves." },
    { name: "Chicken Tinola", desc: "A ginger chicken soup with sayote and malunggay." },
    { name: "Tortang Talong", desc: "Soft roasted eggplant coated in egg and pan-fried." },
    { name: "Pancit Bihon", desc: "Rice noodles with chicken, cabbage, carrots, and calamansi." },
    { name: "Garlic Butter Pasta", desc: "Pasta with garlic, butter, and parmesan. Ready in about 15 minutes." },
    { name: "Soft Scrambled Eggs", desc: "Eggs, butter, and a little milk, cooked slowly over low heat." },
    { name: "Cheese Quesadilla", desc: "Toasted tortillas with melted cheese. Takes about 10 minutes." },
    { name: "Everything Stir-Fry", desc: "Chopped vegetables tossed with soy sauce and served over rice." },
    { name: "Garlic Tomato Toast", desc: "Crisp toast topped with garlic, tomato, and olive oil." },
    { name: "Loaded Rice Bowl", desc: "Rice topped with a fried egg, vegetables, and soy sauce." }
  ];

  const GLOSSARY = [
    { term: "Simmer", def: "Cooking liquid with tiny bubbles rising slowly. Gentler than a boil — this is what most sauces want." },
    { term: "Sear", def: "Browning the surface of food in a very hot pan to build flavor and texture." },
    { term: "Sauté", def: "Cooking food quickly in a little fat over medium-high heat while stirring." },
    { term: "Deglaze", def: "Pouring liquid into a hot pan and scraping up the browned bits stuck to the bottom — free flavor." },
    { term: "Fold", def: "A gentle mixing motion, like turning a page, used to keep air in batters." },
    { term: "Season", def: "Adding salt — and often acid — to make flavors taste like themselves." },
    { term: "Reduce", def: "Simmering a liquid so it evaporates and thickens, concentrating the flavor." },
    { term: "Mise en place", def: "French for 'everything in its place' — chop and measure everything before you turn on the heat." },
    { term: "Roux", def: "Equal parts flour and butter cooked together, the classic thickener for sauces and soups." }
  ];

  const FAQS = [
    {
      q: "I burn everything. What am I doing wrong?",
      a: "Almost always: the pan is too hot and the food is too wet. Preheat on medium, not high, pat ingredients dry before they go in, and don't crowd the pan. If something is browning faster than it's cooking, turn the heat down — you can always add heat, but you can't take it back."
    },
    {
      q: "Do I really need a lot of equipment?",
      a: "No. A chef's knife, a cutting board, one non-stick pan, one saucepan, and a wooden spoon will get you through every recipe on this page. Buy more only when you find yourself actually needing it."
    },
    {
      q: "How do I know when meat is cooked?",
      a: "The safest answer is a cheap instant-read thermometer: chicken is done at 74°C / 165°F. Without one, look for clear juices, no pink in the center, and firm-but-not-rubbery texture. When in doubt, cook it 2 more minutes — beginner food is better slightly overcooked than unsafe."
    },
    {
      q: "What if I don't have an ingredient a recipe calls for?",
      a: "Swap it. No garlic? Use onion. No butter? Use oil. Cooking is far more flexible than baking, where exact amounts really matter. Use the glossary and the skill cards to understand what an ingredient is doing, then replace it with something that does the same job."
    },
    {
      q: "How long do leftovers last?",
      a: "Three to four days in the fridge for most cooked food. Cool things quickly (shallow containers help), refrigerate within 90 minutes, and reheat until steaming hot all the way through."
    },
    {
      q: "Why does my food taste bland even with salt?",
      a: "Bland usually means it's missing acid, fat, or browning — not salt. Try a squeeze of lemon, a splash of vinegar, a knob of butter, or searing the ingredients properly before adding liquid. Taste as you go and adjust one thing at a time."
    }
  ];

  /* ----------------------------------------------------------------------
     HELPERS
     ---------------------------------------------------------------------- */

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const translate = (text) => window.KitchenPathI18n?.translate(text) ?? text;
  window.KitchenPathI18n?.registerRecipes(RECIPES);
  window.KitchenPathI18n?.registerContent(HERO_MEALS, GLOSSARY, FAQS);

  /** Escape user-facing strings before inserting as HTML. */
  function esc(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  function readJSON(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) || fallback;
    } catch {
      return fallback;
    }
  }

  const recipeById = (id) => RECIPES.find((recipe) => recipe.id === id);
  const recipeCategory = (recipe) => ["Lunch", "Dinner"].includes(recipe.category) ? "Lunch/Dinner" : recipe.category;
  const recipeFoodType = (recipe) => window.KitchenPathRecipeTags?.groups[recipe.id] || "";
  const recipeFoodLabel = (recipe) => window.KitchenPathRecipeTags?.labels[recipeFoodType(recipe)] || "";
  const recipeUrl = (recipe) => `recipe.html?id=${encodeURIComponent(recipe.id)}`;
  function recipePhoto(recipe, eager = false) {
    if (recipe.photo === null) return `<span class="food-photo" role="img" aria-label="${esc(recipe.name)}; photo unavailable"><span class="photo-fallback" aria-hidden="true">${recipe.icon}</span></span>`;
    return `<span class="food-photo"><span class="photo-fallback" aria-hidden="true">${recipe.icon}</span><img src="images/recipes/${esc(recipe.id)}.jpg" alt="Serving suggestion for ${esc(recipe.name)}" width="960" height="640" loading="${eager ? "eager" : "lazy"}" decoding="async"></span>`;
  }
  function photoCaption(recipe) {
    if (recipe.photo === null) return "Photo not available yet.";
    const credit = recipe.photo;
    return `Serving suggestion; toppings and garnishes may vary.${credit ? ` Photo: ${esc(credit.author)} · <a href="${esc(credit.source)}" target="_blank" rel="noopener">${esc(credit.license)}</a>.` : ""}`;
  }
  document.addEventListener("error", (event) => {
    if (event.target.matches?.(".food-photo img")) event.target.hidden = true;
  }, true);

  const profileStore = window.KitchenPathProfiles?.createStore(localStorage, STORAGE_KEYS);
  if (profileStore) Object.assign(STORAGE_KEYS, profileStore.keys());
  let profile = profileStore?.active() || readJSON(STORAGE_KEYS.profile, null);
  if (profileStore && !profileStore.active()) profile = null;
  let savedRecipes = new Set(readJSON(STORAGE_KEYS.saved, []));
  const readMealPlan = () => window.KitchenPathMealPlan.normalize(readJSON(STORAGE_KEYS.plan, {}));
  let mealPlan = readMealPlan();
  const plannedRecipe = (day, slot) => recipeById(mealPlan[day]?.[slot]);
  const setPlannedMeal = (day, slot, id) => window.KitchenPathMealPlan.set(mealPlan, day, slot, id);
  let groceryChecks = new Set(readJSON(STORAGE_KEYS.groceries, []));
  let downloadingPlan = false;

  function saveSavedRecipes() {
    localStorage.setItem(STORAGE_KEYS.saved, JSON.stringify([...savedRecipes]));
  }

  function saveMealPlan() {
    localStorage.setItem(STORAGE_KEYS.plan, JSON.stringify(mealPlan));
    renderPlanSummary();
    renderGroceries();
  }

  function updateRecipeSaveButtons() {
    $$(".save-recipe").forEach((button) => {
      const saved = savedRecipes.has(button.dataset.id);
      button.textContent = saved ? "Saved" : "Save";
      const recipe = recipeById(button.dataset.id);
      button.setAttribute("aria-label", `${saved ? "Unsave" : "Save"} ${recipe?.name || "recipe"}`);
      button.setAttribute("aria-pressed", String(saved));
    });
  }

  function renderSavedRecipes() {
    const grid = $("#savedGrid");
    const empty = $("#savedEmpty");
    if (!grid || !empty) return;

    const recipes = [...savedRecipes].map(recipeById).filter(Boolean);
    grid.innerHTML = recipes.map((recipe) => `
      <article class="mini-recipe">
        <a class="saved-photo" href="${recipeUrl(recipe)}" aria-label="View ${esc(recipe.name)}">${recipePhoto(recipe)}</a>
        <div>
          <h3><a href="${recipeUrl(recipe)}">${esc(recipe.name)}</a></h3>
          <p>${recipe.time} min · ${esc(recipeCategory(recipe))}</p>
          <button type="button" class="text-button add-to-plan" data-id="${esc(recipe.id)}">Add to meal plan</button>
        </div>
        <button type="button" class="text-button remove-saved" data-id="${esc(recipe.id)}" aria-label="Remove ${esc(recipe.name)} from saved recipes">Remove</button>
      </article>
    `).join("");

    empty.hidden = recipes.length > 0;
  }

  function renderPlanner() {
    const grid = $("#plannerGrid");
    if (!grid) return;

    const options = RECIPES.map((recipe) =>
      `<option value="${esc(recipe.id)}">${esc(recipe.name)}</option>`
    ).join("");

    grid.innerHTML = DAYS.map((day) => `<article class="planner-day">
      <h2>${day}</h2>
      <div class="planner-meals">${MEAL_SLOTS.map((slot) => {
        const recipe = plannedRecipe(day, slot);
        const id = `meal-${day}-${slot}`;
        return `<section class="planner-meal ${recipe ? "is-planned" : ""}">
          <h3 class="meal-slot">${slot}</h3>
          ${recipe ? `<a class="planner-photo" href="${recipeUrl(recipe)}" aria-label="View ${esc(recipe.name)}">${recipePhoto(recipe)}</a>
            <h4><a href="${recipeUrl(recipe)}">${esc(recipe.name)}</a></h4>
            <small class="planner-day-detail">${recipe.time} min · ${esc(recipe.difficulty)}</small>`
            : '<p class="meal-empty">No meal selected</p>'}
          <label class="planner-choice" ${recipe ? "hidden" : ""}>
            <span class="sr-only">${slot} — ${day}</span>
            <select data-day="${day}" data-slot="${slot}" id="${id}">
              <option value="">Choose a recipe</option>${options}
            </select>
          </label>
          ${recipe ? `<div class="planner-day-actions">
            <button type="button" class="text-button change-meal" data-day="${day}" data-slot="${slot}" aria-controls="${id}" aria-expanded="false" aria-label="Change ${slot} — ${day}">Change</button>
            <button type="button" class="text-button remove-meal" data-day="${day}" data-slot="${slot}" aria-label="Remove ${slot} — ${day}">Remove</button>
          </div>` : ""}
        </section>`;
      }).join("")}</div></article>`).join("");
    $$("select", grid).forEach((select) => {
      select.value = mealPlan[select.dataset.day]?.[select.dataset.slot] || "";
    });
    renderPlanSummary();
  }

  function renderPlanSummary() {
    if (!$("#plannerSummary")) return;
    const planned = DAYS.flatMap(day => MEAL_SLOTS.map(slot => plannedRecipe(day, slot))).filter(Boolean);
    $("#plannerSummary").textContent = `${planned.length} of 21 meals planned`;
    $("#clearPlan").disabled = !planned.length;
    if ($("#downloadPlan")) $("#downloadPlan").disabled = downloadingPlan || !planned.length;
  }

  // Product examples are alternatives: choose one, then use the recipe quantity.
  const INGREDIENT_GUIDES = [
    {
      match: /\bchopped tomatoes\b/i,
      brands: [["Mutti Polpa", "https://mutti-parma.com/products/polpa/"], ["Cirio Chopped Tomatoes", "https://www.cirio1856.us/products/diced-chopped-tomatoes/"]],
      tip: "Use 400g total, including the juice. Choose plain chopped tomatoes; tomato paste and sweet spaghetti sauce need different amounts."
    },
    {
      match: /\btomato sauce\b/i,
      brands: [["Del Monte Tomato Sauce", "https://www.delmontephil.com/our-products/products"], ["UFC Tomato Sauce", "https://nutriasia.com/brands/ufc/"]],
      tip: "Choose the tomato sauce variant and measure the recipe amount. Sweet spaghetti sauce and concentrated tomato paste will change the flavour and thickness."
    },
    {
      match: /\bsoy sauce\b/i,
      brands: [["Datu Puti Soy Sauce", "https://nutriasia.com/export-operations/"], ["Silver Swan Soy Sauce", "https://nutriasia.com/product_category/soy-sauces/page/2/"]],
      tip: "Use regular soy sauce. Saltiness varies by brand; taste the cooked sauce before adding salt. Sweet or dark soy sauce will change the result."
    },
    {
      match: /\bcane vinegar\b/i,
      brands: [["Datu Puti Cane Vinegar", "https://nutriasia.com/export-operations/"], ["Silver Swan Cane Vinegar", "https://nutriasia.com/product_category/vinegar/"]],
      tip: "Choose plain cane vinegar. Spiced vinegar adds chilli and other flavours that are not included in these recipes."
    },
    {
      match: /\bfish sauce\b|\bpatis\b/i,
      brands: [["Datu Puti Patis", "https://nutriasia.com/export-operations/"], ["Silver Swan Patis", "https://nutriasia.com/products/silver-swan-patis-100ml/"]],
      tip: "Use the measured amount first. Taste the cooked broth before adding more patis or salt, since brands differ in saltiness."
    },
    {
      match: /\boyster sauce\b/i,
      brands: [["Lee Kum Kee Panda Oyster Flavored Sauce", "https://usa.lkk.com/en/foodservices/homecooks/products/panda-brand-oyster-flavored-sauce"], ["Datu Puti Oyster Sauce", "https://nutriasia.com/export-operations/"]],
      tip: "Measure the sauce; it already adds salt and sweetness. Taste before adding extra soy sauce or salt."
    },
    {
      match: /\btamarind soup mix\b/i,
      brands: [["Knorr Sinigang sa Sampalok Original", "https://www.knorr.com/ph/products.html"], ["UFC Sinigang Mix", "https://nutriasia.com/export-operations/"]],
      tip: "Follow your chosen packet's directions for 1.5 litres of broth. Add gradually and taste before adding patis; packet sizes and strengths differ."
    },
    {
      match: /\bcurry powder\b/i,
      tip: "Use mild curry powder. A curry recipe mix or curry paste may contain salt and other seasonings, so it is not a spoon-for-spoon replacement."
    },
    {
      match: /\bstock\b/i,
      tip: "Use prepared liquid stock. If using a cube or powder, dissolve it in water according to the label to make the listed volume; do not use that volume of dry seasoning. Taste before adding salt."
    },
    {
      match: /\bbagoong\b|\bshrimp paste\b/i,
      tip: "Choose sauteed shrimp paste (bagoong alamang). Saltiness and sweetness vary, so taste the cooked dish before adding more."
    },
    {
      match: /\bsalt\b|\bpepper\b|\bpeppercorns\b/i,
      tip: "Use plain salt and black pepper, keeping peppercorns whole when specified. For 'to taste', add a small pinch, stir, and taste once the dish is cooked. Seasoning mixes add other flavours and are not direct replacements."
    }
  ];

  function ingredientGuide(ingredient) {
    const guide = INGREDIENT_GUIDES.find((entry) => entry.match.test(ingredient));
    if (!guide) return "";
    const brands = guide.brands
      ? `<p>Choose one: ${guide.brands.map(([name, url]) => `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(name)}</a>`).join(" or ")}. Other brands of the same product type also work; availability varies by store.</p>`
      : "";
    return `<details class="ingredient-guide"><summary>${guide.brands ? "Brand options & tips" : "Seasoning tip"}</summary>${brands}<p>${esc(guide.tip)}</p></details>`;
  }

  const groceryCheckKey = (slot, ingredient) => JSON.stringify([slot, ingredient]);
  function groceryMeals(scope, slot) {
    const meals = new Map();
    DAYS.forEach(day => {
      if (scope !== "week" && day !== scope) return;
      const recipe = plannedRecipe(day, slot);
      if (!recipe) return;
      if (!meals.has(recipe.id)) meals.set(recipe.id, { recipe, days: [] });
      meals.get(recipe.id).days.push(day);
    });
    return [...meals.values()];
  }
  function groceryItems(scope = $("#groceryDay")?.value || "week", mealSlot = null) {
    const items = new Map();
    DAYS.forEach((day) => {
      if (scope !== "week" && scope !== day) return;
      MEAL_SLOTS.forEach((slot) => {
        if (mealSlot && mealSlot !== slot) return;
        const recipe = plannedRecipe(day, slot);
        if (!recipe) return;
        recipe.ingredients.forEach((ingredient) => {
          const key = ingredient.trim().toLowerCase();
          if (!items.has(key)) items.set(key, { key, checkKey: mealSlot ? groceryCheckKey(mealSlot, key) : null, label: ingredient, days: [] });
          items.get(key).days.push(`${day} (${slot})`);
        });
      });
    });
    return [...items.values()].sort((a, b) => a.label.localeCompare(b.label));
  }

  function renderGroceries() {
    const items = groceryItems();
    // Preserve existing shared checks once, then store them separately per meal.
    const activeItems = MEAL_SLOTS.flatMap(slot => groceryItems("week", slot));
    groceryChecks = new Set(activeItems.filter(item => groceryChecks.has(item.checkKey) || groceryChecks.has(item.key)).map(item => item.checkKey));
    localStorage.setItem(STORAGE_KEYS.groceries, JSON.stringify([...groceryChecks]));
    if (!$("#groceryList")) return;
    const scope = $("#groceryDay")?.value || "week";
    const groups = MEAL_SLOTS.map(slot => ({ slot, items: groceryItems(scope, slot), meals: groceryMeals(scope, slot) }));
    const displayedItems = groups.flatMap(group => group.items);
    $("#groceryList").innerHTML = groups.map((group) => `
      <section class="grocery-meal-section" aria-labelledby="groceries-${group.slot}">
        <header class="grocery-meal-heading">
          <h2 id="groceries-${group.slot}" tabindex="-1">${group.slot}</h2>
          <p class="grocery-cooking-label">What you're cooking</p>
          ${group.meals.length ? `<ul class="grocery-planned-dishes">${group.meals.map(({ recipe, days }) => `
            <li><a href="${recipeUrl(recipe)}">${esc(recipe.name)}</a>${scope === "week" ? `<small>${esc(days.join(", "))}</small>` : ""}</li>
          `).join("")}</ul>` : '<p class="grocery-no-dish">No meal selected</p>'}
          <div class="grocery-meal-controls">
            <p>${group.items.filter(item => groceryChecks.has(item.checkKey)).length} of ${group.items.length} ingredient entries checked</p>
            <button type="button" class="text-button" data-uncheck-meal="${group.slot}" aria-label="Uncheck all ${group.slot} ingredients" ${group.items.some(item => groceryChecks.has(item.checkKey)) ? "" : "disabled"}>Uncheck all</button>
          </div>
        </header>
        ${group.items.length ? `<div class="grocery-meal-items">${group.items.map((item) => `
      <div class="grocery-entry"><label class="grocery-item">
        <input type="checkbox" data-ingredient="${esc(item.key)}" data-check-key="${esc(item.checkKey)}" ${groceryChecks.has(item.checkKey) ? "checked" : ""}>
        <span><strong>${esc(item.label)}</strong>
          <small>${item.days.length > 1 ? `Needed ${item.days.length} times · ` : ""}${esc(item.days.join(", "))}</small>
        </span>
      </label>${ingredientGuide(item.label)}</div>
    `).join("")}</div>` : '<p class="grocery-meal-empty">No ingredients for this meal yet.</p>'}
      </section>`).join("");
    $("#groceryList").hidden = !items.length;
    $("#groceryEmpty").hidden = items.length > 0;
    const scopeLabel = scope === "week" ? "Whole week" : `${scope}'s meals`;
    $("#groceryEmpty h3").textContent = scope === "week" ? "No groceries yet" : `No meals planned for ${scope}`;
    $("#groceryEmpty p").textContent = scope === "week"
      ? "Choose your first meal and its ingredients will appear here."
      : `Add a meal for ${scope} in your meal plan, or select another day.`;
    $("#downloadGroceries").disabled = !items.length;
    $("#grocerySummary").textContent = items.length
      ? `${scopeLabel}: ${displayedItems.filter((item) => groceryChecks.has(item.checkKey)).length} of ${displayedItems.length} ingredient entries checked`
      : `${scopeLabel}: no meals planned.`;
  }

  /* ----------------------------------------------------------------------
     ACCOUNT
     ---------------------------------------------------------------------- */

  (function initAuth() {
    const toggle = $("#authToggle");
    const panel = $("#authPanel");
    const form = $("#authForm");
    const input = $("#authName");
    const guestButton = $("#guestProfile");
    const profileList = $("#profileList");
    const addButton = $("#addProfile");
    const editButton = $("#editProfile");
    const error = $("#profileError");
    let editingId = null;
    if (!toggle || !panel || !form || !input || !profileStore) return;

    function avatarMarkup(avatar, extra = "") {
      return `<span class="profile-avatar ${extra}" aria-hidden="true">${esc(avatar)}</span>`;
    }

    function syncAuth() {
      profile = profileStore.active();
      toggle.innerHTML = `${avatarMarkup(profile?.avatar || "👤")}<span class="profile-toggle-name" ${profile ? 'translate="no"' : ""}>${esc(profile?.name || "Profile")}</span>`;
      $("#profileCurrent").innerHTML = `${avatarMarkup(profile?.avatar || "👤", "profile-avatar-large")}<div><strong ${profile ? 'translate="no"' : ""}>${esc(profile?.name || "Guest")}</strong><p>On this browser</p></div>`;
      profileList.innerHTML = profileStore.list().map((item) => `
        <button type="button" class="profile-option" data-profile-id="${esc(item.id)}" aria-pressed="${item.id === profile?.id}">
          ${avatarMarkup(item.avatar)}<span class="profile-option-name" translate="no">${esc(item.name)}</span>
          ${item.id === profile?.id ? '<small>Active</small>' : '<small>Switch</small>'}
        </button>`).join("");
      editButton.hidden = !profile;
      guestButton.hidden = !profile;
      error.textContent = "";
      renderSavedRecipes();
      updateRecipeSaveButtons();
    }

    function showForm(editing) {
      editingId = editing ? profile.id : null;
      form.hidden = false;
      input.value = editing ? profile.name : "";
      $("#profileFormTitle").textContent = editing ? "Edit profile" : "Add a profile";
      $("#profileSave").textContent = editing ? "Save changes" : "Create profile";
      const avatar = editing ? profile.avatar : profileStore.avatars[0];
      $("#profileAvatars").innerHTML = profileStore.avatars.map((item, index) => `<label class="avatar-choice"><input type="radio" name="avatar" value="${esc(item)}" ${item === avatar ? "checked" : ""} required><span aria-hidden="true">${esc(item)}</span><span class="sr-only">${["Person", "Woman chef", "Man chef", "Avocado", "Frying pan", "Strawberry"][index]}</span></label>`).join("");
      error.textContent = "";
      input.focus();
    }

    function changeProfile(id) {
      try {
        profileStore.select(id);
        window.location.reload();
      } catch { error.textContent = "Could not save the profile. Check your browser storage and try again."; }
    }

    addButton.addEventListener("click", () => showForm(false));
    editButton.addEventListener("click", () => showForm(true));
    $("#cancelProfile").addEventListener("click", () => { form.hidden = true; error.textContent = ""; addButton.focus(); });
    guestButton.addEventListener("click", () => changeProfile(null));
    profileList.addEventListener("click", (event) => {
      const button = event.target.closest("[data-profile-id]");
      if (button && button.dataset.profileId !== profile?.id) changeProfile(button.dataset.profileId);
    });

    toggle.addEventListener("click", () => {
      const open = panel.hidden;
      panel.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
      if (open) ($(".profile-option", profileList) || addButton).focus();
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = input.value.trim();
      if (!name) { error.textContent = "Enter a profile name."; input.focus(); return; }
      const avatar = $('input[name="avatar"]:checked', form)?.value;
      try {
        if (editingId) {
          profileStore.update(editingId, name, avatar);
          form.hidden = true;
          syncAuth();
          editButton.focus();
        } else {
          profileStore.create(name, avatar);
          window.location.reload();
        }
      } catch { error.textContent = "Could not save the profile. Check your browser storage and try again."; }
    });

    document.addEventListener("click", (e) => {
      if (panel.hidden || e.target.closest("#authBox")) return;
      panel.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !panel.hidden) {
        panel.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });

    syncAuth();
  })();

  /* ----------------------------------------------------------------------
     THEME
     ---------------------------------------------------------------------- */

  (function initTheme() {
    const toggle = $("#themeToggle");
    if (!toggle) return;
    const root = document.documentElement;
    const icon = $(".theme-icon", toggle);
    const stored = localStorage.getItem("kitchenpath-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const start = stored || (prefersDark ? "dark" : "light");

    function apply(theme) {
      root.setAttribute("data-theme", theme);
      const dark = theme === "dark";
      if (icon) icon.textContent = dark ? "☀️" : "🌙";
      toggle.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
      localStorage.setItem("kitchenpath-theme", theme);
    }

    apply(start);
    toggle.addEventListener("click", () => {
      apply(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  })();

  /* ----------------------------------------------------------------------
     NAVIGATION
     ---------------------------------------------------------------------- */

  (function initNav() {
    const toggle = $("#navToggle");
    const nav = $("#primaryNav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });

    // Close the mobile menu after choosing a link.
    $$("a", nav).forEach((link) => {
      link.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      });
    });

    // Each feature has its own document, so highlight the current page.
    $$("a", nav).forEach((link) => {
      const page = document.body.dataset.page === "recipe.html" ? "recipes.html" : document.body.dataset.page;
      const active = link.getAttribute("href") === page;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "page");
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  })();

  /* Shared recipe actions, available from cards, saved recipes, and details. */
  const notice = document.createElement("p");
  notice.className = "app-notice";
  notice.setAttribute("role", "status");
  notice.hidden = true;
  document.body.appendChild(notice);
  let noticeTimer;
  function announce(message, href, label) {
    clearTimeout(noticeTimer);
    notice.innerHTML = `${esc(message)}${href ? ` <a href="${esc(href)}">${esc(label)}</a>` : ""}`;
    notice.hidden = false;
    noticeTimer = setTimeout(() => { notice.hidden = true; }, 10000);
  }

  (function initRecipeActions() {
    const dialog = document.createElement("dialog");
    dialog.id = "planDialog";
    dialog.className = "plan-dialog";
    dialog.setAttribute("aria-labelledby", "planDialogTitle");
    dialog.innerHTML = `<form id="addPlanForm">
      <h2 id="planDialogTitle">Add to meal plan</h2>
      <p id="planRecipeName"></p>
      <label for="planDay">Choose a day</label>
      <select id="planDay" name="day">${DAYS.map((day) => `<option value="${day}">${day}</option>`).join("")}</select>
      <label for="planSlot">Choose a meal</label>
      <select id="planSlot" name="slot">${MEAL_SLOTS.map(slot => `<option value="${slot}">${slot}</option>`).join("")}</select>
      <p id="planReplacement" role="status"></p>
      <div class="dialog-actions"><button type="button" class="btn btn-ghost" id="cancelPlan">Cancel</button>
      <button type="submit" class="btn btn-primary" id="confirmPlan">Add meal</button></div>
    </form>`;
    document.body.appendChild(dialog);
    let selectedRecipe;
    let opener;
    function syncReplacement() {
      const current = plannedRecipe($("#planDay").value, $("#planSlot").value);
      $("#planReplacement").textContent = current
        ? `Currently planned: ${current.name}. ${current.id === selectedRecipe.id ? "This meal is already selected." : "Adding this recipe will replace it."}`
        : "This meal slot is empty.";
      $("#confirmPlan").textContent = current && current.id !== selectedRecipe.id ? "Replace meal" : "Add meal";
      $("#confirmPlan").disabled = current?.id === selectedRecipe.id;
    }
    $("#planDay").addEventListener("change", syncReplacement);
    $("#planSlot").addEventListener("change", syncReplacement);
    $("#cancelPlan").addEventListener("click", () => dialog.close());
    dialog.addEventListener("close", () => opener?.focus());
    $("#addPlanForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const day = $("#planDay").value;
      if (!selectedRecipe || !DAYS.includes(day)) return;
      const slot = $("#planSlot").value;
      if (!MEAL_SLOTS.includes(slot)) return;
      setPlannedMeal(day, slot, selectedRecipe.id);
      saveMealPlan();
      renderPlanner();
      dialog.close();
      announce(`${selectedRecipe.name} added for ${day} (${slot}).`, "planner.html", "View meal plan");
    });
    document.addEventListener("click", (event) => {
      const save = event.target.closest(".save-recipe");
      if (save && recipeById(save.dataset.id)) {
        const id = save.dataset.id;
        if (savedRecipes.has(id)) savedRecipes.delete(id);
        else savedRecipes.add(id);
        saveSavedRecipes();
        updateRecipeSaveButtons();
        renderSavedRecipes();
        announce(savedRecipes.has(id) ? "Recipe saved in this browser." : "Recipe removed from saved.", "saved.html", "View saved recipes");
      }
      const add = event.target.closest(".add-to-plan");
      if (!add) return;
      selectedRecipe = recipeById(add.dataset.id);
      if (!selectedRecipe) return;
      opener = add;
      mealPlan = readMealPlan();
      $("#planSlot").value = MEAL_SLOTS.includes(selectedRecipe.category) ? selectedRecipe.category : "Dinner";
      $("#planRecipeName").textContent = selectedRecipe.name;
      $("#planDay").value = DAYS.find((day) => !plannedRecipe(day, $("#planSlot").value)) || DAYS[0];
      syncReplacement();
      dialog.showModal();
    });
  })();

  function renderRecipeDetail(detail, recipe, modal = false) {
    const titleTag = modal ? "h2" : "h1";
    const sectionTag = modal ? "h3" : "h2";
    const prefix = modal ? "modal-" : "";
    detail.innerHTML = `
      ${modal ? "" : '<a class="back-link" href="recipes.html">&larr; All recipes</a>'}
      <div class="recipe-detail-header">
        <figure>${recipePhoto(recipe, true)}<figcaption>${photoCaption(recipe)}</figcaption></figure>
        <div class="recipe-detail-copy"><p class="recipe-category">${esc(recipeCategory(recipe))} · ${esc(recipe.difficulty)}</p>
          <${titleTag} id="${prefix}recipeTitle">${esc(recipe.name)}</${titleTag}><p>${esc(recipe.blurb)}</p>
          <p class="recipe-food-tags"><span class="tag tag-food">${esc(recipeFoodLabel(recipe))}</span></p>
          <ul class="recipe-facts"><li><b>${recipe.time} min</b><span>Total time</span></li><li><b>${SERVINGS[recipe.id]}</b><span>Servings (approx.)</span></li></ul>
          ${recipe.timeNote ? `<p class="device-note">${esc(recipe.timeNote)}</p>` : ""}
          <div class="detail-actions"><button class="btn btn-primary add-to-plan" data-id="${esc(recipe.id)}" type="button">Add to meal plan</button>
          ${window.KITCHENPATH_TUTORIALS?.[recipe.id] ? `<button class="btn btn-ghost watch-tutorial" data-id="${esc(recipe.id)}" type="button">Watch tutorial</button>` : ""}
          <button class="btn btn-ghost print-recipe" data-id="${esc(recipe.id)}" type="button">Print / Save PDF</button>
          <button class="save-recipe" data-id="${esc(recipe.id)}" type="button" aria-pressed="false">Save</button></div>
          <p class="device-note recipe-print-note">Print this recipe or choose Save as PDF to keep it on your device.</p>
        </div>
      </div>
      <div class="recipe-cooking-layout">
        <section class="ingredient-section" aria-labelledby="${prefix}ingredientHeading"><${sectionTag} id="${prefix}ingredientHeading">Ingredients</${sectionTag}>
          <p class="device-note">Amounts make about ${SERVINGS[recipe.id]} serving${SERVINGS[recipe.id] === 1 ? "" : "s"}.</p>
          <ul class="detail-ingredients">${recipe.ingredients.map((ingredient) => `<li><span class="ingredient-text">${esc(ingredient)}</span>${ingredientGuide(ingredient)}</li>`).join("")}</ul>
        </section>
        <section aria-labelledby="${prefix}methodHeading"><${sectionTag} id="${prefix}methodHeading">Instructions</${sectionTag}>
          <ol class="method-list">${recipe.steps.map((step) => `<li>${esc(step)}</li>`).join("")}</ol>
        </section>
      </div>`;
    updateRecipeSaveButtons();
  }

  (function initRecipeDetail() {
    const detail = $("#recipeDetail");
    if (!detail) return;
    const recipe = recipeById(new URLSearchParams(window.location.search).get("id"));
    if (!recipe) {
      document.title = "Recipe not found — KitchenPath";
      detail.innerHTML = '<h1>Recipe not found</h1><p>This link does not match a recipe in our library.</p><a class="btn btn-primary" href="recipes.html">Browse recipes</a>';
      return;
    }
    document.title = `${recipe.name} — KitchenPath`;
    renderRecipeDetail(detail, recipe);
  })();

  (function initRecipePrinting() {
    const printout = document.createElement("article");
    printout.id = "recipePrintout";
    printout.className = "recipe-printout";
    document.body.appendChild(printout);
    function prepare() {
      const source = $("#recipeDialog[open] .recipe-dialog-content") || $("#recipeDetail");
      if (!source?.querySelector(".recipe-cooking-layout")) return false;
      printout.replaceChildren();
      const brand = document.createElement("p");
      brand.className = "print-brand";
      brand.textContent = "KitchenPath";
      printout.appendChild(brand);
      for (const selector of [".recipe-detail-header", ".recipe-cooking-layout"]) {
        const copy = source.querySelector(selector).cloneNode(true);
        copy.querySelectorAll(".detail-actions, .recipe-print-note, .ingredient-guide").forEach(el => el.remove());
        copy.querySelectorAll("[id], [aria-labelledby]").forEach(el => {
          el.removeAttribute("id"); el.removeAttribute("aria-labelledby");
        });
        printout.appendChild(copy);
      }
      document.body.classList.add("printing-recipe");
      return true;
    }
    function cleanup() {
      document.body.classList.remove("printing-recipe");
      printout.replaceChildren();
    }
    window.addEventListener("beforeprint", prepare);
    window.addEventListener("afterprint", cleanup);
    document.addEventListener("click", event => {
      if (!event.target.closest(".print-recipe") || !prepare()) return;
      try { window.print(); } catch { cleanup(); }
    });
  })();

  (function initRecipePopup() {
    const dialog = document.createElement("dialog");
    dialog.id = "recipeDialog";
    dialog.className = "recipe-dialog";
    dialog.setAttribute("aria-labelledby", "modal-recipeTitle");
    dialog.innerHTML = `<div class="recipe-dialog-toolbar"><span>Recipe</span><button type="button" class="btn btn-ghost btn-small" id="closeRecipeDialog" autofocus>Close <span aria-hidden="true">&times;</span></button></div><div class="recipe-dialog-content"></div>`;
    document.body.appendChild(dialog);
    const content = $(".recipe-dialog-content", dialog);
    let opener;
    $("#closeRecipeDialog").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", () => {
      document.body.classList.remove("recipe-modal-open");
      opener?.focus({ preventScroll: true });
    });
    document.addEventListener("click", (event) => {
      const link = event.target.closest('a[href^="recipe.html?id="]');
      if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || (event.button && event.button !== 0)) return;
      const recipe = recipeById(new URLSearchParams(link.getAttribute("href").split("?")[1]).get("id"));
      if (!recipe) return;
      event.preventDefault();
      opener = link;
      renderRecipeDetail(content, recipe, true);
      dialog.showModal();
      document.body.classList.add("recipe-modal-open");
      content.scrollTop = 0;
    });
  })();

  (function initTutorialPopup() {
    const dialog = document.createElement("dialog");
    dialog.id = "tutorialDialog";
    dialog.className = "tutorial-dialog";
    dialog.setAttribute("aria-labelledby", "tutorialHeading");
    dialog.innerHTML = `<div class="tutorial-toolbar"><h2 id="tutorialHeading">Video tutorial</h2>
      <button class="btn btn-ghost btn-small" id="closeTutorial" type="button" autofocus>Close tutorial</button></div>
      <div class="tutorial-content"><h3 id="tutorialRecipe"></h3>
      <p class="tutorial-credit" id="tutorialCredit" translate="no"></p>
      <div class="tutorial-player" id="tutorialPlayer"></div>
      <p class="device-note">This creator's version may use different ingredients or quantities. Follow the written recipe for your planned portions.</p>
      <div class="tutorial-footer"><p>If the video will not play here, open it on YouTube.</p>
      <a class="btn btn-primary" id="tutorialYouTube" target="_blank" rel="noopener noreferrer">Open on YouTube</a></div></div>`;
    document.body.appendChild(dialog);
    let opener;
    function stop() { $("#tutorialPlayer").replaceChildren(); }
    $("#closeTutorial").addEventListener("click", () => dialog.close());
    $("#tutorialYouTube").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
    dialog.addEventListener("close", () => {
      stop();
      document.body.classList.remove("tutorial-modal-open");
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    });
    document.addEventListener("click", event => {
      const button = event.target.closest(".watch-tutorial");
      if (!button) return;
      const recipe = recipeById(button.dataset.id);
      const tutorial = window.KITCHENPATH_TUTORIALS?.[recipe?.id];
      if (!tutorial || !/^[A-Za-z0-9_-]{11}$/.test(tutorial.videoId)) return;
      opener = button;
      $("#tutorialRecipe").textContent = recipe.name;
      $("#tutorialCredit").textContent = `${tutorial.title} · ${tutorial.creator}`;
      $("#tutorialYouTube").href = `https://www.youtube.com/watch?v=${tutorial.videoId}`;
      stop();
      const frame = document.createElement("iframe");
      frame.title = translate("Video tutorial");
      frame.src = `https://www.youtube-nocookie.com/embed/${tutorial.videoId}?autoplay=1&rel=0&playsinline=1`;
      frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen";
      frame.allowFullscreen = true;
      frame.referrerPolicy = "strict-origin-when-cross-origin";
      $("#tutorialPlayer").appendChild(frame);
      dialog.showModal();
      document.body.classList.add("tutorial-modal-open");
    });
  })();

  /* ----------------------------------------------------------------------
     SKILL CARDS — click / keyboard to expand
     ---------------------------------------------------------------------- */

  /* ----------------------------------------------------------------------
     RECIPES — render, search, filter
     ---------------------------------------------------------------------- */

  (function initRecipes() {
    const grid = $("#recipeGrid");
    if (!grid) return;

    const searchInput = $("#recipeSearch");
    const filterWrap = $("#recipeFilters");
    const countEl = $("#recipeCount");
    const emptyEl = $("#emptyState");

    let activeCategory = "All";
    let query = "";
    let currentPage = 1;
    const pageSize = 12;
    const cuisine = $("#recipeCuisine");
    const foodType = $("#recipeFoodType");

    // Build filter chips.
    CATEGORIES.forEach((cat) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chip";
      btn.textContent = cat;
      btn.dataset.category = cat;
      btn.setAttribute("aria-pressed", String(cat === "All"));
      btn.addEventListener("click", () => {
        activeCategory = cat;
        currentPage = 1;
        $$(".chip", filterWrap).forEach((c) =>
          c.setAttribute("aria-pressed", String(c.dataset.category === cat))
        );
        render();
      });
      filterWrap.appendChild(btn);
    });

    function matches(recipe) {
      const inCategory = activeCategory === "All" || recipeCategory(recipe) === activeCategory;
      if (!inCategory) return false;
      if (cuisine?.value === "filipino" && recipe.cuisine !== "Filipino") return false;
      if (foodType?.value && foodType.value !== "all" && recipeFoodType(recipe) !== foodType.value) return false;
      if (!query) return true;

      const haystack = [recipe.name, recipe.category, recipeCategory(recipe), recipeFoodLabel(recipe), recipe.cuisine || "", recipe.blurb, ...(recipe.aliases || []), ...recipe.ingredients]
        .join(" ")
        .toLowerCase();
      const localized = [recipe.name, recipe.category, recipeCategory(recipe), recipeFoodLabel(recipe), recipe.blurb, ...recipe.ingredients]
        .map((text) => window.KitchenPathI18n?.translate(text, true) ?? text).join(" ").toLowerCase();
      return haystack.includes(query) || localized.includes(query);
    }

    function cardMarkup(recipe) {
      return `
        <article class="recipe-card" data-id="${esc(recipe.id)}">
          <a class="recipe-thumb" href="${recipeUrl(recipe)}" aria-label="View ${esc(recipe.name)}">${recipePhoto(recipe)}</a>
          <div class="recipe-body">
            <div class="recipe-meta">
              <span class="tag">${esc(recipeCategory(recipe))}</span>
              <span class="tag tag-alt">${esc(recipe.difficulty)}</span>
              ${recipe.cuisine ? `<span class="tag tag-alt">${esc(recipe.cuisine)}</span>` : ""}
            </div>
            <h3><a href="${recipeUrl(recipe)}">${esc(recipe.name)}</a></h3>
            <p class="recipe-food-tags"><span class="tag tag-food">${esc(recipeFoodLabel(recipe))}</span></p>
            <p class="recipe-blurb">${esc(recipe.blurb)}</p>

            <ul class="recipe-facts">
              <li><b>${recipe.time} min</b><span>Time</span></li>
              <li><b>${SERVINGS[recipe.id]}</b><span>Servings (approx.)</span></li>
            </ul>

            <div class="recipe-details">
              <a class="btn btn-ghost btn-small" href="${recipeUrl(recipe)}">View recipe</a>
              <button type="button" class="save-recipe" data-id="${esc(recipe.id)}" aria-label="Save ${esc(recipe.name)}" aria-pressed="false">Save</button>
              <button type="button" class="text-button add-to-plan" data-id="${esc(recipe.id)}">Add to meal plan</button>
            </div>
          </div>
        </article>
      `;
    }

    function render() {
      const results = RECIPES.filter(matches);
      const pageCount = Math.max(1, Math.ceil(results.length / pageSize));
      currentPage = Math.min(currentPage, pageCount);
      const start = (currentPage - 1) * pageSize;
      grid.innerHTML = results.slice(start, start + pageSize).map(cardMarkup).join("");
      emptyEl.hidden = results.length > 0;
      countEl.textContent = results.length
        ? `Showing ${start + 1}–${Math.min(start + pageSize, results.length)} of ${results.length} recipes`
        : "No recipes found";
      $("#recipePagination").hidden = results.length <= pageSize;
      $("#recipePageLabel").textContent = `Page ${currentPage} of ${pageCount}`;
      $("#previousRecipes").disabled = currentPage === 1;
      $("#nextRecipes").disabled = currentPage === pageCount;

      // Stagger the entrance animation slightly.
      $$(".recipe-card", grid).forEach((card, i) => {
        card.style.animationDelay = Math.min(i * 35, 350) + "ms";
      });
      updateRecipeSaveButtons();
    }

    // Debounced search.
    let timer;
    searchInput.addEventListener("input", () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        query = searchInput.value.trim().toLowerCase();
        currentPage = 1;
        render();
      }, 140);
    });

    cuisine?.addEventListener("change", () => { currentPage = 1; render(); });
    foodType?.addEventListener("change", () => { currentPage = 1; render(); });
    function turnPage(change) {
      currentPage += change;
      render();
      $("#recipes").scrollIntoView({ block: "start", behavior: "instant" });
      searchInput.focus({ preventScroll: true });
    }
    $("#previousRecipes").addEventListener("click", () => turnPage(-1));
    $("#nextRecipes").addEventListener("click", () => turnPage(1));

    render();
  })();

  /* ----------------------------------------------------------------------
     SAVED RECIPES
     ---------------------------------------------------------------------- */

  (function initSavedRecipes() {
    const grid = $("#savedGrid");
    if (!grid) return;

    grid.addEventListener("click", (e) => {
      const btn = e.target.closest(".remove-saved");
      if (!btn) return;
      savedRecipes.delete(btn.dataset.id);
      saveSavedRecipes();
      renderSavedRecipes();
      updateRecipeSaveButtons();
      announce("Recipe removed from saved.");
      ($(".remove-saved", grid) || $("#savedEmpty a"))?.focus();
    });

    renderSavedRecipes();
  })();

  /* ----------------------------------------------------------------------
     MEAL PLANNER
     ---------------------------------------------------------------------- */

  (function initPlanner() {
    const grid = $("#plannerGrid");
    if (!grid) return;

    grid.addEventListener("change", (e) => {
      const select = e.target.closest("select");
      if (!select) return;
      const { day, slot } = select.dataset;
      setPlannedMeal(day, slot, select.value);
      saveMealPlan();
      renderPlanner();
      const focusTarget = $(`.change-meal[data-day="${day}"][data-slot="${slot}"]`) || $(`#meal-${day}-${slot}`);
      focusTarget?.focus();
      $("#plannerStatus").textContent = "Plan updated. Open Groceries to see your checklist.";
    });

    $("#downloadPlan").addEventListener("click", async () => {
      if (downloadingPlan) return;
      downloadingPlan = true;
      renderPlanSummary();
      const status = $("#planDownloadStatus");
      status.textContent = "Preparing your plan image…";
      try {
        const rows = DAYS.map(day => ({
          label: translate(day),
          meals: MEAL_SLOTS.map(slot => {
            const recipe = plannedRecipe(day, slot);
            return recipe ? {
              name: translate(recipe.name),
              meta: translate(`${recipe.time} min`),
              photo: recipe.photo === null ? null : `images/recipes/${recipe.id}.jpg`
            } : null;
          })
        }));
        const plannedCount = rows.flatMap(row => row.meals).filter(Boolean).length;
        const blob = await window.KitchenPathPlanExport.render({
          title: translate("Weekly meal plan"),
          subtitle: `${translate("Breakfast, lunch & dinner")} · ${plannedCount}/21`,
          columns: MEAL_SLOTS.map(slot => translate(slot)), rows,
          emptyLabel: translate("Not planned"),
          footer: translate("Keep this image on your phone or print it for your kitchen."),
          creditsFooter: `${translate("Photo credits and licenses")}: kitchenpath.onrender.com/images/credits.json`
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url; link.download = "kitchenpath-weekly-meal-plan.png";
        document.body.appendChild(link); link.click(); link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 30000);
        status.textContent = "Your PNG is ready. Check your downloads.";
      } catch {
        status.textContent = "Could not create the image. Please try downloading again.";
      } finally {
        downloadingPlan = false;
        renderPlanSummary();
      }
    });

    grid.addEventListener("click", (event) => {
      const change = event.target.closest(".change-meal");
      if (change) {
        const choice = change.closest(".planner-meal").querySelector(".planner-choice");
        choice.hidden = !choice.hidden;
        change.setAttribute("aria-expanded", String(!choice.hidden));
        if (!choice.hidden) $("select", choice).focus();
      }
      const remove = event.target.closest(".remove-meal");
      if (!remove) return;
      const { day, slot } = remove.dataset;
      setPlannedMeal(day, slot, null);
      saveMealPlan();
      renderPlanner();
      $(`#meal-${day}-${slot}`).focus();
      $("#plannerStatus").textContent = `${day} (${slot}) removed. Your grocery list has been updated.`;
    });

    const preferences = readJSON(STORAGE_KEYS.preferences, {});
    if ([15, 20, 30, 60, 120, 180].includes(Number(preferences.time))) $("#plannerTime").value = preferences.time;
    if (["beginner", "all"].includes(preferences.difficulty)) $("#plannerDifficulty").value = preferences.difficulty;
    if (["all", "filipino"].includes(preferences.cuisine)) $("#plannerCuisine").value = preferences.cuisine;

    function syncPreferenceSummary() {
      const time = Number($("#plannerTime").value);
      $("#preferenceTime").textContent = time < 120 ? `Up to ${time} minutes` : `Up to ${time / 60} hours`;
      $("#preferenceDifficulty").textContent = $("#plannerDifficulty").value === "beginner" ? "Beginner" : "All levels";
      $("#preferenceCuisine").textContent = $("#plannerCuisine").value === "filipino" ? "Filipino" : "Any cuisine";
    }
    $("#plannerPreferences").addEventListener("change", syncPreferenceSummary);
    syncPreferenceSummary();

    $("#plannerPreferences").addEventListener("submit", (event) => {
      event.preventDefault();
      const time = Number($("#plannerTime").value);
      const difficulty = $("#plannerDifficulty").value;
      const cuisine = $("#plannerCuisine").value;
      localStorage.setItem(STORAGE_KEYS.preferences, JSON.stringify({ time, difficulty, cuisine }));
      const emptySlots = window.KitchenPathMealPlan.entries(mealPlan).filter(({ day, slot }) => !plannedRecipe(day, slot));
      if (!emptySlots.length) {
        $("#plannerStatus").textContent = "Your week is full. Remove a meal to get a new suggestion.";
        return;
      }
      let added = 0;
      for (const slot of MEAL_SLOTS) {
        const candidates = RECIPES.filter(recipe => recipe.category === slot
          && (cuisine !== "filipino" || recipe.cuisine === "Filipino")
          && recipe.time <= time && (difficulty === "all" || recipe.difficulty !== "Medium"));
        for (let i = candidates.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
        }
        if (!candidates.length) continue;
        emptySlots.filter(entry => entry.slot === slot).forEach(({ day }, index) => {
          setPlannedMeal(day, slot, candidates[index % candidates.length].id);
          added++;
        });
      }
      renderPlanner();
      saveMealPlan();
      if (added < emptySlots.length) {
        $("#plannerStatus").textContent = `Added ${added} meals. ${emptySlots.length - added} slots have no matching recipes. Allow more time or change cuisine.`;
        return;
      }
      $("#plannerStatus").textContent = `Added ${added} meal suggestions. You can change any meal.`;
      $("#plannerSuggestions").open = false;
      $("#plannerSuggestionsToggle").focus({ preventScroll: true });
    });

    $("#clearPlan").addEventListener("click", () => {
      mealPlan = {};
      renderPlanner();
      saveMealPlan();
      $("#plannerStatus").textContent = "Week cleared. Choose a meal or suggest a fresh plan.";
    });

    renderPlanner();
    // Prune checks for ingredients removed from the plan, including on this page.
    renderGroceries();
  })();

  (function initGroceries() {
    const list = $("#groceryList");
    if (!list) return;
    const daySelect = $("#groceryDay");
    daySelect.value = DAYS[(new Date().getDay() + 6) % 7];
    daySelect.addEventListener("change", renderGroceries);

    list.addEventListener("change", (event) => {
      const input = event.target.closest("input[data-ingredient]");
      if (!input) return;
      const key = input.dataset.checkKey;
      if (input.checked) groceryChecks.add(key);
      else groceryChecks.delete(key);
      localStorage.setItem(STORAGE_KEYS.groceries, JSON.stringify([...groceryChecks]));
      renderGroceries();
      $$("input[data-check-key]", list).find(input => input.dataset.checkKey === key)?.focus({ preventScroll: true });
    });

    list.addEventListener("click", event => {
      const button = event.target.closest("[data-uncheck-meal]");
      const slot = button?.dataset.uncheckMeal;
      if (!MEAL_SLOTS.includes(slot)) return;
      groceryItems(daySelect.value, slot).forEach(item => groceryChecks.delete(item.checkKey));
      localStorage.setItem(STORAGE_KEYS.groceries, JSON.stringify([...groceryChecks]));
      renderGroceries();
      $(`#groceries-${slot}`).focus({ preventScroll: true });
    });

    $("#downloadGroceries").addEventListener("click", () => {
      const lines = MEAL_SLOTS.flatMap(slot => {
        const items = groceryItems(daySelect.value, slot);
        const meals = groceryMeals(daySelect.value, slot);
        const dishes = meals.map(({ recipe, days }) => `${translate(recipe.name)}${daySelect.value === "week" ? ` — ${translate(days.join(", "))}` : ""}`);
        return [translate(slot), translate("What you're cooking"), ...(dishes.length ? dishes : [translate("No meal selected")]), "", ...(items.length ? items.map(item =>
          `${groceryChecks.has(item.checkKey) ? "[x]" : "[ ]"} ${translate(item.label)} — ${translate(`${item.days.length} recipe use(s)`)}: ${translate(item.days.join(", "))}`)
          : [translate("No ingredients for this meal yet.")]), ""];
      });
      const scopeLabel = daySelect.value === "week" ? "Whole week" : daySelect.value;
      const text = [translate(`KitchenPath grocery list — ${scopeLabel}`), translate("Amounts are per recipe use; adjust for portions and repeated meals."), translate("Checks are separate for breakfast, lunch, and dinner."), "", ...lines].join("\n");
      const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = "kitchenpath-groceries.txt";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });

    renderGroceries();
  })();

  /* ----------------------------------------------------------------------
     HERO — rotating meal suggestion
     ---------------------------------------------------------------------- */

  (function initHero() {
    const btn = $("#shuffleMeal");
    const card = $(".hero-card");
    const mealEl = $("#heroMeal");
    const descEl = $("#heroMealDesc");
    if (!btn || !card) return;

    let index = 0;

    btn.addEventListener("click", () => {
      index = (index + 1) % HERO_MEALS.length;
      const next = HERO_MEALS[index];

      card.classList.add("is-swapping");
      setTimeout(() => {
        mealEl.textContent = next.name;
        descEl.textContent = next.desc;
        card.classList.remove("is-swapping");
      }, 220);
    });
  })();

  /* ----------------------------------------------------------------------
     GLOSSARY
     ---------------------------------------------------------------------- */

  (function initGlossary() {
    const list = $("#glossaryList");
    if (!list) return;
    list.innerHTML = GLOSSARY.map(
      (item) => `
        <details class="glossary-item">
          <summary>${esc(item.term)}</summary>
          <p>${esc(item.def)}</p>
        </details>
      `
    ).join("");
  })();

  /* ----------------------------------------------------------------------
     FAQ — accordion
     ---------------------------------------------------------------------- */

  (function initFaq() {
    const list = $("#faqList");
    if (!list) return;

    list.innerHTML = FAQS.map(
      (item, i) => `
        <div class="faq-item">
          <button type="button" class="faq-question" aria-expanded="false" aria-controls="faq-a-${i}">
            <span>${esc(item.q)}</span>
            <span class="plus" aria-hidden="true">+</span>
          </button>
          <div class="faq-answer" id="faq-a-${i}">
            <p>${esc(item.a)}</p>
          </div>
        </div>
      `
    ).join("");

    list.addEventListener("click", (e) => {
      const btn = e.target.closest(".faq-question");
      if (!btn) return;
      const item = btn.closest(".faq-item");
      const open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    });
  })();

  /* ----------------------------------------------------------------------
     BACK TO TOP
     ---------------------------------------------------------------------- */

  (function initToTop() {
    const btn = $("#toTop");
    if (!btn) return;

    const update = () => { btn.hidden = window.scrollY < 600; };
    window.addEventListener("scroll", update, { passive: true });
    update();

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  })();

})();
