# KitchenPath

A beginner-friendly cooking and weekly meal-planning interface built with HTML, CSS, and vanilla JavaScript.

## Preview

Use Node.js 24. Run `npm ci`, then `npm start` from the project directory and open http://localhost:3000.

Run `npm test` to check page serving, asset types, health checks, and private-file protection.

## Deploy on Render (Web Service)

Connect this repository with the following settings:

| Setting | Value |
| --- | --- |
| Runtime | Node |
| Branch | `main` |
| Root Directory | Leave blank (repository root) |
| Build Command | `npm ci` |
| Start Command | `npm start` |
| Health Check Path | `/health` |

The Express server binds to `0.0.0.0` and uses Render's `PORT` environment variable. No publish directory is needed for a Web Service. For an existing service, save these settings and deploy the latest commit.

This server hosts the current interactive frontend. Accounts, database storage, and synchronization are still future milestones.

## Current prototype

The homepage is a short introduction. Each feature has a separate page: `recipes.html`, `saved.html`, `planner.html`, `groceries.html`, `basics.html`, `glossary.html`, and `faq.html`. Individual recipes open at `recipe.html?id=garlic-butter-pasta` (using the selected recipe's ID). Shared navigation links the pages, and browser storage keeps your plan, favorites, and preferences as you move between them. Use the same local server address for every page.

- Browse 44 recipes, including 32 Filipino home-cooking dishes. Filter by cuisine and meal type, or search names, ingredients, and alternate spellings such as monggo/munggo.
- Browse 12 recipes per page to keep the library manageable on a phone.
- Open recipe details in a centered popup with approximate servings, ingredient checkboxes, and instructions. Longer recipes scroll inside the popup; Close, Escape, or clicking outside returns to browsing. Direct recipe URLs still work as standalone pages.
- Save favorite recipes as a guest or choose a local profile with a name and avatar from the header picker.
- Add recipes to a chosen day from the recipe cards, saved list, or detail page. Occupied days show a replacement warning before confirmation.
- View meal photos in the planner, change a dinner, or remove one day at a time.
- Choose one dinner per day, or fill empty days with suggestions based on time, difficulty, and an optional Filipino-only preference. Longer cooking-time options include slow-simmered dishes.
- Generate a grocery checklist from the plan, check off ingredients, and download a text copy.
- Keep each profile's plan, dinner preferences, favorites, and grocery checks in separate browser storage. Switch profiles or return to Guest without losing another profile's data. The first profile copies the existing guest data; subsequent profiles start empty.
- Switch between English and Tagalog from the header. The language choice is remembered across pages; saved recipes, plans, and ingredient checks are shared between languages. Search accepts English and Tagalog ingredient names.

Dinner suggestions currently use the sample recipes in the Dinner category. They cycle through matching recipes if there are fewer matches than empty days. Grocery entries group identical ingredient descriptions and list every day they are needed; different quantities and units are not combined. Amounts follow the original recipes, without serving-size adjustments.

Food photos are illustrative serving suggestions and may include extra ingredients. Source links and licenses are recorded in `images/credits.json`. Servings are approximate yields of the existing recipes; changing portion sizes is not yet supported.

Filipino recipes live in `js/filipino-recipes.js` and load before the main application on every page. They are simplified home-cooking versions with approximate total times and yields; marinating, chilling, or cooling is noted where applicable. New recipes use the same saved lists, day picker, meal planner, and ingredient checklist as the original library.

Translations are local files and require no external translation service: `js/i18n.js` handles the language switch and changing interface text, `js/recipes-tl.js` contains Tagalog descriptions and instructions for all 44 recipes, and `js/translations-tl.js` covers ingredients, cooking tips, and learning content. Keep recipe translation arrays aligned with their English method steps when editing recipes. Brand names and measurement numbers stay unchanged. Unregistered text falls back to English.

## Next milestones from the proposal

1. Cooking lessons and learning progress.
2. Serving sizes, structured ingredient quantities, and estimated costs.
3. Extend the Express server with API routes and a PostgreSQL database.
4. Real registration/login, user profiles, and saved data per account.
5. Administrator tools for recipes, lessons, ingredients, and video references.

Profiles are managed by `js/profiles.js`. Existing optional-name profiles migrate automatically without losing their recipes and plan. Profiles are browser-only conveniences, not authenticated accounts: there are no passwords and data does not sync between devices. The theme and language choice are shared across profiles.
