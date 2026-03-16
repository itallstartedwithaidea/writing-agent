/**
 * AI Phrase Blacklist — Zero Tolerance Kill List
 * 
 * These phrases are statistically overrepresented in AI-generated text
 * and are specifically targeted by detection tools including:
 *   - GPTZero (n-gram frequency analysis)
 *   - Overchat (repetitive AI phrase detection)
 *   - Grammarly (pattern matching)
 *   - Winston AI (bypassing strategy detection)
 * 
 * Any occurrence of these phrases is a QA HARD FAIL (Check #17).
 * 
 * Sources:
 *   - Overchat AI Hub (2025) — AI pattern analysis
 *   - GPTZero blog — Common AI writing patterns
 *   - Community research — Frequently flagged phrases
 */

export const PHRASE_BLACKLIST = [
  // ─── Transition / Connector Phrases ───
  "in today's landscape",
  "in today's digital landscape",
  "in the ever-evolving landscape",
  "in today's fast-paced world",
  "in today's world",
  "in an era where",
  "in the realm of",
  "it's important to note",
  "it's worth noting",
  "it is worth noting",
  "it bears mentioning",
  "moreover",
  "furthermore",
  "additionally",
  "in conclusion",
  "to summarize",
  "in summary",
  "that being said",
  "having said that",
  "with that in mind",
  "all things considered",
  "at the end of the day",
  "when all is said and done",
  "by the same token",
  "in light of",
  "in light of this",
  "needless to say",
  "it goes without saying",

  // ─── AI Action Verbs ───
  "delve into",
  "delve deeper",
  "delving into",
  "navigate the complexities",
  "navigating the complexities",
  "leverage the power",
  "leveraging the power",
  "harness the power",
  "harnessing the power",
  "unlock the potential",
  "unlocking the potential",
  "unlock the power",
  "tap into",
  "tapping into",
  "embark on",
  "embarking on",
  "embark on a journey",
  "spearhead",
  "spearheading",
  "streamline",
  "streamlining",
  "revolutionize",
  "revolutionizing",
  "supercharge",

  // ─── AI Adjectives/Descriptors ───
  "game-changer",
  "game changer",
  "groundbreaking",
  "cutting-edge",
  "state-of-the-art",
  "best-in-class",
  "world-class",
  "holistic",
  "comprehensive",
  "robust",
  "seamless",
  "seamlessly",
  "pivotal",
  "paramount",
  "indispensable",
  "multifaceted",
  "transformative",
  "innovative",

  // ─── AI Nouns/Concepts ───
  "tapestry",
  "synergy",
  "paradigm",
  "paradigm shift",
  "landscape",
  "ecosystem",
  "deep dive",
  "a deep dive",
  "a closer look",
  "actionable insights",
  "key takeaways",
  "thought leadership",
  "value proposition",
  "pain points",
  "stakeholders",
  "bandwidth",
  "low-hanging fruit",
  "move the needle",

  // ─── AI Opening Patterns ───
  "are you looking to",
  "if you're looking to",
  "whether you're a",
  "in the world of",
  "when it comes to",
  "it's no secret that",
  "there's no denying",
  "picture this",
  "imagine a world",
  "let's face it",
  "let's dive in",
  "let's break it down",
  "let's explore",
  "let's take a closer look",
  "let's delve",

  // ─── AI Closing Patterns ───
  "only time will tell",
  "the possibilities are endless",
  "the future is bright",
  "stay tuned",
  "food for thought",
  "the ball is in your court",
  "what are your thoughts",

  // ─── AI Filler / Hedging ───
  "it's crucial to",
  "it's essential to",
  "it's vital to",
  "plays a crucial role",
  "plays a vital role",
  "plays a pivotal role",
  "serves as a testament",
  "stands as a testament",
  "it should be noted",
  "one might argue",
  "it can be argued",
  "arguably",
  "elevate your",
  "elevate the",
  "foster",
  "fostering",
  "cultivate",
  "cultivating",
  "empower",
  "empowering",
];

/**
 * Check text for blacklisted phrases
 * @param {string} text
 * @returns {string[]} Found phrases
 */
export function findBlacklistedPhrases(text) {
  const lower = text.toLowerCase();
  return PHRASE_BLACKLIST.filter(phrase => lower.includes(phrase.toLowerCase()));
}

/**
 * Get suggested replacements for common AI phrases
 * @param {string} phrase
 * @returns {string[]} Alternative phrasings
 */
export function getSuggestions(phrase) {
  const suggestions = {
    "moreover": ["also", "and", "on top of that", "plus"],
    "furthermore": ["beyond that", "and", "there's more", "add to that"],
    "in conclusion": ["so", "here's the bottom line", "the takeaway", "where does that leave us"],
    "it's important to note": ["worth mentioning", "keep in mind", "one thing", "the part people miss"],
    "delve into": ["dig into", "break down", "look at", "get into"],
    "leverage": ["use", "put to work", "apply", "lean on"],
    "robust": ["strong", "solid", "reliable", "battle-tested"],
    "seamlessly": ["smoothly", "without friction", "cleanly", "naturally"],
    "game-changer": ["big deal", "shift", "turning point", "the thing that changed everything"],
    "holistic": ["full-picture", "complete", "end-to-end", "the whole thing"],
    "streamline": ["simplify", "clean up", "cut the fat from", "speed up"],
  };
  return suggestions[phrase.toLowerCase()] || ["[rewrite in your own words]"];
}
