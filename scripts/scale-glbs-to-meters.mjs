/**
 * Scale normalized GLBs to real-world meter dimensions for AR.
 *
 * All our GLBs are pre-normalized to max_dim = 1.0. This script sets
 * each GLB's root node scale so the model spans its real-world size
 * in meters (glTF standard). AR viewers then show true-to-life size.
 *
 * Usage: node scripts/scale-glbs-to-meters.mjs
 */

import { readFileSync, writeFileSync } from "fs";

// GLB filename → real-world dimensions in mm { w, h, d }
const MODELS = {
  "crescent-elegant.glb": { w: 135.17, h: 122.81, d: 57.88 },
  "miniature-al-aqsa-mosque.glb": { w: 69.0, h: 56.69, d: 79.67 },
  "prayer-bead-stand.glb": { w: 88.9, h: 114.33, d: 223.3 },
  "ayat-al-kursi.glb": { w: 230, h: 230, d: 15.6 },
  "fanoos.glb": { w: 105.16, h: 200.6, d: 103.47 },
  "crescent-bismillah.glb": { w: 217.82, h: 204.67, d: 57.17 },
  "crescent-ramadan.glb": { w: 217.82, h: 198.1, d: 57.17 },
  "ramadan-fanoos.glb": { w: 83.95, h: 124.4, d: 83.95 },
  "crescent-dates-pot.glb": { w: 229.52, h: 81.61, d: 211.62 },
  "pot-dates-holder.glb": { w: 170, h: 72.5, d: 170 },
  "ramadan-stand.glb": { w: 250, h: 252.5, d: 50 },
  "ramadan-crescent-with-floats.glb": { w: 228.75, h: 266.53, d: 38.85 },
  "la-ilaha-illa-allah-wall-art.glb": { w: 211.62, h: 211.62, d: 6.2 },
  "alhamdulillah-wall-art.glb": { w: 430.34, h: 825.05, d: 10.0 },
  "hijri-calendar.glb": { w: 200, h: 205, d: 50 },
  "madina-keychain.glb": { w: 50, h: 97.5, d: 7 },
  "al-aqsa-keychain.glb": { w: 50, h: 97.5, d: 7 },
  "kaaba-keychain.glb": { w: 50, h: 97.5, d: 7 },
};

const DIR = "public/models/islamic";

for (const [filename, dims] of Object.entries(MODELS)) {
  const filepath = `${DIR}/${filename}`;
  const buf = readFileSync(filepath);

  // Parse GLB header
  const magic = buf.readUInt32LE(0);
  if (magic !== 0x46546c67) {
    console.error(`${filename}: not a valid GLB (bad magic)`);
    continue;
  }

  // JSON chunk
  const jsonChunkLen = buf.readUInt32LE(12);
  const jsonChunkType = buf.readUInt32LE(16);
  if (jsonChunkType !== 0x4e4f534a) {
    console.error(`${filename}: expected JSON chunk`);
    continue;
  }
  const jsonStr = buf.slice(20, 20 + jsonChunkLen).toString("utf8");
  const gltf = JSON.parse(jsonStr);

  // Compute scale: max real-world dimension in meters
  const maxDimMm = Math.max(dims.w, dims.h, dims.d);
  const scaleM = maxDimMm / 1000; // mm → meters

  // Set root node(s) scale
  const sceneIdx = gltf.scene ?? 0;
  const scene = gltf.scenes[sceneIdx];
  for (const nodeIdx of scene.nodes) {
    const node = gltf.nodes[nodeIdx];
    // If node already has a scale, multiply it
    if (node.scale) {
      node.scale = node.scale.map((s) => s * scaleM);
    } else {
      node.scale = [scaleM, scaleM, scaleM];
    }
  }

  // Re-encode the modified JSON
  let newJsonStr = JSON.stringify(gltf);
  // GLB chunks must be 4-byte aligned; pad with spaces
  while (newJsonStr.length % 4 !== 0) newJsonStr += " ";
  const newJsonBuf = Buffer.from(newJsonStr, "utf8");

  // Binary chunk (everything after JSON chunk)
  const binChunkStart = 20 + jsonChunkLen;
  const binChunk = buf.slice(binChunkStart);

  // Rebuild GLB
  const totalLen = 12 + 8 + newJsonBuf.length + binChunk.length;
  const out = Buffer.alloc(totalLen);

  // Header
  out.writeUInt32LE(0x46546c67, 0); // magic "glTF"
  out.writeUInt32LE(2, 4); // version
  out.writeUInt32LE(totalLen, 8); // total length

  // JSON chunk header
  out.writeUInt32LE(newJsonBuf.length, 12); // chunk length
  out.writeUInt32LE(0x4e4f534a, 16); // chunk type "JSON"
  newJsonBuf.copy(out, 20);

  // Binary chunk (copy as-is)
  binChunk.copy(out, 20 + newJsonBuf.length);

  writeFileSync(filepath, out);
  console.log(`${filename}: scale set to ${scaleM.toFixed(5)}m (${maxDimMm}mm)`);
}

console.log("\nDone! All GLBs now use real-world meter dimensions.");
