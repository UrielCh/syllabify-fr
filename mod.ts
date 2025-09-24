/**
 * french syllabic splitter by Bilgé Kimyonok
 * https://github.com/WhiteFangs
 *
 * source: https://github.com/WhiteFangs/PoetifyJS/blob/master/poetify.js
 *
 * @param s word to syllabify
 * @returns splited word in syllabes
 */
export interface SyllabifyResult {
  syllabes: string[];
  nb: number;
  max: number;
}

export function syllabify(s: string): SyllabifyResult {
  if (s.toLowerCase() == "pays") { // Exception pour ce mot ingérable autrement
    return ({ syllabes: ["pa", "ys"], nb: 2, max: 2 });
  }
  if (!s.trim().match(/[a-zA-Z]/g)) {
    return { syllabes: [], nb: 0, max: 0 };
  }
  const consonnes = [
    "b",
    "B",
    "c",
    "C",
    "ç",
    "Ç",
    "d",
    "D",
    "f",
    "F",
    "g",
    "G",
    "h",
    "H",
    "j",
    "J",
    "k",
    "K",
    "l",
    "L",
    "m",
    "M",
    "n",
    "N",
    "ñ",
    "Ñ",
    "p",
    "P",
    "q",
    "Q",
    "r",
    "R",
    "s",
    "S",
    "t",
    "T",
    "v",
    "V",
    "w",
    "W",
    "x",
    "X",
    "y",
    "Y",
    "z",
    "Z",
    "-",
  ];
  const voyellesFortes = [
    "a",
    "A",
    "á",
    "Á",
    "à",
    "À",
    "â",
    "Â",
    "e",
    "E",
    "é",
    "É",
    "è",
    "È",
    "ê",
    "Ê",
    "í",
    "Í",
    "o",
    "ó",
    "O",
    "Ó",
    "ô",
    "Ô",
    "ú",
    "Ú",
  ];
  const voyellesFaibles = [
    "i",
    "I",
    "u",
    "U",
    "ü",
    "Ü",
    "ï",
    "Ï",
    "î",
    "Î",
    "û",
    "Û",
  ];
  const voyelles = voyellesFortes.concat(voyellesFaibles, ["y", "Y"]);
  let nb, coupure, voy;
  let j = 0, max = 0;
  const n = s.length - 1;
  let i = 0;
  const syllabes: string[] = [];
  while (i <= n) {
    coupure = 0; // Ne coupe pas
    if (consonnes.indexOf(s.charAt(i)) > -1) {
      if (voyelles.indexOf(s.charAt(i + 1)) > -1) {
        if (s.toLowerCase().charAt(i) == "y") { // diérèse possible du y utilisé comme consonne
          max++;
        }
        if (voyelles.indexOf(s.charAt(i - 1)) > -1) {
          coupure = 1;
        }
      } else if (
        (["s", "S"].indexOf(s.charAt(i)) > -1) &&
        (["n", "N"].indexOf(s.charAt(i - 1)) > -1) &&
        (consonnes.indexOf(s.charAt(i + 1)) > -1)
      ) {
        coupure = 2;
      } else if (
        (consonnes.indexOf(s.charAt(i + 1)) > -1) &&
        (voyelles.indexOf(s.charAt(i - 1)) > -1)
      ) {
        if (["r", "R"].indexOf(s.charAt(i + 1)) > -1) {
          if (
            [
              "b",
              "B",
              "c",
              "C",
              "d",
              "D",
              "f",
              "F",
              "g",
              "G",
              "k",
              "K",
              "p",
              "P",
              "r",
              "R",
              "t",
              "T",
              "v",
              "V",
            ].indexOf(s.charAt(i)) > -1
          ) {
            coupure = 1;
          } else {
            coupure = 2;
          }
        } else if (["l", "L"].indexOf(s.charAt(i + 1)) > -1) {
          if (
            [
              "b",
              "B",
              "c",
              "C",
              "d",
              "D",
              "f",
              "F",
              "g",
              "G",
              "k",
              "K",
              "l",
              "L",
              "p",
              "P",
              "t",
              "T",
              "v",
              "V",
            ].indexOf(s.charAt(i)) > -1
          ) {
            coupure = 1;
          } else {
            coupure = 2;
          }
        } else if (["h", "H"].indexOf(s.charAt(i + 1)) > -1) {
          if (["c", "C", "s", "S", "p", "P"].indexOf(s.charAt(i)) > -1) {
            coupure = 1;
          } else {
            coupure = 2;
          }
        } else if (
          (["g", "G"].indexOf(s.charAt(i)) > -1) &&
          (["n", "N"].indexOf(s.charAt(i + 1)) > -1)
        ) {
          // treat 'gn' as a single palatal consonant that starts the next syllable (ex: champignon -> cham-pi-gnon)
          coupure = 1;
        } else if (
          (["t", "T", "p", "P"].indexOf(s.charAt(i + 1)) > -1) &&
          (["s", "S"].indexOf(s.charAt(i + 2)) > -1)
        ) { // pour des mots comme "verts" ou "corps"
          coupure = 0;
        } else {
          coupure = 2;
        }
      }
    } else if (voyellesFortes.indexOf(s.charAt(i)) > -1) {
      if (
        (voyellesFortes.indexOf(s.charAt(i - 1)) > -1) &&
        (s.substring(i - 2, i).toLowerCase() != "ge") &&
        (s.substring(i - 1, i + 2).toLowerCase() != "eau") &&
        (s.substring(i - 1, i + 1).toLowerCase() != "oe") &&
        ((s.substring(i - 1, i + 2).toLowerCase() != "ée") &&
          (s.substring(i + 1, i + 2).toLowerCase() != "ées") &&
          (s.substring(i + 1, i + 4).toLowerCase() != "éent"))
      ) {
        coupure = 1;
      }
    } else if (
      voyellesFaibles.indexOf(s.charAt(i)) > -1 &&
      (s.substring(i - 1, i + 1).toLowerCase() != "qu") &&
      (s.substring(i - 1, i + 1).toLowerCase() != "gu")
    ) { // Gestion de la diérèse éventuelle, sauf pour les cas avec "qu" / "gu"
      if (
        (voyelles.indexOf(s.charAt(i + 1)) > -1) &&
        (consonnes.indexOf(s.charAt(i - 1)) > -1) &&
        (consonnes.indexOf(s.charAt(i - 2)) > -1) &&
        (s.substring(i, i + 2).toLowerCase() != "ui")
      ) { // diérèse obligatoire si deux consonnes avant
        if (s.toLowerCase().charAt(i + 1) == "y") { // diérèse possible du y pour des mots comme "ennuyer" ou "essuyer"
          max++;
        }
        coupure = 2;
      } else if ((voyelles.indexOf(s.charAt(i + 1)) > -1)) {
        if (
          ((s.substring(i + 1, i + 4).toLowerCase() != "ent") &&
            (s.substring(i + 1, i + 4).toLowerCase() != "es")) || // Si terminaisons en "-aient" et en "-aie(s)" : pas de diérèse possible
          (s.substring(i, i + 2).toLowerCase() != "ui")
        ) { // Si mot comme "fruit", "bruit", "impuissant", diérèse très rare mais tolérable
          max++;
        }
      }
    }
    if (coupure == 1) { // Couper ici
      voy = s.substring(j, i);
      syllabes.push(voy);
      j = i;
    } else if (coupure == 2) { // Couper au caractère suivant
      i++;
      voy = s.substring(j, i);
      syllabes.push(voy);
      j = i;
    }
    i++;
  }
  nb = syllabes.length;
  if ((j == n) && (nb > 0) && (consonnes.indexOf(s.charAt(n)) > -1)) { //Dernière lettre
    syllabes[nb - 1] = syllabes[nb - 1] + s.charAt(n);
  } else {
    voy = s.substring(j, n + 1);
    syllabes.push(voy); // Dernière syllabe
    nb++;
  }
  return { syllabes: syllabes, nb: nb, max: nb + max };
}

export default syllabify;
