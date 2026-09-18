const path = require("path");
const lhr = require(path.join(__dirname, "..", "shots", "lighthouse.json"));
const audits = lhr.audits;
console.log("BREAKDOWN:", JSON.stringify(audits["lcp-breakdown-insight"].details, null, 2).slice(0, 2000));
console.log("\nNETWORK TREE:", JSON.stringify(audits["network-dependency-tree-insight"].details, null, 2).slice(0, 1500));
