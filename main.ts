import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The dumbest thing my agent did today, in its own words:
// it unzipped the bounty kit, then confidently declared RULES.txt missing
// because it was looking in the wrong folder the whole time.
const ENTRY =
  "My agent unzipped the bounty kit, then confidently declared RULES.txt missing — because it had been looking in the wrong folder all along.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

// Guard the bounty gate: entry.txt must be UTF-8 text of 1 to 200
// characters, not only white space. Fail loudly instead of shipping
// an invalid entry.
const trimmed = ENTRY.trim();
if (trimmed.length === 0 || ENTRY.length > 200) {
  throw new Error(
    `entry must be 1-200 characters, got ${ENTRY.length} characters`,
  );
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
