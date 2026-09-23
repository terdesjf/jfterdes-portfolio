#!/usr/bin/env node
/**
 * Verifies that production is actually serving the static assets in public/.
 *
 * Since 2026-08-11 this project auto-deploys: pushing to `main` ships to
 * production (Vercel project `jfterdes-portfolio`, personal `terdesjf` account).
 * This script confirms a push actually landed rather than assuming it did — the
 * previous CLI-only setup let the headshot commit sit pushed-but-undeployed for
 * a week, with /jose-terdes.webp 404'ing live the whole time.
 *
 * Caveat, stated honestly: this checks ASSETS, not arbitrary code changes. A
 * text-only edit that adds no file to public/ will still pass. It catches the
 * "new asset never deployed" class of drift, which is the one that has bitten.
 */
import { readdir } from "node:fs/promises";
import path from "node:path";

// Update this when a custom domain is added; override ad hoc with SITE_URL=...
const SITE = process.env.SITE_URL ?? "https://jfterdes-portfolio-gules.vercel.app";
const PUBLIC_DIR = path.join(import.meta.dirname, "..", "public");
const TIMEOUT_MS = 20_000;

/**
 * HEAD the URL, falling back to GET if the origin rejects HEAD.
 *
 * Deliberately avoids AbortSignal.timeout() and keep-alive sockets: both leave
 * handles pending on the event loop, which on Windows crashed the process with
 * a libuv assertion (`UV_HANDLE_CLOSING`) and clobbered the real exit code.
 * An explicit controller + `connection: close` + draining the body lets the
 * loop empty on its own, so the process can exit normally.
 */
async function probe(url) {
  const attempt = async (method) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(url, {
        method,
        signal: controller.signal,
        headers: { connection: "close" },
      });
      await res.body?.cancel();
      return res.status;
    } finally {
      clearTimeout(timer);
    }
  };

  try {
    let status = await attempt("HEAD");
    if (status === 405 || status === 501) status = await attempt("GET");
    return status;
  } catch (err) {
    return err.name === "AbortError" ? "timeout" : "unreachable";
  }
}

const assets = (await readdir(PUBLIC_DIR, { withFileTypes: true }))
  .filter((entry) => entry.isFile())
  .map((entry) => entry.name);

console.log(`Checking ${SITE}`);
console.log(`Expecting ${assets.length} asset(s) from public/\n`);

const targets = [
  { label: "/ (homepage)", url: SITE },
  ...assets.map((name) => ({
    label: `/${name}`,
    url: `${SITE}/${encodeURIComponent(name)}`,
  })),
];

const results = await Promise.all(
  targets.map(async (t) => ({ ...t, status: await probe(t.url) })),
);

for (const r of results) {
  const mark = r.status === 200 ? "OK  " : "FAIL";
  console.log(`  ${mark}  ${String(r.status).padEnd(11)}  ${r.label}`);
}

const failed = results.filter((r) => r.status !== 200);

if (failed.length === 0) {
  console.log("\nProduction is serving every asset in public/.");
} else {
  console.error(
    `\n${failed.length} of ${results.length} check(s) failed.\n` +
      "A 404 on a file that exists locally means production is running an older\n" +
      "build. Deploy it with:  npm run deploy\n",
  );
  // Set the code rather than calling process.exit(), so pending handles unwind
  // cleanly instead of tripping the libuv assertion described above.
  process.exitCode = 1;
}
