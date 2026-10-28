# KitchenPath

A beginner-friendly cooking and weekly meal-planning interface built with HTML, CSS, and vanilla JavaScript.

## Preview

Run `python -m http.server 8000` from the project directory, then open http://localhost:8000.

## Current prototype

The homepage is a short introduction. Each feature has a separate page: `recipes.html`, `saved.html`, `planner.html`, `groceries.html`, `basics.html`, `glossary.html`, and `faq.html`. Shared navigation links the pages, and browser storage keeps your plan, favorites, and preferences as you move between them. Use the same local server address for every page.

- Search and filter 12 recipes, and expand their ingredients and instructions.
- Create a local profile name and save favorite recipes.
- Choose one dinner per day, or fill empty days with suggestions based on time and difficulty.
- Generate a grocery checklist from the plan, check off ingredients, and download a text copy.
- Keep the plan, preferences, favorites, grocery checks, and theme in browser storage.

Dinner suggestions currently use the sample recipes in the Dinner category. They cycle through matching recipes if there are fewer matches than empty days. Grocery entries group identical ingredient descriptions and list every day they are needed; different quantities and units are not combined. Amounts follow the original recipes, without serving-size adjustments.

## Next milestones from the proposal

1. Cooking lessons and learning progress.
2. Serving sizes, structured ingredient quantities, and estimated costs.
3. Express API and PostgreSQL database.
4. Real registration/login, user profiles, and saved data per account.
5. Administrator tools for recipes, lessons, ingredients, and video references.

The current profile is a browser-only convenience, not an authenticated account. Data does not sync between devices.
