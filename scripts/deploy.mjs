#!/usr/bin/env node
/**
 * One-command production deploy: auth check -> build -> deploy -> verify.
 *
 * NOT the normal path anymore. As of 2026-08-11 production auto-deploys when
 * `main` is pushed, so `git push` is the everyday way to ship. Keep this as a
 * manual escape hatch: deploying without pushing, or shipping when the GitHub
 * integration is down.
 *
 * Guards the bare `npx vercel --prod`, which fails confusingly when the stored
 * CLI token has expired (see the login guard below).
 */
import { spawnSync } from "node:child_process";

const run = (cmd, args, opts = {}) =>
  spawnSync(cmd, args, { stdio: "inherit", shell: true, ...opts });

const capture = (cmd, args) =>
  spawnSync(cmd, args, { encoding: "utf8", shell: true });

function die(message) {
  console.error(`\n${message}\n`);
  process.exit(1);
}

// 1. Auth guard. The stored token in %APPDATA%/com.vercel.cli/Data/auth.json
//    expires silently; without this check the deploy fails with the misleading
//    "Could not retrieve Project Settings ... remove the .vercel directory".
console.log("[1/4] Checking Vercel auth...");
const who = capture("npx", ["vercel", "whoami"]);
if (who.status !== 0) {
  die(
    "Not logged in to Vercel (your CLI token has likely expired).\n\n" +
      "Run this first, then re-run `npm run deploy`:\n\n" +
      "    npx vercel login\n\n" +
      "Sign in as the PERSONAL account that owns the project: terdesjf.\n" +
      "(Not jose-innovationhub -- that is the old company account.)\n\n" +
      "DO NOT delete the .vercel directory, even if the CLI suggests it --\n" +
      ".vercel/project.json holds the real projectId/orgId, and removing it can\n" +
      "create a DUPLICATE project on a new URL instead of updating the live site.",
  );
}
console.log(`      Logged in as: ${who.stdout.trim().split("\n").pop()}`);

// 2. Build locally first, so a broken build fails fast and cheap.
console.log("\n[2/4] Building...");
if (run("npm", ["run", "build"]).status !== 0) {
  die("Build failed. Fix the build before deploying.");
}

// 3. Ship it.
console.log("\n[3/4] Deploying to production...");
if (run("npx", ["vercel", "--prod", "--yes"]).status !== 0) {
  die("Deploy failed. See the Vercel output above.");
}

// 4. Prove it actually landed, rather than assuming.
console.log("\n[4/4] Verifying production...");
if (run("node", ["scripts/check-live.mjs"]).status !== 0) {
  die(
    "Deploy reported success but production is still missing assets.\n" +
      "The CDN can lag a few seconds -- re-run `npm run check:live` before digging in.",
  );
}

console.log("\nDone. Production is live and verified.");
