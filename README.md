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

- Search and filter 12 recipes with locally hosted food photos.
- Open recipe details with approximate servings, ingredient checkboxes, and instructions.
- Save favorite recipes without creating an account; a local profile name is optional.
- Add recipes to a chosen day from the recipe cards, saved list, or detail page. Occupied days show a replacement warning before confirmation.
- View meal photos in the planner, change a dinner, or remove one day at a time.
- Choose one dinner per day, or fill empty days with suggestions based on time and difficulty.
- Generate a grocery checklist from the plan, check off ingredients, and download a text copy.
- Keep the plan, preferences, favorites, grocery checks, and theme in browser storage.

Dinner suggestions currently use the sample recipes in the Dinner category. They cycle through matching recipes if there are fewer matches than empty days. Grocery entries group identical ingredient descriptions and list every day they are needed; different quantities and units are not combined. Amounts follow the original recipes, without serving-size adjustments.

Food photos are illustrative serving suggestions and may include extra ingredients. Source links and licenses are recorded in `images/credits.json`. Servings are approximate yields of the existing recipes; changing portion sizes is not yet supported.

## Next milestones from the proposal

1. Cooking lessons and learning progress.
2. Serving sizes, structured ingredient quantities, and estimated costs.
3. Extend the Express server with API routes and a PostgreSQL database.
4. Real registration/login, user profiles, and saved data per account.
5. Administrator tools for recipes, lessons, ingredients, and video references.

The current profile is a browser-only convenience, not an authenticated account. Data does not sync between devices.
