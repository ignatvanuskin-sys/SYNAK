const path = require("path");
const lhr = require(path.join(__dirname, "..", "shots", "lighthouse.json"));
const audits = lhr.audits;
for (const id of Object.keys(audits)) {
  if (/lcp|largest|contentful/i.test(id)) console.log("audit:", id, "score:", audits[id].score);
}
const lcpEl = audits["largest-contentful-paint-element"];
if (lcpEl && lcpEl.details) {
  console.log("LCP ELEMENT DETAILS:", JSON.stringify(lcpEl.details).slice(0, 1200));
}
const phases = audits["lcp-discovery"] || audits["lcp-phases"];
if (phases) console.log("DISCOVERY:", JSON.stringify(phases.details).slice(0, 1200));
