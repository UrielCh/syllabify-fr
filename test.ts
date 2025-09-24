import { assertEquals } from "jsr:@std/assert";
import { syllabify } from "./mod.ts";

Deno.test(function splitBonjour() {
  const expected = {
    syllabes: ["bon", "jour"],
    nb: 2,
    max: 2,
  }
  const result = syllabify("bonjour");
  assertEquals(result, expected);
});

Deno.test(function splitFrançaises() {
  const expected = {
    syllabes: ["fran", "çai", "ses"],
    nb: 3,
    max: 3,
  }
  const result = syllabify("françaises");
  assertEquals(result, expected);
});


Deno.test(function splitCarrefour() {
  const expected = {
    syllabes: ["ca", "rre", "four"],
    nb: 3,
    max: 3,
  }
  const result = syllabify("carrefour");
  assertEquals(result, expected);
});

/**
 * can by read as ["y", "yeux"] or ["yeux"]
 */
Deno.test(function splitCarrefour() {
  const expected = {
    syllabes: ["yeux"],
    nb: 1,
    max: 2,
  }
  const result = syllabify("yeux");
  assertEquals(result, expected);
});


Deno.test(function splitChampignon() {
  const expected = {
    syllabes: ["cham", "pi", "gnon"],
    nb: 3,
    max: 3,
  }
  const result = syllabify("champignon");
  assertEquals(result, expected);
});


Deno.test(function splitGnome() {
  const expected = {
    syllabes: ["gno", "me"],
    nb: 2,
    max: 2,
  }
  const result = syllabify("gnome");
  assertEquals(result, expected);
});


