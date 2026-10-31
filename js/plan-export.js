/* Draw a standalone PNG rather than a screenshot of interactive controls. */
(function () {
  "use strict";
  async function render({ title, subtitle, columns, rows, footer, creditsFooter, emptyLabel }) {
    const width = columns.length === 1 ? 1400 : 1800;
    const margin = 64, dayWidth = 190, header = 220, rowHeight = columns.length === 1 ? 160 : 218;
    const height = header + rows.length * rowHeight + 100;
    const canvas = document.createElement("canvas");
    canvas.width = width; canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable");
    const colors = { paper: "#fdfaf5", ink: "#241f1a", muted: "#6b6157", accent: "#b64a17", border: "#e6dccd" };
    const cellWidth = (width - margin * 2 - dayWidth) / columns.length;
    ctx.fillStyle = colors.paper; ctx.fillRect(0, 0, width, height);
    function text(value, x, y, size, color = colors.ink, bold = false) {
      ctx.font = `${bold ? "700" : "400"} ${size}px Arial, sans-serif`;
      ctx.fillStyle = color; ctx.fillText(value, x, y);
    }
    function wrap(value, x, y, maxWidth, size, maxLines = 3, color = colors.ink) {
      ctx.font = `600 ${size}px Arial, sans-serif`;
      const words = String(value).split(/\s+/), lines = []; let line = "";
      for (const word of words) {
        const next = line ? `${line} ${word}` : word;
        if (ctx.measureText(next).width > maxWidth && line) { lines.push(line); line = word; }
        else line = next;
      }
      if (line) lines.push(line);
      lines.slice(0, maxLines).forEach((content, index) => {
        if (index === maxLines - 1 && lines.length > maxLines) content += "…";
        while (ctx.measureText(content).width > maxWidth && content.length > 1) content = content.slice(0, -2) + "…";
        text(content, x, y + index * (size + 9), size, color, true);
      });
    }
    function box(x, y, w, h, fill) {
      ctx.beginPath(); ctx.roundRect(x, y, w, h, 16); ctx.fillStyle = fill; ctx.fill();
    }
    text("KitchenPath", margin, 66, 30, colors.accent, true);
    text(title, margin, 119, 40, colors.ink, true);
    text(subtitle, margin, 156, 22, colors.muted);
    columns.forEach((column, index) => text(column, margin + dayWidth + index * cellWidth + 20, 199, 22, colors.accent, true));
    const imageCache = new Map();
    function load(url) {
      if (!url) return Promise.resolve(null);
      if (!imageCache.has(url)) imageCache.set(url, new Promise(resolve => {
        const image = new Image();
        const timer = setTimeout(() => { image.onload = image.onerror = null; resolve(null); }, 7000);
        image.onload = () => { clearTimeout(timer); resolve(image); };
        image.onerror = () => { clearTimeout(timer); resolve(null); };
        image.src = url;
      }));
      return imageCache.get(url);
    }
    await Promise.all(rows.flatMap(row => row.meals.map(meal => load(meal?.photo))));
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const row = rows[rowIndex], y = header + rowIndex * rowHeight;
      wrap(row.label, margin, y + 45, dayWidth - 16, 22, 2, colors.accent);
      for (let index = 0; index < columns.length; index++) {
        const meal = row.meals[index], x = margin + dayWidth + index * cellWidth;
        box(x + 8, y + 8, cellWidth - 16, rowHeight - 16, "#ffffff");
        const image = await load(meal?.photo);
        const imageSize = 100, imageX = x + 24, imageY = y + 26;
        if (image) {
          const scale = Math.max(imageSize / image.width, imageSize / image.height);
          ctx.save(); ctx.beginPath(); ctx.roundRect(imageX, imageY, imageSize, imageSize, 12); ctx.clip();
          ctx.drawImage(image, imageX + (imageSize - image.width * scale) / 2, imageY + (imageSize - image.height * scale) / 2, image.width * scale, image.height * scale);
          ctx.restore();
        }
        const textX = image ? imageX + imageSize + 18 : imageX;
        const textWidth = x + cellWidth - 28 - textX;
        wrap(meal?.name || emptyLabel, textX, y + 51, textWidth, columns.length === 1 ? 28 : 23, 3, meal ? colors.ink : colors.muted);
        if (meal?.meta) text(meal.meta, imageX, y + rowHeight - 33, 18, colors.muted);
      }
    }
    text(footer, margin, height - 50, 19, colors.muted);
    if (creditsFooter) text(creditsFooter, margin, height - 22, 16, colors.muted);
    const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
    if (!blob) throw new Error("Image could not be created");
    return blob;
  }
  window.KitchenPathPlanExport = { render };
})();
