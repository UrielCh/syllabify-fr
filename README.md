# syllabify-fr

`syllabify-fr` is a TypeScript library for syllabification of French words,
inspired by and based upon the works of
[Bilgé Kimyonok](https://github.com/WhiteFangs). It is designed to be used in
both Deno and Node.js environments, utilizing `dnt` for conversion. This library
takes a French word as input and returns its syllables, along with the count of
syllables and the maximum syllable length.

## Acknowledgments

This project is based on the pioneering work of
[Bilgé Kimyonok](https://github.com/WhiteFangs), whose contributions to the
field of natural language processing and syllabification have inspired the
development of `syllabify-fr`. We are grateful for their original work and
recommend users to explore their contributions.

## Features

- **Syllabification of French words:** Break down French words into their
  constituent syllables.
- **Count syllables:** Get the total number of syllables in the word.
- **Maximum syllable length:** Identify the length of the longest syllable in
  the word.

## Installation

### For Deno

```typescript
import syllabify from "https://raw.githubusercontent.com/UrielCh/syllabify-fr/main/mod.ts";
```

### For Node.js

First, ensure you have Node.js installed on your machine. Then, you can install
syllabify-fr using npm:

```sh
npm install syllabify-fr
```

## Usage

Here's how you can use syllabify-fr to syllabify French words:

```typescript
// using nodeJS
import syllabify from "syllabify-fr";
// using Deno
import syllabify from "https://raw.githubusercontent.com/UrielCh/syllabify-fr/main/mod.ts";

const { syllabes, nb, max } = syllabify("exemple");

console.log(`Syllables: ${syllabes.join(", ")}`);
console.log(`Number of syllables: ${nb}`);
console.log(`Maximum syllable length: ${max}`);
```

## API

`syllabify(s: string): { syllabes: string[], nb: number, max: number }`

- **s**: The French word to be syllabified.
- **returns**: An object containing:
  - `syllabes`: An array of strings, each representing a syllable of the input
    word.
  - `nb`: The total number of syllables in the input word.
  - `max`: The length of the longest syllable in the input word.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an
issue if you have suggestions or find a bug.

If you contribute. First install Deno following the instructions at
https://deno.land. Then you can run the tests from the repository root:

```bash
deno test
```

# Komunikatu

to build and published forked package run
`deno run -A _build_npm.ts  ${version}
(cd npm && npm publish --access restricted)`
License [MIT](LICENSE.md) © [Uriel Chemouni]
