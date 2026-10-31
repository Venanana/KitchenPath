/* Shared shape for weekly plans; older one-dinner-per-day plans remain readable. */
(function () {
  "use strict";
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const slots = ["Breakfast", "Lunch", "Dinner"];
  function normalize(value) {
    const plan = {};
    for (const day of days) {
      const source = typeof value?.[day] === "string" ? { Dinner: value[day] } : value?.[day];
      for (const slot of slots) if (typeof source?.[slot] === "string" && source[slot]) {
        (plan[day] ||= {})[slot] = source[slot];
      }
    }
    return plan;
  }
  function set(plan, day, slot, id) {
    if (!days.includes(day) || !slots.includes(slot)) return;
    if (id) (plan[day] ||= {})[slot] = id;
    else if (plan[day]) {
      delete plan[day][slot];
      if (!Object.keys(plan[day]).length) delete plan[day];
    }
  }
  const entries = (plan) => days.flatMap(day => slots.map(slot => ({ day, slot, id: plan[day]?.[slot] || null })));
  window.KitchenPathMealPlan = { days, slots, normalize, set, entries };
})();
