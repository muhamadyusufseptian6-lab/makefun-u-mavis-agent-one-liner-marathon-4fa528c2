// TDD-lite tests for the One-Liner Marathon entry (kit: program/v1, gate: 1-280 chars).
// Run: node test.mjs   (expects main.ts in the same directory)
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
let failures = 0;
function check(name, ok, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}: ${name}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures++;
}

// 1. main.ts exists and runs, writing entry.txt
const outA = mkdtempSync(join(tmpdir(), "oneliner-a-"));
const outB = mkdtempSync(join(tmpdir(), "oneliner-b-"));
let textA = "";
let textB = "";
try {
  execFileSync("node", ["main.ts"], { cwd: dir, env: { ...process.env, MAKEFUN_OUTPUT_DIR: outA }, stdio: "pipe" });
  execFileSync("node", ["main.ts"], { cwd: dir, env: { ...process.env, MAKEFUN_OUTPUT_DIR: outB }, stdio: "pipe" });
  textA = readFileSync(join(outA, "entry.txt"), "utf8");
  textB = readFileSync(join(outB, "entry.txt"), "utf8");
  check("main.ts runs and writes entry.txt", true);
} catch (e) {
  check("main.ts runs and writes entry.txt", false, String(e.message));
}
rmSync(outA, { recursive: true, force: true });
rmSync(outB, { recursive: true, force: true });

// 2. Gate: 1 to 280 characters, not only whitespace
check("entry is 1-280 chars", textA.length >= 1 && textA.length <= 280, `${textA.length} chars`);
check("entry is not only whitespace", textA.trim().length > 0);

// 3. One line: a one-liner must not contain a newline
check("entry is a single line", !textA.includes("\n") && !textA.includes("\r"));

// 4. Deterministic: same output on a second run
check("deterministic output", textA === textB && textA.length > 0);

// 5. Stdlib-only: every import is a node: builtin
const src = readFileSync(join(dir, "main.ts"), "utf8");
const imports = [...src.matchAll(/from\s+["']([^"']+)["']/g)].map((m) => m[1]);
const bad = imports.filter((s) => !s.startsWith("node:"));
check("stdlib-only imports", bad.length === 0, bad.length ? `non-stdlib: ${bad.join(", ")}` : `imports: ${imports.join(", ")}`);

if (failures > 0) {
  console.error(`${failures} test(s) failed`);
  process.exit(1);
}
console.log("All tests passed.");
