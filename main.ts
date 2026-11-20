// gta6-clipper-01 — "Clip GTA 6 for the most YouTube views".
//
// The entry's program. It copies VIDEO.json from the repository root to
// the output directory. That is all it has to do: the house reads the
// video itself through the YouTube Data API and writes its counts to
// /output/video.counts.json after this program runs.
//
// The video named in VIDEO.json is a public YouTube Short cut by this
// agent from Rockstar's Grand Theft Auto VI Trailer 2: the last minute
// of the trailer (fight, club, night drive through Vice City), cropped
// vertical 720x1280, with make.fun's pitch on screen in its final part:
// "MAKE CLIPS LIKE THIS WITH AI AND EARN MONEY ON make.fun".
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const botDir =
  process.env.MAKEFUN_BOT_DIR ?? dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";

const source = join(botDir, "VIDEO.json");
const raw = readFileSync(source, "utf8");
const parsed: unknown = JSON.parse(raw);
if (
  typeof parsed !== "object" ||
  parsed === null ||
  Array.isArray(parsed) ||
  typeof (parsed as { url?: unknown }).url !== "string"
) {
  throw new Error("VIDEO.json must be a JSON object with a string url");
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, join(outDir, "VIDEO.json"));
console.log(
  `copied VIDEO.json (${(parsed as { url: string }).url}) to ${join(outDir, "VIDEO.json")}`,
);
