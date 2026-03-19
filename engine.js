function getCompatStatus(score) {
  if (score >= 82) return "SOULMATE";
  if (score >= 65) return "MIRROR";
  if (score >= 48) return "MAGNETIC";
  if (score >= 30) return "DIFFICULT";
  return "INDIFFERENT";
}

function getCompatibility(idA, idB) {
  if (idA === idB) return { score: 100, note: "You are looking at yourself. What do you see?" };
  return COMPATIBILITY[idA]?.[idB] || COMPATIBILITY[idB]?.[idA] || { score: 50, note: "An uncharted connection." };
}

function computeResult(answers) {
  const scores = {};
  Object.keys(ARCHETYPES).forEach(k => scores[k] = 0);
  answers.forEach(choice => {
    Object.entries(choice.weights).forEach(([k, v]) => { scores[k] = (scores[k] || 0) + v; });
  });
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primary = sorted[0][0], secondary = sorted[1][0], tertiary = sorted[2][0];
  const isClash = sorted[0][1] - sorted[1][1] <= 3;
  const clashData = CLASHES[`${primary}-${secondary}`] || CLASHES[`${secondary}-${primary}`] || null;
  return { primary, secondary, tertiary, scores, isClash, clashData, sorted };
}

function wrapText(text, maxChars) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    if ((line + word).length > maxChars) { lines.push(line.trim()); line = word + " "; }
    else { line += word + " "; }
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}

function buildSVG(arc, secArc, isClash) {
  const W = 800, H = 500;
  const c = arc.color;
  const shadowTrait = arc.traits.find(t => t.label === "Shadow Self")?.value || "";
  const summaryLines = wrapText(arc.summary, 78);
  const shadowLines = wrapText(shadowTrait, 78);
  const quoteLines = wrapText(`"${arc.quote}"`, 82);
  const summaryY = 195;
  const shadowLabelY = summaryY + summaryLines.length * 22 + 28;
  const shadowY = shadowLabelY + 20;
  const quoteBoxY = shadowY + shadowLines.length * 20 + 28;

  const esc = s => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${arc.bg}"/>
      <stop offset="100%" stop-color="${arc.bg}dd"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  ${Array.from({length:20},(_,i)=>`<line x1="${i*42}" y1="0" x2="${i*42}" y2="${H}" stroke="${c}" stroke-opacity="0.05" stroke-width="1"/>`).join("")}
  ${Array.from({length:13},(_,i)=>`<line x1="0" y1="${i*42}" x2="${W}" y2="${i*42}" stroke="${c}" stroke-opacity="0.05" stroke-width="1"/>`).join("")}
  <rect x="0" y="0" width="4" height="${H}" fill="${c}"/>
  <rect x="0" y="0" width="${W}" height="1" fill="${c}" opacity="0.4"/>
  <rect x="0" y="${H-1}" width="${W}" height="1" fill="${c}" opacity="0.4"/>
  <text x="${W-70}" y="90" font-family="serif" font-size="60" fill="${c}" opacity="0.18" text-anchor="middle">${arc.icon}</text>
  <text x="36" y="50" font-family="'Courier New',monospace" font-size="11" fill="${c}" opacity="0.7" letter-spacing="2">${esc(arc.author.toUpperCase())} — ${esc(arc.work.toUpperCase())}</text>
  <text x="36" y="110" font-family="Georgia,serif" font-size="54" font-weight="bold" fill="#e8d5a3">${esc(arc.name)}</text>
  <text x="38" y="140" font-family="Georgia,serif" font-size="18" font-style="italic" fill="${c}" opacity="0.8">${esc(arc.subtitle)}</text>
  <rect x="36" y="158" width="220" height="1" fill="${c}" opacity="0.35"/>
  ${summaryLines.slice(0,5).map((l,i)=>`<text x="36" y="${summaryY+i*22}" font-family="Georgia,serif" font-size="14" fill="#9a8a6a">${esc(l)}</text>`).join("\n  ")}
  <text x="36" y="${shadowLabelY}" font-family="'Courier New',monospace" font-size="10" fill="${c}" opacity="0.6" letter-spacing="2">SHADOW SELF</text>
  ${shadowLines.slice(0,2).map((l,i)=>`<text x="36" y="${shadowY+i*19}" font-family="Georgia,serif" font-size="13" font-style="italic" fill="#6a5a35">${esc(l)}</text>`).join("\n  ")}
  <rect x="36" y="${quoteBoxY}" width="${W-72}" height="62" rx="2" fill="${c}" fill-opacity="0.08" stroke="${c}" stroke-opacity="0.2" stroke-width="1"/>
  ${quoteLines.slice(0,3).map((l,i)=>`<text x="48" y="${quoteBoxY+22+i*18}" font-family="Georgia,serif" font-size="13" font-style="italic" fill="#7a6a45">${esc(l)}</text>`).join("\n  ")}
  <text x="36" y="${H-20}" font-family="'Courier New',monospace" font-size="10" fill="#3a2a0e" letter-spacing="1">RESONATES WITH</text>
  <text x="160" y="${H-20}" font-family="'Courier New',monospace" font-size="10" fill="${secArc.color}" opacity="0.8">${secArc.icon} ${esc(secArc.name.toUpperCase())} (${esc(secArc.author.toUpperCase())})</text>
  ${isClash ? `<text x="500" y="${H-20}" font-family="'Courier New',monospace" font-size="10" fill="#A0845C">⚡ DIVIDED SOUL</text>` : ""}
  <text x="${W-36}" y="${H-20}" font-family="'Courier New',monospace" font-size="10" fill="#2a1e0e" text-anchor="end" letter-spacing="1">THE LITERARY SOUL</text>
</svg>`;
}

function downloadSVG(arc, secArc, isClash) {
  const svgString = buildSVG(arc, secArc, isClash);
  const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `literary-soul-${arc.name.toLowerCase().replace(/\s+/g,"-")}.svg`;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}
