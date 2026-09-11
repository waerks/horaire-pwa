import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const input = process.argv[2] ?? "./horaire_classe.pdf";
const output = "./data/schedule.json";
const starts = ["08:30","09:20","10:30","11:20","13:00","13:50","14:50","15:40"];
const ends = {"08:30":"09:20","09:20":"10:20","10:30":"11:20","11:20":"12:10","13:00":"13:50","13:50":"14:40","14:50":"15:40","15:40":"16:30"};

const data = new Uint8Array(await fs.readFile(input));
const pdf = await pdfjsLib.getDocument({ data }).promise;
let text = "";
for (let i = 1; i <= pdf.numPages; i++) {
  const page = await pdf.getPage(i);
  const content = await page.getTextContent();
  text += content.items.map((item) => item.str ?? "").join(" ") + "\n";
}

const header = {
  schoolYear: (text.match(/Année\s*:\s*([0-9-]+)/i) ?? [,""])[1],
  className: (text.match(/Classe\s*:\s*(.*?)(?:\s+1\s+\d{2}-\d{2}-\d{2})/i) ?? [,""])[1].trim(),
  center: (text.match(/Centre\s+IFAPME\s+Namur-Brabant wallon\s*-\s*Wavre/i) ? "IFAPME Namur-Brabant wallon - Wavre" : ""),
  address: "Rue Charles Jaumotte, 7, 1300 Wavre",
  location: "Centre de Formation (W1)",
  trade: "Décorateur d'intérieur (L15)",
  courseDay: "Vendredi"
};

const rowRe = /(\d+)\s+(\d{2}-\d{2}-\d{2})\s+Ve\s+(.+?)(?=\s+\d+\s+\d{2}-\d{2}-\d{2}\s+Ve|Centre IFAPME|Légende)/g;
const rows = [];
for (const match of text.matchAll(rowRe)) {
  const [, week, rawDate, body] = match;
  const slotRe = /(08:30|09:20|10:30|11:20|13:00|13:50|14:50|15:40)\s+([A-Z]{3})\s+\(([^)]+)\)/g;
  const slots = [...body.matchAll(slotRe)].map((m) => ({ start: m[1], code: m[2], room: m[3] }));
  if (!slots.length) continue;
  const [d,m,y] = rawDate.split("-");
  rows.push({ week: Number(week), date: `20${y}-${m}-${d}`, slots });
}

const sessions = [];
for (const row of rows) {
  for (const [period, periodStarts] of [
    ["morning", starts.slice(0,4)],
    ["afternoon", starts.slice(4)]
  ]) {
    const slots = row.slots.filter((s) => periodStarts.includes(s.start));
    const groups = [];
    for (const slot of slots) {
      const last = groups.at(-1);
      if (!last || last.code !== slot.code || last.room !== slot.room) {
        groups.push({ code: slot.code, room: slot.room, start: slot.start, end: ends[slot.start] });
      } else {
        last.end = ends[slot.start];
      }
    }
    groups.forEach((g, i) => sessions.push({ id: `${row.date}-${period}-${i+1}`, date: row.date, ...g }));
  }
}

// Subject metadata is deliberately parsed only from the PDF's own legend.
// If the PDF format changes substantially, adjust this regex rather than the UI.
const subjects = {};
const subjectRe = /([A-Z]{3})\s+L15\/5\s+(.+?)\s+(\d+)\s+([A-ZÀ-ÖØ-Þ][A-ZÀ-ÖØ-Þ ]+?)\s+([A-Z][a-zà-ÿ]+(?:\s+[A-Z][a-zà-ÿ]+)*)\s+(\d{2}-\d{2}-\d{2})\s+(\d{2}-\d{2}-\d{2})/g;
// The PDF text extraction differs by renderer, so keep subject rows conservative.
// Current source data is generated from the supplied PDF; future imports should be reviewed.
for (const match of text.matchAll(subjectRe)) {
  const [, code, name, hours, surname, firstName, startDate, endDate] = match;
  subjects[code] = { code, name: name.trim(), hours: Number(hours), teacher: `${firstName.trim()} ${surname.trim()}`, startDate, endDate };
}

const result = {
  meta: { ...header, hours: { semester1: 100, semester2: 144, total: 244 } },
  subjects,
  sessions
};
await fs.writeFile(output, JSON.stringify(result, null, 2) + "\n", "utf8");
console.log(`Imported ${sessions.length} grouped sessions into ${output}`);
