import { assertEquals } from "jsr:@std/assert";
import { syllabify } from "./mod.ts";

Deno.test(function splitBonjour() {
  const { syllabes, nb, max } = syllabify("bonjour");
  assertEquals(syllabes, ["bon", "jour"]);
  assertEquals(nb, 2);
  assertEquals(max, 2);
});
