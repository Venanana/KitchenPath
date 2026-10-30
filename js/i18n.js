/* Local English / Tagalog translations. Recipe IDs and stored data stay in English. */
(function () {
  "use strict";
  const messages = new Map();
  const normal = (text) => text.replace(/\s+/g, " ").trim();
  let language = "en";
  try { language = localStorage.getItem("kitchenpath-language") === "tl" ? "tl" : "en"; } catch {}
  function add(english, tagalog) { messages.set(normal(english), tagalog); }
  // One pair per line keeps the local catalogue easy to maintain.
  const ui = `Home|Tahanan
Recipes|Mga Resipe
Saved|Mga Naka-save
Meal Plan|Plano ng Pagkain
Groceries|Mga Bibilhin
Basics|Mga Pangunahing Kaalaman
Profile|Profile
On this device|Sa device na ito
Name (optional)|Pangalan (opsyonal)
Your name|Iyong pangalan
Save|I-save
Unsave|Alisin sa naka-save
Remove name|Alisin ang pangalan
Recipes and plans save in this browser. Adding your name is optional; nothing syncs to other devices.|Sa browser na ito naka-save ang mga resipe at plano. Opsyonal ang paglagay ng pangalan; hindi ito naka-sync sa ibang device.
Skip to content|Lumaktaw sa nilalaman
Toggle navigation|Buksan o isara ang menu
Primary|Pangunahing menu
Footer|Menu sa ibaba
Switch theme|Palitan ang tema
Switch to light theme|Gamitin ang maliwanag na tema
Switch to dark theme|Gamitin ang madilim na tema
Back to top|Bumalik sa itaas
Close recipe|Isara ang resipe
A beginner's path to cooking real food.|Gabay ng baguhan sa pagluluto ng masarap na pagkain.
Built for people who have never cooked before.|Para sa mga nagsisimula pa lang magluto.
Start Here|Magsimula Dito
Glossary|Talasalitaan
FAQ|Mga Karaniwang Tanong
Learn to cook.|Matutong magluto.
Plan your meals.|Planuhin ang iyong pagkain.
Find Filipino favourites and simple recipes, practise the basics, and decide what to cook this week. Your meal plan keeps the grocery list together for you.|Tuklasin ang mga paboritong pagkaing Pinoy at madaling resipe, matuto ng mga pangunahing paraan ng pagluluto, at planuhin ang lulutuin ngayong linggo. Awtomatikong pinagsasama ng iyong plano ang mga kailangang bilhin.
Find a recipe|Maghanap ng resipe
Plan the week|Planuhin ang linggo
Something to cook|Puwedeng lutuin
Show me another →|Iba naman →
Cooking basics|Mga batayan sa pagluluto
Pantry staples, essential tools, and a few techniques to get started.|Mga pangunahing sangkap, kagamitan, at paraan para makapagsimula.
Read the basics →|Basahin ang mga batayan →
Browse by meal type or search for an ingredient you already have.|Pumili ayon sa uri ng pagkain o maghanap gamit ang sangkap na mayroon ka.
Browse recipes →|Tingnan ang mga resipe →
Weekly meal plan|Lingguhang plano ng pagkain
Choose your dinners and check what you need to buy.|Piliin ang mga hapunan at tingnan ang kailangang bilhin.
Open meal plan →|Buksan ang plano →
Choose your next step|Piliin ang susunod na gagawin
Beginner recipes|Mga resipe para sa baguhan
Filipino home cooking, breakfast favourites, merienda, and simple everyday meals.|Mga lutong bahay na Pinoy, paboritong almusal, merienda, at madaling pagkaing pang-araw-araw.
Search recipes|Maghanap ng resipe
Search recipes or ingredients…|Maghanap ng resipe o sangkap…
All recipes|Lahat ng resipe
Filipino recipes|Mga resipeng Pinoy
All|Lahat
Breakfast|Almusal
Lunch|Tanghalian
Dinner|Hapunan
Side|Pandagdag na ulam
Snack|Meryenda
Dessert|Panghimagas
Very easy|Napakadali
Easy|Madali
Medium|Katamtaman
Time|Oras
Servings (approx.)|Tantiyang dami ng makakakain
View recipe|Tingnan ang resipe
Add to meal plan|Idagdag sa plano
No recipes match that search. Try clearing the filters.|Walang tumugmang resipe. Subukang alisin ang mga filter.
No recipes found|Walang nahanap na resipe
Previous|Nakaraan
Next|Susunod
Saved recipes|Mga naka-save na resipe
Keep the meals you want to cook again. Saved in this browser, with no account needed.|I-save ang mga pagkaing gusto mong lutuin muli. Naka-save sa browser na ito; hindi kailangan ng account.
No saved recipes yet|Wala pang naka-save na resipe
Use the Save button on any recipe to keep it here. You can add it to your meal plan whenever you're ready.|Pindutin ang I-save sa anumang resipe para mapunta ito rito. Maaari mo itong idagdag sa plano kapag handa ka na.
Browse recipes|Tingnan ang mga resipe
Find recipes to save →|Maghanap ng mga resipeng ise-save →
Remove|Alisin
Change|Palitan
Recipe saved in this browser.|Na-save ang resipe sa browser na ito.
Recipe removed from saved.|Inalis ang resipe sa mga naka-save.
View saved recipes|Tingnan ang mga naka-save
View meal plan|Tingnan ang plano
One dinner a day. Build your own week or let us give you a starting point.|Isang hapunan bawat araw. Gumawa ng sariling plano o subukan ang aming mga mungkahi.
Dinner preferences|Mga gusto mong hapunan
Suggestions fill empty days, so your own choices stay in place.|Para lang sa mga araw na wala pang hapunan ang mga mungkahi; mananatili ang mga napili mo.
Time per dinner|Oras ng pagluluto bawat hapunan
Cooking comfort|Kasanayan sa pagluluto
Just starting out|Nagsisimula pa lang
Ready for a challenge|Handa sa mas mahirap
Cuisine|Uri ng lutuin
Any cuisine|Kahit anong lutuin
Filipino dinners|Mga hapunang Pinoy
Suggest dinners|Magmungkahi ng hapunan
Clear week|Burahin ang plano ng linggo
Your plan saves automatically in this browser. Suggestions may repeat when only a few dinners match.|Awtomatikong nase-save ang plano sa browser na ito. Maaaring maulit ang mga mungkahi kung kaunti lang ang tumugmang hapunan.
View grocery checklist →|Tingnan ang listahan ng bibilhin →
Choose a recipe|Pumili ng resipe
No dinner selected|Wala pang napiling hapunan
No dinner selected.|Wala pang napiling hapunan.
Choose a day|Pumili ng araw
Cancel|Kanselahin
Add dinner|Idagdag ang hapunan
Replace dinner|Palitan ang hapunan
This day has no dinner planned.|Wala pang nakaplanong hapunan sa araw na ito.
Plan updated. Open Groceries to see your checklist.|Na-update ang plano. Buksan ang Mga Bibilhin para makita ang listahan.
Your week is full. Remove a dinner to get a new suggestion for that day.|Puno na ang linggo. Alisin ang isang hapunan para makakuha ng bagong mungkahi sa araw na iyon.
No dinners match yet. Try allowing more cooking time.|Wala pang tumugmang hapunan. Subukang dagdagan ang oras ng pagluluto.
Week cleared. Choose a dinner or suggest a fresh plan.|Nabura ang plano ng linggo. Pumili ng hapunan o humingi ng bagong mungkahi.
Monday|Lunes
Tuesday|Martes
Wednesday|Miyerkules
Thursday|Huwebes
Friday|Biyernes
Saturday|Sabado
Sunday|Linggo
Whole week|Buong linggo
Your grocery checklist|Listahan ng mga bibilhin
See ingredients for one day's dinner, or switch to the whole week.|Tingnan ang mga sangkap ng hapunan para sa isang araw, o piliin ang buong linggo.
Show ingredients for|Ipakita ang mga sangkap para sa
Plan a dinner to get started.|Magplano muna ng hapunan para makapagsimula.
Download list|I-download ang listahan
Edit meal plan →|Baguhin ang plano →
Amounts follow each recipe as written. Matching ingredient entries are grouped; different amounts stay separate. Check portions and pantry supplies before shopping.|Batay sa bawat resipe ang mga dami. Pinagsasama ang magkakaparehong sangkap at dami; magkahiwalay ang magkaibang dami. Tingnan muna ang dami ng kakain at ang mayroon sa kusina bago mamili.
No groceries yet|Wala pang kailangang bilhin
Choose your first dinner and its ingredients will appear here.|Piliin ang unang hapunan at lilitaw rito ang mga sangkap nito.
Build your meal plan →|Gumawa ng plano ng pagkain →
Ingredients|Mga sangkap
Instructions|Paraan ng pagluluto
Recipe details|Detalye ng resipe
Loading the recipe...|Ikinakarga ang resipe...
Recipe not found|Hindi nahanap ang resipe
This link does not match a recipe in our library.|Walang tumugmang resipe sa link na ito.
Back to recipes|Bumalik sa mga resipe
Brand options & tips|Mga brand at paalala
Seasoning tip|Paalala sa pagtimpla
Photo not available yet.|Wala pang larawan.
Serving suggestion; toppings and garnishes may vary.|Halimbawa ng paghahain; maaaring mag-iba ang mga palamuti at dagdag sa ibabaw.
Amounts are per recipe use; adjust for portions and repeated meals.|Para sa isang pagluluto ng resipe ang mga dami; iakma sa dami ng kakain at sa pag-ulit ng pagkain.
A few things to know before you start cooking.|Ilang bagay na dapat malaman bago magsimulang magluto.
Pantry staples|Mga pangunahing sangkap
Salt, pepper, olive oil, garlic, onions, rice, pasta, eggs, canned tomatoes, and soy sauce. That's the backbone of dozens of meals.|Asin, paminta, olive oil, bawang, sibuyas, bigas, pasta, itlog, de-latang kamatis, at toyo. Gamit ang mga ito, marami ka nang maluluto.
Kitchen tools|Mga kagamitan sa kusina
A chef's knife, a cutting board, a non-stick pan, a saucepan, and a wooden spoon. Everything else is optional at the start.|Kutsilyo, sangkalan, kawaling hindi dinidikitan, maliit na kaserola, at sandok na kahoy. Opsyonal muna ang ibang kagamitan.
Learn heat control|Matutong kontrolin ang apoy
Medium heat is your default — not high. Learn what "shimmering oil" and "gentle simmer" look like before you cook a real meal.|Karaniwang katamtamang apoy ang gamitin. Alamin muna ang hitsura ng kumikislap na mantika at mahinang pagkulo bago magluto.
Cook one egg three ways|Magluto ng itlog sa tatlong paraan
Fried, scrambled, and boiled. It teaches timing, fat, and temperature for pennies per attempt.|Prito, hinalo, at nilaga. Matututuhan mo ang tamang oras, mantika, at init sa murang halaga.
Kitchen glossary →|Talasalitaan sa kusina →
Beginner FAQ →|Mga tanong ng baguhan →
Kitchen words, decoded|Mga salitang gamit sa kusina
Tap a term when a recipe sounds mysterious.|Pindutin ang salitang gusto mong maintindihan sa isang resipe.
Beginner FAQ|Mga tanong ng baguhan
The questions everyone is quietly wondering.|Mga tanong na karaniwan sa mga nagsisimulang magluto.`;
  ui.split("\n").forEach((line) => { const i = line.indexOf("|"); add(line.slice(0, i), line.slice(i + 1)); });

  function translate(text, force = false) {
    if (!force && language !== "tl") return text;
    const key = normal(text);
    let result = messages.get(key);
    if (result === undefined) {
      const rules = [
        [/^KitchenPath — (.+)$/, (_, title) => `KitchenPath — ${translate(title, true)}`],
        [/^Recipe details — KitchenPath$/, () => "Detalye ng resipe — KitchenPath"],
        [/^Up to (\d+) minutes$/, (_, n) => `Hanggang ${n} minuto`],
        [/^Up to (\d+) hours$/, (_, n) => `Hanggang ${n} oras`],
        [/^(\d+) of 7 dinners planned$/, (_, n) => `${n} sa 7 hapunan ang nakaplano`],
        [/^Showing (\d+)–(\d+) of (\d+) recipes$/, (_, a, b, n) => `Ipinapakita ang ${a}–${b} sa ${n} resipe`],
        [/^Page (\d+) of (\d+)$/, (_, p, n) => `Pahina ${p} sa ${n}`],
        [/^(\d+) min(?: · (.+))?$/, (_, n, rest) => `${n} minuto${rest ? ` · ${translate(rest, true)}` : ""}`],
        [/^(\d+) recipe use\(s\)$/, (_, n) => `${n} paggamit sa resipe`],
        [/^(.+) — KitchenPath$/, (_, title) => `${translate(title, true)} — KitchenPath`],
        [/^Serving suggestion; toppings and garnishes may vary\. Photo:$/, () => "Halimbawa ng paghahain; maaaring mag-iba ang mga palamuti at dagdag sa ibabaw. Larawan:"],
        [/^Serving suggestion; toppings and garnishes may vary\. Photo: (.+)$/, (_, credit) => `Halimbawa ng paghahain; maaaring mag-iba ang mga palamuti at dagdag sa ibabaw. Larawan: ${credit}`],
        [/^(Change dinner|Choose dinner) for (.+)$/, (_, action, day) => `${action === "Change dinner" ? "Palitan" : "Piliin"} ang hapunan sa ${translate(day, true)}`],
        [/^(Change|Remove) (.+)'s dinner$/, (_, action, day) => `${action === "Change" ? "Palitan" : "Alisin"} ang hapunan sa ${translate(day, true)}`],
        [/^(.+)'s dinner removed\. Your grocery list has been updated\.$/, (_, day) => `Inalis ang hapunan sa ${translate(day, true)}. Na-update ang listahan ng bibilhin.`],
        [/^Added (\d+) dinner suggestions\. Swap any meal using its dropdown\.$/, (_, n) => `Nagdagdag ng ${n} mungkahing hapunan. Gamitin ang dropdown para palitan ang anumang pagkain.`],
        [/^(.+) added for (Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\.$/, (_, meal, day) => `Idinagdag ang ${translate(meal, true)} para sa ${translate(day, true)}.`],
        [/^Currently planned: (.+)\. (This meal is already selected\.|Adding this recipe will replace it\.)$/, (_, meal, suffix) => `Kasalukuyang nakaplano: ${translate(meal, true)}. ${suffix.startsWith("This") ? "Napili na ang pagkaing ito." : "Papalitan ito ng resipeng idaragdag."}`],
        [/^No dinner planned for (.+)$/, (_, day) => `Walang nakaplanong hapunan sa ${translate(day, true)}`],
        [/^Add a dinner for (.+) in your meal plan, or select another day\.$/, (_, day) => `Magdagdag ng hapunan sa ${translate(day, true)} sa iyong plano, o pumili ng ibang araw.`],
        [/^(.+): (\d+) of (\d+) ingredient entries checked$/, (_, scope, a, b) => `${translate(scope, true)}: ${a} sa ${b} sangkap ang namarkahan`],
        [/^(.+): no dinner planned\.$/, (_, scope) => `${translate(scope, true)}: walang nakaplanong hapunan.`],
        [/^(.+)'s dinner$/, (_, day) => `Hapunan sa ${translate(day, true)}`],
        [/^Needed (\d+) times · (.+)$/, (_, n, days) => `Kailangan nang ${n} beses · ${translate(days, true)}`],
        [/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)(, (Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday))+$/, () => key.split(", ").map(day => translate(day, true)).join(", ")],
        [/^Amounts make about (\d+) servings?\. Check off ingredients as you prepare them\.$/, (_, n) => `Sapat para sa humigit-kumulang ${n} tao. Markahan ang mga sangkap habang inihahanda ang mga ito.`],
        [/^Choose one: (.+)\. Other brands of the same product type also work; availability varies by store\.$/, (_, brands) => `Pumili ng isa: ${brands}. Maaari ring gumamit ng ibang brand ng parehong uri; depende sa tindahan ang makukuha.`],
        [/^(View|Save|Unsave) (.+)$/, (_, action, recipe) => `${{View: "Tingnan", Save: "I-save", Unsave: "Alisin sa naka-save"}[action]} ang ${translate(recipe, true)}`],
        [/^Remove (.+) from saved recipes$/, (_, recipe) => `Alisin ang ${translate(recipe, true)} sa mga naka-save na resipe`],
        [/^Serving suggestion for (.+)$/, (_, recipe) => `Halimbawa ng paghahain ng ${translate(recipe, true)}`],
        [/^(.+); photo unavailable$/, (_, recipe) => `${translate(recipe, true)}; walang larawan`],
        [/^KitchenPath grocery list — (.+)$/, (_, scope) => `Listahan ng bibilhin sa KitchenPath — ${translate(scope, true)}`]
      ];
      for (const [pattern, replacement] of rules) if (pattern.test(key)) { result = key.replace(pattern, replacement); break; }
    }
    if (result === undefined) return text;
    return text.replace(/\S[\s\S]*\S|\S/, result);
  }

  const originals = new WeakMap();
  const rendered = new WeakMap();
  const attributes = new WeakMap();
  let observer;
  const observerOptions = { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["aria-label", "placeholder", "title", "alt", "data-no-translate"] };
  const excluded = (el) => el?.closest('script, style, noscript, [translate="no"], [data-no-translate], #languageSwitch');
  function localize(root) {
    if (!root || excluded(root.nodeType === 1 ? root : root.parentElement)) return;
    if (root.nodeType === 3) {
      if (!normal(root.nodeValue)) return;
      if (!originals.has(root) || root.nodeValue !== rendered.get(root)) originals.set(root, root.nodeValue);
      const value = language === "tl" ? translate(originals.get(root)) : originals.get(root);
      if (root.nodeValue !== value) root.nodeValue = value;
      rendered.set(root, value);
      return;
    }
    if (root.nodeType === 1) {
      // Some HTML parsers split text around entities such as &#39;.
      // Merge adjacent text nodes so whole sentences share one translation key.
      if ([...root.childNodes].some((node) => node.nodeType === 3 && node.nextSibling?.nodeType === 3)) root.normalize();
      let saved = attributes.get(root);
      if (!saved) { saved = {}; attributes.set(root, saved); }
      for (const name of ["aria-label", "placeholder", "title", "alt"]) {
        if (!root.hasAttribute(name)) continue;
        const current = root.getAttribute(name);
        if (!saved[name] || current !== saved[name].rendered) saved[name] = { original: current };
        const value = language === "tl" ? translate(saved[name].original) : saved[name].original;
        if (current !== value) root.setAttribute(name, value);
        saved[name].rendered = value;
      }
    }
    for (const child of root.childNodes) localize(child);
  }
  function refresh(roots = [document.documentElement]) {
    observer?.disconnect();
    for (const root of roots) localize(root);
    document.documentElement.lang = language;
    observer?.observe(document.documentElement, observerOptions);
  }
  function setLanguage(value) {
    language = value === "tl" ? "tl" : "en";
    try { localStorage.setItem("kitchenpath-language", language); } catch {}
    const select = document.querySelector("#languageSwitch");
    if (select) select.value = language;
    refresh();
    document.dispatchEvent(new CustomEvent("languagechange"));
  }
  window.KitchenPathI18n = { add, translate, setLanguage, get language() { return language; }, refresh };
  function init() {
    const header = document.querySelector(".header-inner");
    if (header) {
      const label = document.createElement("label");
      label.className = "language-picker";
      label.setAttribute("translate", "no");
      label.innerHTML = '<span class="sr-only">Language / Wika</span><select id="languageSwitch" aria-label="Language / Wika"><option value="en" lang="en">English</option><option value="tl" lang="tl">Tagalog</option></select>';
      header.insertBefore(label, document.querySelector("#themeToggle"));
      label.querySelector("select").value = language;
      label.addEventListener("change", (event) => setLanguage(event.target.value));
    }
    observer = new MutationObserver((records) => {
      const roots = new Set();
      for (const record of records) {
        if (record.type === "childList") for (const node of record.addedNodes) roots.add(node);
        else roots.add(record.target);
      }
      refresh([...roots]);
    });
    refresh();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
