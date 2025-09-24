// dnt deps can not be moved to dev_deps.ts
import { build, emptyDir, type PackageJson } from "https://deno.land/x/dnt@0.40.0/mod.ts";
import * as pc from "https://deno.land/std@0.221.0/fmt/colors.ts";

export async function buildDnt() {
  let version = Deno.args[0];
  const GITHUB_REF = Deno.env.get("GITHUB_REF");
  const PKG_VERSION = Deno.env.get("PKG_VERSION");

  if (!version) {
    if (PKG_VERSION) {
      console.log(`NPM_VERSION values is "${pc.green(PKG_VERSION)}"`);
      version = PKG_VERSION;
    } else if (GITHUB_REF) {
      // drop the ref/tag/ and the v prefix
      version = GITHUB_REF.replace(/^.+\/[vV]?/g, "");
      console.log(
        `GITHUB_REF values is ${
          pc.green(
            GITHUB_REF,
          )
        } will be used as version: "${pc.green(version)}"`,
      );
    }
  }

  if (!version) {
    console.error("Missing version number");
    console.error("usage: deno run -A _build_npm.ts 0.0.0");
    Deno.exit(-1);
  }
  // allow only semver string
  if (!version.match(/[\d]+\.[\d]+\.[\d]+/)) {
    console.error(
      `version number ${
        pc.green(
          version,
        )
      } do not match Semantic Versioning syntax ${
        pc.green(
          "major.minor.path",
        )
      }`,
    );
    Deno.exit(-1);
  }

const githubOrg = "ktu-founders";
const githubName = "syllabify-fr";

const packageJson: PackageJson = {
  name: `@${githubOrg}/${githubName}`,
  author: `${githubOrg}`,
  license: "MIT",
  description: "syllabification of French words",
  keywords: ["syllable","french","deno"],
  version,                              // déjà calculé
  homepage: `https://github.com/${githubOrg}/${githubName}`,
  repository: {
    type: "git",
    url: `git+https://github.com/${githubOrg}/${githubName}.git`,
  },
  bugs: {
    url: `https://github.com/${githubOrg}/${githubName}/issues`,
  },
  engines: { node: ">=18" },            // remplace "engine-strict"
  publishConfig: {
    registry: "https://npm.pkg.github.com"
  }
};
  await emptyDir("./npm");

  await build({
    entryPoints: ["./mod.ts"],
    outDir: "./npm",
    test: false,
    shims: {
      // see JS docs for overview and more options
      deno: true,
      // webSocket: true,
      // undici: true,
      custom: [
        //   {
        //     package: {
        //       name: "stream/web",
        //     },
        //     globalNames: ["ReadableStream", "TransformStream"],
        //   },
        //   {
        //     globalNames: [{ name: "MessageEvent", typeOnly: true }],
        //     package: {
        //       name: "ws",
        //     },
        //   }
      ],
    },
    compilerOptions: {
      lib: ["DOM", "ESNext"],
    },
    package: packageJson,
  });

  // post build steps
  console.log("extra build steps");
  console.log("cwd:", Deno.cwd());
  Deno.copyFileSync("LICENSE", "npm/LICENSE");
  // let readme = Deno.readTextFileSync("README.md");
  // readme = readme.replaceAll(
  //   "https://deno.land/x/midjourney_discord_api/mod.ts",
  //   "midjourney-discord-api",
  // );
  // Deno.writeTextFileSync("npm/README.md", readme);
  // Deno.copyFileSync("README.md", "npm/README.md");
  // Deno.mkdirSync("npm/types/types");
  // const files = Deno.readDirSync("types");
  // for (const file of files) {
  //   if (!file.isFile)
  //     continue;
  //   let text = Deno.readTextFileSync(`types/${file.name}`)
  //   text = text.replace(/.d.ts(["'])/g, "$1");
  //   Deno.writeTextFileSync(`npm/types/types/${file.name}`, text);
  //   console.log(`copy types/${file.name} to npm/types/types/${file.name}`)
  // }
  //Deno.copyFileSync("types", "npm/types");
}

if (import.meta.main) {
  buildDnt();
}