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
    {
      id: "garlic-butter-pasta",
      name: "Garlic Butter Pasta",
      icon: "🍝",
      category: "Dinner",
      time: 15,
      difficulty: "Very easy",
      blurb: "Four ingredients, one pot, and almost impossible to ruin.",
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
      blurb: "The first thing everyone should learn. Low heat is the whole secret.",
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
      blurb: "Everything goes in one pan. Great for people who hate doing dishes.",
      ingredients: ["2 chicken thighs", "1 cup rice", "2 cups stock or water", "1 onion"],
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
      blurb: "A 3-ingredient lunch that tastes like you tried harder than you did.",
      ingredients: ["2 slices bread", "1 ripe tomato", "1 clove garlic", "Olive oil"],
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
      blurb: "The best way to use up whatever vegetables are in the fridge.",
      ingredients: ["Any vegetables you have", "2 tbsp soy sauce", "1 tsp sugar", "Rice to serve"],
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
      blurb: "Five pantry ingredients and a good lesson in not over-mixing.",
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
      blurb: "Better than jarred, and it freezes beautifully for later.",
      ingredients: ["1 can chopped tomatoes", "1 onion", "2 cloves garlic", "Olive oil"],
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
      blurb: "Forgiving by design — you basically cannot overcook soup.",
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
      blurb: "The technique that makes vegetables taste good to people who hate vegetables.",
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
      blurb: "Crispy outside, melted inside, and ready before you finish setting the table.",
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
      blurb: "Looks impressive, takes minutes, and teaches you how to cook fish.",
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
      blurb: "A formula, not a recipe. Learn it once and never wonder what to eat again.",
      ingredients: ["1 cup cooked rice", "1 egg", "Soy sauce", "Any leftover vegetables"],
      steps: [
        "Warm the rice in a bowl.",
        "Fry an egg in a hot pan until the edges are crisp.",
        "Put the egg on the rice and add whatever vegetables you have.",
        "Finish with soy sauce and stir everything together."
      ]
    }
  ];

  const CATEGORIES = ["All", "Breakfast", "Lunch", "Dinner", "Side", "Snack"];
  const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const STORAGE_KEYS = {
    profile: "kitchenpath-profile",
    saved: "kitchenpath-saved-recipes",
    plan: "kitchenpath-meal-plan"
  };

  const HERO_MEALS = [
    { name: "Garlic Butter Pasta", desc: "Four ingredients, one pot, and almost impossible to ruin." },
    { name: "Soft Scrambled Eggs", desc: "Five minutes, one pan, and the perfect lesson in low heat." },
    { name: "Cheese Quesadilla", desc: "Crispy, cheesy, and ready in the time it takes to set the table." },
    { name: "Everything Stir-Fry", desc: "Use up every vegetable in the fridge — nothing gets wasted." },
    { name: "Garlic Tomato Toast", desc: "Three ingredients that taste like you tried much harder." },
    { name: "Loaded Rice Bowl", desc: "A formula for dinner you can repeat forever with anything on hand." }
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
  let profile = readJSON(STORAGE_KEYS.profile, null);
  let savedRecipes = new Set(readJSON(STORAGE_KEYS.saved, []));
  let mealPlan = readJSON(STORAGE_KEYS.plan, {});

  function saveSavedRecipes() {
    localStorage.setItem(STORAGE_KEYS.saved, JSON.stringify([...savedRecipes]));
  }

  function saveMealPlan() {
    localStorage.setItem(STORAGE_KEYS.plan, JSON.stringify(mealPlan));
  }

  function openAuthPanel() {
    const panel = $("#authPanel");
    const toggle = $("#authToggle");
    if (!panel || !toggle) return;
    panel.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    $("#authName")?.focus();
  }

  function isSignedIn() {
    return Boolean(profile && profile.name);
  }

  function updateRecipeSaveButtons() {
    $$(".save-recipe").forEach((button) => {
      const saved = savedRecipes.has(button.dataset.id);
      button.textContent = saved ? "Saved" : "Save";
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
        <span class="mini-icon" aria-hidden="true">${recipe.icon}</span>
        <div>
          <h3>${esc(recipe.name)}</h3>
          <p>${recipe.time} min · ${esc(recipe.category)}</p>
        </div>
        <button type="button" class="text-button remove-saved" data-id="${esc(recipe.id)}">Remove</button>
      </article>
    `).join("");

    empty.hidden = isSignedIn() && recipes.length > 0;
    if (!isSignedIn()) {
      empty.textContent = "Sign in and save a recipe to see it here.";
    } else if (!recipes.length) {
      empty.textContent = "Your saved recipes will appear here.";
    }
  }

  function renderPlanner() {
    const grid = $("#plannerGrid");
    if (!grid) return;

    const options = RECIPES.map((recipe) =>
      `<option value="${esc(recipe.id)}">${esc(recipe.name)}</option>`
    ).join("");

    grid.innerHTML = DAYS.map((day) => `
      <label class="planner-day">
        <span>${day}</span>
        <select data-day="${day}">
          <option value="">Choose a recipe</option>
          ${options}
        </select>
      </label>
    `).join("");

    $$("select", grid).forEach((select) => {
      select.value = mealPlan[select.dataset.day] || "";
    });
  }

  /* ----------------------------------------------------------------------
     ACCOUNT
     ---------------------------------------------------------------------- */

  (function initAuth() {
    const toggle = $("#authToggle");
    const panel = $("#authPanel");
    const form = $("#authForm");
    const input = $("#authName");
    const signOut = $("#signOutButton");
    if (!toggle || !panel || !form || !input || !signOut) return;

    function syncAuth() {
      const signedIn = isSignedIn();
      toggle.textContent = signedIn ? `Hi, ${profile.name}` : "Sign in";
      input.value = signedIn ? profile.name : "";
      signOut.hidden = !signedIn;
      renderSavedRecipes();
      updateRecipeSaveButtons();
    }

    toggle.addEventListener("click", () => {
      const open = panel.hidden;
      panel.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
      if (open) input.focus();
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = input.value.trim();
      if (!name) return;
      profile = { name };
      localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile));
      panel.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      syncAuth();
    });

    signOut.addEventListener("click", () => {
      profile = null;
      localStorage.removeItem(STORAGE_KEYS.profile);
      panel.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      syncAuth();
    });

    document.addEventListener("click", (e) => {
      if (panel.hidden || e.target.closest("#authBox")) return;
      panel.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
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

    // Highlight the section currently in view.
    const links = $$("a", nav);
    const sections = links
      .map((a) => $(a.getAttribute("href")))
      .filter(Boolean);

    if ("IntersectionObserver" in window && sections.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((l) =>
            l.classList.toggle("is-active", l.getAttribute("href") === "#" + entry.target.id)
          );
        });
      }, { rootMargin: "-45% 0px -50% 0px" });

      sections.forEach((s) => observer.observe(s));
    }
  })();

  /* ----------------------------------------------------------------------
     SKILL CARDS — click / keyboard to expand
     ---------------------------------------------------------------------- */

  (function initSkills() {
    $$(".skill-card").forEach((card) => {
      const toggle = () => {
        const open = card.getAttribute("aria-expanded") === "true";
        card.setAttribute("aria-expanded", String(!open));
      };
      card.addEventListener("click", toggle);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      });
    });
  })();

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

    // Build filter chips.
    CATEGORIES.forEach((cat) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chip";
      btn.textContent = cat;
      btn.setAttribute("aria-pressed", String(cat === "All"));
      btn.addEventListener("click", () => {
        activeCategory = cat;
        $$(".chip", filterWrap).forEach((c) =>
          c.setAttribute("aria-pressed", String(c.textContent === cat))
        );
        render();
      });
      filterWrap.appendChild(btn);
    });

    function matches(recipe) {
      const inCategory = activeCategory === "All" || recipe.category === activeCategory;
      if (!inCategory) return false;
      if (!query) return true;

      const haystack = [recipe.name, recipe.category, recipe.blurb, ...recipe.ingredients]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    }

    function cardMarkup(recipe) {
      const ingredients = recipe.ingredients
        .map((i) => `<li>${esc(i)}</li>`)
        .join("");
      const steps = recipe.steps.map((s) => `<li><span>${esc(s)}</span></li>`).join("");

      return `
        <article class="recipe-card" data-id="${esc(recipe.id)}">
          <div class="recipe-thumb" aria-hidden="true">${recipe.icon}</div>
          <div class="recipe-body">
            <div class="recipe-meta">
              <span class="tag">${esc(recipe.category)}</span>
              <span class="tag tag-alt">${esc(recipe.difficulty)}</span>
            </div>
            <h3>${esc(recipe.name)}</h3>
            <p class="recipe-blurb">${esc(recipe.blurb)}</p>

            <ul class="recipe-facts">
              <li><b>${recipe.time} min</b><span>Time</span></li>
              <li><b>${recipe.ingredients.length}</b><span>Ingredients</span></li>
              <li><b>${recipe.steps.length}</b><span>Steps</span></li>
            </ul>

            <div class="recipe-details">
              <div class="recipe-actions">
                <button type="button" class="save-recipe" data-id="${esc(recipe.id)}" aria-pressed="false">Save</button>
              </div>
              <button type="button" class="recipe-toggle" aria-expanded="false">View recipe</button>
              <div class="recipe-panel">
                <div class="recipe-panel-inner">
                  <p class="recipe-section-label">What you need</p>
                  <ul class="recipe-ingredients">${ingredients}</ul>

                  <p class="recipe-section-label">How to make it</p>
                  <ol class="recipe-steps">${steps}</ol>
                </div>
              </div>
            </div>
          </div>
        </article>
      `;
    }

    function render() {
      const results = RECIPES.filter(matches);

      grid.innerHTML = results.map(cardMarkup).join("");
      emptyEl.hidden = results.length > 0;
      countEl.textContent =
        results.length === RECIPES.length
          ? `Showing all ${RECIPES.length} recipes`
          : `Showing ${results.length} of ${RECIPES.length} recipes`;

      // Stagger the entrance animation slightly.
      $$(".recipe-card", grid).forEach((card, i) => {
        card.style.animationDelay = Math.min(i * 35, 350) + "ms";
      });
      updateRecipeSaveButtons();
    }

    // Expand recipes and save favorites via event delegation.
    grid.addEventListener("click", (e) => {
      const saveBtn = e.target.closest(".save-recipe");
      if (saveBtn) {
        if (!isSignedIn()) {
          openAuthPanel();
          return;
        }

        const id = saveBtn.dataset.id;
        if (savedRecipes.has(id)) {
          savedRecipes.delete(id);
        } else {
          savedRecipes.add(id);
        }

        saveSavedRecipes();
        updateRecipeSaveButtons();
        renderSavedRecipes();
        return;
      }

      const btn = e.target.closest(".recipe-toggle");
      if (!btn) return;
      const card = btn.closest(".recipe-card");
      const open = card.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
      btn.textContent = open ? "Close recipe" : "View recipe";
    });

    // Debounced search.
    let timer;
    searchInput.addEventListener("input", () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        query = searchInput.value.trim().toLowerCase();
        render();
      }, 140);
    });

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
      if (select.value) {
        mealPlan[select.dataset.day] = select.value;
      } else {
        delete mealPlan[select.dataset.day];
      }
      saveMealPlan();
    });

    renderPlanner();
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
