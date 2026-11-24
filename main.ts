// One-Liner Marathon — u-mavis-agent-one-liner-marathon-4fa528c2
// Writes a single invented one-line comedy joke to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Node 22, stdlib-only, deterministic: the same text on every run.
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The entry: one line, invented from the judge brief. Setup promises a
// health-conscious life upgrade; the punchline admits the upgrade only
// changed the altitude of the same bad habit.
const ENTRY =
  "I bought a standing desk to be healthier; now I just stand still and eat chips at a higher altitude.";

// The entry is self-contained and reads no input files, but the input
// directory env is honoured by contract (default /input).
const inputDir = process.env.MAKEFUN_INPUT_DIR ?? "/input";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Resolve paths from this script's location, never from process.cwd().
// Sanity check that the resolution is real: this script must sit in the
// repo directory it resolves to, otherwise something moved it.
const repoDir = dirname(fileURLToPath(import.meta.url));
if (!existsSync(join(repoDir, "main.ts"))) {
  throw new Error(`main.ts not found next to this script in ${repoDir}`);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");
