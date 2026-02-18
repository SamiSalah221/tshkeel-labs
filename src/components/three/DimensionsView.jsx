import { useGLTF, Html, Line } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import { IPHONE_DIMENSIONS, IPHONE_MODEL_PATH } from "../../config/products";

export default function DimensionsView({ productBBox, productDimensions, heightSplit }) {
  const { scene: iphoneScene } = useGLTF(IPHONE_MODEL_PATH);

  // ── useMemo #1: Clone iPhone, center at origin, dark material, track tallest axis ──
  const { clone, iphoneBBoxSize, iphoneTallAxisIndex } = useMemo(() => {
    const c = iphoneScene.clone(true);
    c.updateWorldMatrix(true, true);

    const box = new THREE.Box3().setFromObject(c);
    const boxCenter = new THREE.Vector3();
    box.getCenter(boxCenter);
    const boxSize = new THREE.Vector3();
    box.getSize(boxSize);

    // Center the clone at origin
    c.position.set(-boxCenter.x, -boxCenter.y, -boxCenter.z);

    // Dark silhouette material
    c.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
        child.material.color.set("#222222");
        child.material.metalness = 0.8;
        child.material.roughness = 0.3;
      }
    });

    // Track which axis is tallest (for label positioning)
    const axes = [boxSize.x, boxSize.y, boxSize.z];
    let tallIdx = 0;
    if (axes[1] > axes[tallIdx]) tallIdx = 1;
    if (axes[2] > axes[tallIdx]) tallIdx = 2;

    return { clone: c, iphoneBBoxSize: boxSize, iphoneTallAxisIndex: tallIdx };
  }, [iphoneScene]);

  // ── useMemo #2: All layout computation ──
  const {
    center, iphoneScaleFactor, iphonePos, scaledIphoneTallDim,
    tickLen, lineOffset, labelOffset,
    left, right, bottom, top, back, front,
    xMM, yMM, zMM, heightSplitInfo,
  } = useMemo(() => {
    // Product bbox measurements (ACTUAL model edges)
    const pSize = new THREE.Vector3();
    productBBox.getSize(pSize);
    const center = new THREE.Vector3();
    productBBox.getCenter(center);

    // ── Auto-detect axis mapping ──
    // Find which dimension (w, h, d) best matches each scene axis (x, y, z)
    // by testing all 6 permutations and picking the most consistent ratio set.
    // Tiebreaker: when ratio errors are similar, prefer mappings where larger
    // dimensions map to larger axes (prevents w/d swap on cube-like models).
    const dims = [productDimensions.w, productDimensions.h, productDimensions.d];
    const sizes = [pSize.x, pSize.y, pSize.z];
    const perms = [
      [0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0],
    ];
    let bestPerm = perms[0];
    let bestScore = Infinity;
    for (const p of perms) {
      const r0 = sizes[0] > 0 ? dims[p[0]] / sizes[0] : 0;
      const r1 = sizes[1] > 0 ? dims[p[1]] / sizes[1] : 0;
      const r2 = sizes[2] > 0 ? dims[p[2]] / sizes[2] : 0;
      const avg = (r0 + r1 + r2) / 3;
      const err = Math.abs(r0 - avg) + Math.abs(r1 - avg) + Math.abs(r2 - avg);

      // Tiebreaker 1: penalize when dimension size ordering doesn't match axis ordering
      let orderPenalty = 0;
      for (let i = 0; i < 3; i++) {
        for (let j = i + 1; j < 3; j++) {
          const dimDiff = dims[p[i]] - dims[p[j]];
          const sizeDiff = sizes[i] - sizes[j];
          if (dimDiff * sizeDiff < 0) {
            orderPenalty += 0.001 * (avg || 1);
          }
        }
      }

      // Tiebreaker 2: when axes are equal (sizeDiff=0), prefer identity mapping
      // w→x, h→y, d→z — small enough to never override a genuine best match
      let identityPenalty = 0;
      for (let i = 0; i < 3; i++) {
        if (p[i] !== i) identityPenalty += 0.0001;
      }

      const score = err + orderPenalty + identityPenalty;
      if (score < bestScore) { bestScore = score; bestPerm = p; }
    }
    // When heightSplit is provided (keychain products), force identity mapping.
    // Keychains are always modeled with w→X, h→Y, d→Z convention.
    // The permutation algorithm can fail for models with 3D relief (like Kaaba)
    // where the Z-axis extent doesn't match the physical depth dimension.
    if (heightSplit) {
      bestPerm = [0, 1, 2];
    }
    // mm labels for each scene axis
    const xMM = dims[bestPerm[0]];
    const yMM = dims[bestPerm[1]];
    const zMM = dims[bestPerm[2]];

    // unitsPerMm from max axis — ground truth for iPhone scaling
    const realMaxDim = Math.max(productDimensions.w, productDimensions.h, productDimensions.d);
    const sceneMaxDim = Math.max(pSize.x, pSize.y, pSize.z);
    const unitsPerMm = sceneMaxDim / realMaxDim;

    // iPhone scale: match its real-world size in scene units
    const iphoneMaxScene = Math.max(iphoneBBoxSize.x, iphoneBBoxSize.y, iphoneBBoxSize.z);
    const iphoneMaxReal = Math.max(IPHONE_DIMENSIONS.w, IPHONE_DIMENSIONS.h, IPHONE_DIMENSIONS.d);
    let iphoneTargetSize = iphoneMaxReal * unitsPerMm;

    const iphoneScaleFactor = iphoneTargetSize / iphoneMaxScene;

    // iPhone positioning — to the right of the ACTUAL product edge
    const scaledIphoneWidth = iphoneBBoxSize.x * iphoneScaleFactor;
    const gap = pSize.x * 0.2;
    const iphonePos = [
      center.x + pSize.x / 2 + gap + scaledIphoneWidth / 2,
      center.y,
      center.z,
    ];

    // iPhone label offset — use the TALLEST axis, not hardcoded Y
    const iphoneTallSize = [iphoneBBoxSize.x, iphoneBBoxSize.y, iphoneBBoxSize.z][iphoneTallAxisIndex];
    const scaledIphoneTallDim = iphoneTallSize * iphoneScaleFactor;

    // Layout constants proportional to product height
    const tickLen = Math.max(0.04, pSize.y * 0.03);
    const lineOffset = Math.max(0.15, pSize.y * 0.08);
    const labelOffset = Math.max(0.25, pSize.y * 0.14);

    // Edges from ACTUAL bbox
    const left   = center.x - pSize.x / 2;
    const right  = center.x + pSize.x / 2;
    const bottom = center.y - pSize.y / 2;
    const top    = center.y + pSize.y / 2;
    const back   = center.z - pSize.z / 2;
    const front  = center.z + pSize.z / 2;

    // Height split info (for keychains: item vs ring)
    let heightSplitInfo = null;
    if (heightSplit && bestPerm[1] === 1) {
      // h maps to Y axis — compute split point
      const itemFraction = heightSplit.item / yMM;
      heightSplitInfo = {
        splitY: bottom + itemFraction * pSize.y,
        itemMM: heightSplit.item,
        ringMM: heightSplit.ring,
      };
    }

    return {
      center, iphoneScaleFactor, iphonePos, scaledIphoneTallDim,
      tickLen, lineOffset, labelOffset,
      left, right, bottom, top, back, front,
      xMM, yMM, zMM, heightSplitInfo,
    };
  }, [productBBox, productDimensions, iphoneBBoxSize, iphoneTallAxisIndex, heightSplit]);

  return (
    <group>
      {/* ═══ iPhone reference model ═══ */}
      <group position={iphonePos} scale={iphoneScaleFactor}>
        <primitive object={clone} />
      </group>

      {/* ═══ iPhone label ═══ */}
      <Html
        position={[
          iphonePos[0],
          iphonePos[1] - scaledIphoneTallDim / 2 - lineOffset,
          iphonePos[2],
        ]}
        center
        style={{ pointerEvents: "none" }}
      >
        <div style={{ color: "#555", fontSize: 11, whiteSpace: "nowrap", fontWeight: 500 }}>
          iPhone 17
        </div>
      </Html>

      {/* ═══ WIDTH dimension (horizontal line below product) ═══ */}
      <Line
        points={[
          [left, bottom - lineOffset, center.z],
          [right, bottom - lineOffset, center.z],
        ]}
        color="#C9A84C"
        lineWidth={1.5}
      />
      {/* Width ticks */}
      <Line
        points={[
          [left, bottom - lineOffset - tickLen, center.z],
          [left, bottom - lineOffset + tickLen, center.z],
        ]}
        color="#C9A84C"
        lineWidth={1.5}
      />
      <Line
        points={[
          [right, bottom - lineOffset - tickLen, center.z],
          [right, bottom - lineOffset + tickLen, center.z],
        ]}
        color="#C9A84C"
        lineWidth={1.5}
      />
      {/* Width label */}
      <Html position={[center.x, bottom - labelOffset, center.z]} center style={{ pointerEvents: "none" }}>
        <div style={{
          color: "#333", fontSize: 12, fontWeight: 600,
          background: "rgba(232,228,223,0.85)", padding: "1px 6px",
          borderRadius: 4, whiteSpace: "nowrap",
        }}>
          {xMM} mm
        </div>
      </Html>

      {/* ═══ HEIGHT dimension (vertical line to left of product) ═══ */}
      {heightSplitInfo ? (
        <>
          {/* Bottom segment — item */}
          <Line
            points={[
              [left - lineOffset, bottom, center.z],
              [left - lineOffset, heightSplitInfo.splitY, center.z],
            ]}
            color="#C9A84C"
            lineWidth={1.5}
          />
          {/* Top segment — ring (lighter color) */}
          <Line
            points={[
              [left - lineOffset, heightSplitInfo.splitY, center.z],
              [left - lineOffset, top, center.z],
            ]}
            color="#999"
            lineWidth={1}
          />
          {/* Bottom tick */}
          <Line
            points={[
              [left - lineOffset - tickLen, bottom, center.z],
              [left - lineOffset + tickLen, bottom, center.z],
            ]}
            color="#C9A84C"
            lineWidth={1.5}
          />
          {/* Split tick (divider between item and ring) */}
          <Line
            points={[
              [left - lineOffset - tickLen, heightSplitInfo.splitY, center.z],
              [left - lineOffset + tickLen, heightSplitInfo.splitY, center.z],
            ]}
            color="#C9A84C"
            lineWidth={1.5}
          />
          {/* Top tick */}
          <Line
            points={[
              [left - lineOffset - tickLen, top, center.z],
              [left - lineOffset + tickLen, top, center.z],
            ]}
            color="#999"
            lineWidth={1}
          />
          {/* Item label (bottom segment) */}
          <Html position={[left - labelOffset, (bottom + heightSplitInfo.splitY) / 2, center.z]} center style={{ pointerEvents: "none" }}>
            <div style={{
              color: "#333", fontSize: 12, fontWeight: 600,
              background: "rgba(232,228,223,0.85)", padding: "1px 6px",
              borderRadius: 4, whiteSpace: "nowrap", transform: "rotate(-90deg)",
            }}>
              {heightSplitInfo.itemMM} mm
            </div>
          </Html>
          {/* Ring label (top segment) */}
          <Html position={[left - labelOffset, (heightSplitInfo.splitY + top) / 2, center.z]} center style={{ pointerEvents: "none" }}>
            <div style={{
              color: "#777", fontSize: 10, fontWeight: 500,
              background: "rgba(232,228,223,0.85)", padding: "1px 5px",
              borderRadius: 4, whiteSpace: "nowrap", transform: "rotate(-90deg)",
            }}>
              {heightSplitInfo.ringMM} mm
            </div>
          </Html>
        </>
      ) : (
        <>
          <Line
            points={[
              [left - lineOffset, bottom, center.z],
              [left - lineOffset, top, center.z],
            ]}
            color="#C9A84C"
            lineWidth={1.5}
          />
          {/* Height ticks */}
          <Line
            points={[
              [left - lineOffset - tickLen, bottom, center.z],
              [left - lineOffset + tickLen, bottom, center.z],
            ]}
            color="#C9A84C"
            lineWidth={1.5}
          />
          <Line
            points={[
              [left - lineOffset - tickLen, top, center.z],
              [left - lineOffset + tickLen, top, center.z],
            ]}
            color="#C9A84C"
            lineWidth={1.5}
          />
          {/* Height label */}
          <Html position={[left - labelOffset, center.y, center.z]} center style={{ pointerEvents: "none" }}>
            <div style={{
              color: "#333", fontSize: 12, fontWeight: 600,
              background: "rgba(232,228,223,0.85)", padding: "1px 6px",
              borderRadius: 4, whiteSpace: "nowrap", transform: "rotate(-90deg)",
            }}>
              {yMM} mm
            </div>
          </Html>
        </>
      )}

      {/* ═══ DEPTH dimension (only if d > 10mm) ═══ */}
      {zMM > 10 && (
        <>
          <Line
            points={[
              [right + lineOffset * 0.3, center.y, back],
              [right + lineOffset * 0.3, center.y, front],
            ]}
            color="#C9A84C"
            lineWidth={1.5}
          />
          <Html
            position={[right + lineOffset, center.y, front + 0.05]}
            center
            style={{ pointerEvents: "none" }}
          >
            <div style={{
              color: "#333", fontSize: 11, fontWeight: 600,
              background: "rgba(232,228,223,0.85)", padding: "1px 6px",
              borderRadius: 4, whiteSpace: "nowrap",
            }}>
              {zMM} mm deep
            </div>
          </Html>
        </>
      )}
    </group>
  );
}

// Preload iPhone model to avoid Suspense flash on first dimensions toggle
useGLTF.preload(IPHONE_MODEL_PATH);
