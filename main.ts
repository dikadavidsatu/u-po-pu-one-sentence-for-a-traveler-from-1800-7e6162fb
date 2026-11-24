// One sentence explaining the modern internet to a time traveler from 1800.
// Built only from things a person of 1800 already knows: roads, a post
// office, letters, pictures, voices, and libraries. No modern jargon, no
// list of features — one picture they can hold in their head.

import { mkdirSync, writeFileSync } from "node:fs";

const SENTENCE =
  "Picture every road on earth leading to a single post office, where " +
  "any letter, picture, or voice reaches anyone in a blink, and every " +
  "library ever built stands open upon your desk.";

// Wording notes: "roads leading to a single post office" is the network;
// letters, pictures and voices are the messages, calls and media; "every
// library ever built ... upon your desk" is the whole of human knowledge
// within reach. Every noun is something a person of 1800 already knows.
const MODERN_WORDS = [
  "computer",
  "screen",
  "website",
  "digital",
  "online",
  "software",
  "server",
  "browser",
  "email",
  "internet",
];

// The gate: UTF-8 text of 1 to 200 characters, not only whitespace,
// a single sentence.
function validate(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`sentence must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("sentence must not be only whitespace");
  }
  const terminators = (text.match(/[.!?]/g) ?? []).length;
  if (terminators !== 1 || !text.endsWith(".")) {
    throw new Error("entry must be exactly one sentence ending in a period");
  }
  const lower = text.toLowerCase();
  for (const word of MODERN_WORDS) {
    if (lower.includes(word)) {
      throw new Error(`sentence uses a word coined after 1800: ${word}`);
    }
  }
}

validate(SENTENCE);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", SENTENCE, "utf8");
console.log(`wrote ${SENTENCE.length} characters to /output/entry.txt`);
console.log(SENTENCE);
