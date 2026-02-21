/**
 * chatbot-chains.test.ts — 50 Q&A chain integrity + RAG coverage tests.
 *
 * Three suites:
 *   1. RAG_CONTEXT coverage — all facts that matter are present
 *   2. CHAIN_BASIC structure — no broken "Tell me about" refs, all 9 projects covered
 *   3. detectChainEntry accuracy — correct chain for every typed topic
 */

import { describe, test, expect } from "vitest";
import RAG_CONTEXT from "@/data/ragContext";
import { CHAIN_BASIC, CHAIN_TURING, detectChainEntry } from "@/data/chatChains";

// ── Helper ────────────────────────────────────────────────────────────────────

/** Find "Tell me about X" chips that don't have a matching chain key — those are bugs. */
function findBrokenTellMeRefs(chain: Record<string, string[]>): string[] {
  const allKeys = new Set(Object.keys(chain));
  const broken: string[] = [];
  for (const [key, nexts] of Object.entries(chain)) {
    for (const next of nexts) {
      if (next.startsWith("Tell me about") && !allKeys.has(next)) {
        broken.push(`"${key}" → "${next}" (missing key)`);
      }
    }
  }
  return broken;
}

/** Every non-terminal node should have at least one chip. */
function findEmptyNonTerminals(chain: Record<string, string[]>): string[] {
  // Only "How do I reach him?" is intentionally terminal
  const terminal = new Set(["How do I reach him?"]);
  return Object.entries(chain)
    .filter(([k, v]) => v.length === 0 && !terminal.has(k))
    .map(([k]) => k);
}

// ── Suite 1: RAG_CONTEXT coverage (16 tests) ─────────────────────────────────

describe("RAG_CONTEXT coverage", () => {
  test("contains Dev Trivedi's name", () => {
    expect(RAG_CONTEXT).toContain("Dev Trivedi");
  });

  test("contains contact email", () => {
    expect(RAG_CONTEXT).toContain("trivedidev16@gmail.com");
  });

  test("contains NJIT", () => {
    expect(RAG_CONTEXT).toContain("NJIT");
  });

  test("contains 4.0 GPA", () => {
    expect(RAG_CONTEXT).toContain("4.0");
  });

  test("contains RR Enterprise", () => {
    expect(RAG_CONTEXT).toContain("RR Enterprise");
  });

  test("contains Nuance Media", () => {
    expect(RAG_CONTEXT).toContain("Nuance Media");
  });

  test("contains Lintellect", () => {
    expect(RAG_CONTEXT).toContain("Lintellect");
  });

  test("contains FinMind", () => {
    expect(RAG_CONTEXT).toContain("FinMind");
  });

  test("contains DocWeave", () => {
    expect(RAG_CONTEXT).toContain("DocWeave");
  });

  test("contains Cyber Threat Predictor", () => {
    expect(RAG_CONTEXT).toContain("Cyber Threat");
  });

  test("contains PulseOps", () => {
    expect(RAG_CONTEXT).toContain("PulseOps");
  });

  test("contains SpendLens", () => {
    expect(RAG_CONTEXT).toContain("SpendLens");
  });

  test("contains VendorFlow", () => {
    expect(RAG_CONTEXT).toContain("VendorFlow");
  });

  test("contains RideShare", () => {
    expect(RAG_CONTEXT).toContain("RideShare");
  });

  test("contains ChatterBox", () => {
    expect(RAG_CONTEXT).toContain("ChatterBox");
  });

  test("contains no markdown headers or bold syntax", () => {
    expect(RAG_CONTEXT).not.toMatch(/^#{1,3} /m);
    expect(RAG_CONTEXT).not.toMatch(/\*\*/);
  });
});

// ── Suite 2: CHAIN_BASIC structure (18 tests) ─────────────────────────────────

describe("CHAIN_BASIC structure", () => {
  // Level 1 entry points
  test("has 'What has Dev built?' entry point", () => {
    expect(CHAIN_BASIC).toHaveProperty("What has Dev built?");
    expect(CHAIN_BASIC["What has Dev built?"]).toHaveLength(3);
  });

  test("has 'Is Dev available to hire?' entry point", () => {
    expect(CHAIN_BASIC).toHaveProperty("Is Dev available to hire?");
  });

  test("has 'What's his tech stack?' entry point", () => {
    expect(CHAIN_BASIC).toHaveProperty("What's his tech stack?");
  });

  test("has 'What's his background?' entry point", () => {
    expect(CHAIN_BASIC).toHaveProperty("What's his background?");
  });

  // All 9 projects have chain entries
  test("has chain entry for Lintellect", () => {
    expect(CHAIN_BASIC).toHaveProperty("Tell me about Lintellect");
    expect(CHAIN_BASIC["Tell me about Lintellect"].length).toBeGreaterThan(0);
  });

  test("has chain entry for FinMind", () => {
    expect(CHAIN_BASIC).toHaveProperty("Tell me about FinMind");
  });

  test("has chain entry for DocWeave", () => {
    expect(CHAIN_BASIC).toHaveProperty("Tell me about DocWeave");
  });

  test("has chain entry for Cyber Threat Predictor", () => {
    expect(CHAIN_BASIC).toHaveProperty("Tell me about Cyber Threat Predictor");
  });

  test("has chain entry for PulseOps", () => {
    expect(CHAIN_BASIC).toHaveProperty("Tell me about PulseOps");
  });

  test("has chain entry for SpendLens", () => {
    expect(CHAIN_BASIC).toHaveProperty("Tell me about SpendLens");
  });

  test("has chain entry for VendorFlow", () => {
    expect(CHAIN_BASIC).toHaveProperty("Tell me about VendorFlow");
  });

  test("has chain entry for RideShare", () => {
    expect(CHAIN_BASIC).toHaveProperty("Tell me about RideShare");
  });

  test("has chain entry for ChatterBox", () => {
    expect(CHAIN_BASIC).toHaveProperty("Tell me about ChatterBox");
  });

  test("has work experience entries", () => {
    expect(CHAIN_BASIC).toHaveProperty("Tell me about RR Enterprise");
    expect(CHAIN_BASIC).toHaveProperty("Tell me about Nuance Media");
  });

  test("'How do I reach him?' is the only terminal node", () => {
    expect(CHAIN_BASIC["How do I reach him?"]).toEqual([]);
    const empty = findEmptyNonTerminals(CHAIN_BASIC);
    expect(empty).toEqual([]);
  });

  test("no broken 'Tell me about' references", () => {
    const broken = findBrokenTellMeRefs(CHAIN_BASIC);
    expect(broken).toEqual([]);
  });

  // Design rule: every project node bridges to "What else did he ship?" or "Is Dev available to hire?"
  test("Lintellect chain includes a bridge chip", () => {
    const lintellect = CHAIN_BASIC["Tell me about Lintellect"] ?? [];
    const hasBridge = lintellect.some(c =>
      c.includes("else") || c.includes("available") || c.includes("hire")
    );
    expect(hasBridge).toBe(true);
  });

  test("all project-level chips lead somewhere or bridge out", () => {
    const projectEntries = [
      "Tell me about Lintellect", "Tell me about FinMind", "Tell me about DocWeave",
      "Tell me about Cyber Threat Predictor", "Tell me about PulseOps",
      "Tell me about SpendLens", "Tell me about VendorFlow",
      "Tell me about RideShare", "Tell me about ChatterBox",
    ];
    for (const entry of projectEntries) {
      const chips = CHAIN_BASIC[entry] ?? [];
      expect(chips.length).toBeGreaterThanOrEqual(2);
    }
  });
});

// ── Suite 3: detectChainEntry accuracy (16 tests) ────────────────────────────

describe("detectChainEntry", () => {
  test("'lintellect' → Lintellect detail questions", () => {
    const result = detectChainEntry("what is lintellect", "basic");
    expect(result).toEqual(CHAIN_BASIC["Tell me about Lintellect"]);
  });

  test("'finmind' → FinMind detail questions", () => {
    const result = detectChainEntry("tell me about finmind", "basic");
    expect(result).toEqual(CHAIN_BASIC["Tell me about FinMind"]);
  });

  test("'docweave' → DocWeave detail questions", () => {
    const result = detectChainEntry("how does docweave work", "basic");
    expect(result).toEqual(CHAIN_BASIC["Tell me about DocWeave"]);
  });

  test("'cyber threat' → Cyber Threat detail questions", () => {
    const result = detectChainEntry("what is the cyber threat predictor", "basic");
    expect(result).toEqual(CHAIN_BASIC["Tell me about Cyber Threat Predictor"]);
  });

  test("'pulseops' → PulseOps detail questions", () => {
    const result = detectChainEntry("explain pulseops", "basic");
    expect(result).toEqual(CHAIN_BASIC["Tell me about PulseOps"]);
  });

  test("'spendlens' → SpendLens detail questions", () => {
    const result = detectChainEntry("how does spendlens save money", "basic");
    expect(result).toEqual(CHAIN_BASIC["Tell me about SpendLens"]);
  });

  test("'vendorflow' → VendorFlow detail questions", () => {
    const result = detectChainEntry("what is vendorflow", "basic");
    expect(result).toEqual(CHAIN_BASIC["Tell me about VendorFlow"]);
  });

  test("'rideshare' → RideShare detail questions", () => {
    const result = detectChainEntry("how does rideshare work", "basic");
    expect(result).toEqual(CHAIN_BASIC["Tell me about RideShare"]);
  });

  test("'chatterbox' → ChatterBox detail questions", () => {
    const result = detectChainEntry("tell me about chatterbox", "basic");
    expect(result).toEqual(CHAIN_BASIC["Tell me about ChatterBox"]);
  });

  test("'rr enterprise' → work experience questions", () => {
    const result = detectChainEntry("did he work at rr enterprise", "basic");
    expect(result).toEqual(CHAIN_BASIC["Has he worked professionally?"]);
  });

  test("'hire' → hiring entry point", () => {
    const result = detectChainEntry("is dev available to hire", "basic");
    expect(result).toEqual(CHAIN_BASIC["Is Dev available to hire?"]);
  });

  test("'backend' → backend depth questions", () => {
    const result = detectChainEntry("what backend technologies does he know", "basic");
    expect(result).toEqual(CHAIN_BASIC["What's his backend depth?"]);
  });

  test("'education' → study questions", () => {
    const result = detectChainEntry("where did he go to school", "basic");
    expect(result).toEqual(CHAIN_BASIC["Where did he study?"]);
  });

  test("unknown topic → generic entry suggestions (non-empty)", () => {
    const result = detectChainEntry("what do you think about the weather", "basic");
    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain("What has Dev built?");
  });

  test("'distributed' in turing mode → CAP theorem questions", () => {
    const result = detectChainEntry("how did he handle distributed systems", "turing");
    expect(result).toEqual(CHAIN_TURING["CAP theorem tradeoffs in his work?"]);
  });

  test("null mode → basic fallback", () => {
    const result = detectChainEntry("hello", null);
    expect(result).toContain("What has Dev built?");
  });
});
