/* Browser profiles group local recipe data; these are not authenticated accounts. */
(function () {
  "use strict";
  const KEY = "kitchenpath-profiles";
  const AVATARS = ["👤", "👩‍🍳", "👨‍🍳", "🥑", "🍳", "🍓"];
  const DATA_FIELDS = ["saved", "plan", "preferences", "groceries"];
  function createStore(storage, baseKeys) {
    const read = (key, fallback) => {
      try { return JSON.parse(storage.getItem(key)) ?? fallback; } catch { return fallback; }
    };
    const raw = read(KEY, {});
    const profiles = Array.isArray(raw?.profiles) ? raw.profiles.filter((item) =>
      item && typeof item.id === "string" && /^[a-zA-Z0-9-]+$/.test(item.id)
      && typeof item.name === "string" && item.name.trim()).map((item) => ({
      id: item.id, name: item.name.trim().slice(0, 40), avatar: AVATARS.includes(item.avatar) ? item.avatar : AVATARS[0]
    })) : [];
    let activeId = profiles.some((item) => item.id === raw?.activeId) ? raw.activeId : null;
    const persist = () => storage.setItem(KEY, JSON.stringify({ profiles, activeId }));
    const scopedKey = (key, id) => id ? `${key}:profile:${id}` : key;
    function create(name, avatar = AVATARS[0]) {
      name = String(name).trim().slice(0, 40);
      if (!name) throw new Error("Enter a profile name.");
      const id = globalThis.crypto?.randomUUID?.() || `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
      const profile = { id, name, avatar: AVATARS.includes(avatar) ? avatar : AVATARS[0] };
      // The first profile starts with this browser's existing recipes and plan.
      if (!profiles.length) for (const field of DATA_FIELDS) {
        const value = storage.getItem(baseKeys[field]);
        if (value !== null) storage.setItem(scopedKey(baseKeys[field], id), value);
      }
      profiles.push(profile);
      const previous = activeId;
      activeId = id;
      try { persist(); } catch (error) { profiles.pop(); activeId = previous; throw error; }
      return { ...profile };
    }
    // Preserve the optional single-name profile used by earlier versions.
    if (!storage.getItem(KEY)) {
      const legacy = read(baseKeys.profile, null);
      if (legacy?.name && typeof legacy.name === "string" && legacy.name.trim()) create(legacy.name);
    }
    return {
      avatars: [...AVATARS],
      list: () => profiles.map((item) => ({ ...item })),
      active: () => { const item = profiles.find((profile) => profile.id === activeId); return item ? { ...item } : null; },
      keys: () => Object.fromEntries(DATA_FIELDS.map((field) => [field, scopedKey(baseKeys[field], activeId)])),
      create,
      select(id) {
        if (id !== null && !profiles.some((item) => item.id === id)) throw new Error("Profile not found.");
        const previous = activeId;
        activeId = id;
        try { persist(); } catch (error) { activeId = previous; throw error; }
      },
      update(id, name, avatar) {
        name = String(name).trim().slice(0, 40);
        if (!name) throw new Error("Enter a profile name.");
        const index = profiles.findIndex((item) => item.id === id);
        if (index < 0) throw new Error("Profile not found.");
        const previous = profiles[index];
        profiles[index] = { id, name, avatar: AVATARS.includes(avatar) ? avatar : AVATARS[0] };
        try { persist(); } catch (error) { profiles[index] = previous; throw error; }
      }
    };
  }
  window.KitchenPathProfiles = { createStore };
})();
