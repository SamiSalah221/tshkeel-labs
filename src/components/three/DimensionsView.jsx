import { useGLTF, Html, Line } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import { IPHONE_DIMENSIONS, IPHONE_MODEL_PATH } from "../../config/products";

export default function DimensionsView({ productBBox, productDimensions }) {
  const { scene: iphoneScene } = useGLTF(IPHONE_MODEL_PATH);

  // Clone iPhone, center it at origin, apply dark material
  const { clone, iphoneBBoxSize } = useMemo(() => {
    const c = iphoneScene.clone(true);

    // Compute bounding box to find the center offset
    const box = new THREE.Box3().setFromObject(c);
    const boxCenter = new THREE.Vector3();
    box.getCenter(boxCenter);
    const boxSize = new THREE.Vector3();
    box.getSize(boxSize);

    // Shift all children so the model is centered at origin
    c.position.set(-boxCenter.x, -boxCenter.y, -boxCenter.z);

    // Wrap in a parent group so the centering offset is baked in
    c.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
        child.material.color.set("#222222");
        child.material.metalness = 0.8;
        child.material.roughness = 0.3;
      }
    });

    return { clone: c, iphoneBBoxSize: boxSize };
  }, [iphoneScene]);

  const { iphoneScale, iphonePosition, unitsPerMm, pSize, center } = useMemo(() => {
    const pSize = new THREE.Vector3();
    productBBox.getSize(pSize);
    const center = new THREE.Vector3();
    productBBox.getCenter(center);

    // Use the largest axis for the most accurate ratio
    const realMaxDim = Math.max(productDimensions.w, productDimensions.h, productDimensions.d);
    const sceneMaxDim = Math.max(pSize.x, pSize.y, pSize.z);
    const unitsPerMm = sceneMaxDim / realMaxDim;

    // iPhone scale: make the iPhone's largest axis match its real-world size in scene units
    const iphoneMaxScene = Math.max(iphoneBBoxSize.x, iphoneBBoxSize.y, iphoneBBoxSize.z);
    const iphoneMaxReal = Math.max(IPHONE_DIMENSIONS.w, IPHONE_DIMENSIONS.h, IPHONE_DIMENSIONS.d);
    const iphoneTargetSize = iphoneMaxReal * unitsPerMm;
    const iphoneScaleFactor = iphoneTargetSize / iphoneMaxScene;

    // Scaled iPhone dimensions in scene units
    const scaledIphoneWidth = iphoneBBoxSize.x * iphoneScaleFactor;

    // Position iPhone to the right of product with gap
    const gap = pSize.x * 0.25;
    const iphonePos = [
      productBBox.max.x + gap + scaledIphoneWidth / 2,
      center.y,
      center.z,
    ];

    return { iphoneScale: iphoneScaleFactor, iphonePosition: iphonePos, unitsPerMm, pSize, center };
  }, [productBBox, productDimensions, iphoneBBoxSize]);

  // Scaled iPhone height for label positioning
  const scaledIphoneHeight = iphoneBBoxSize.y * iphoneScale;

  const tickLen = Math.max(0.04, pSize.y * 0.03);
  const lineOffset = Math.max(0.15, pSize.y * 0.08);
  const labelOffset = Math.max(0.25, pSize.y * 0.14);

  return (
    <group>
      {/* iPhone reference model — centered via position offset in clone */}
      <group position={iphonePosition} scale={iphoneScale}>
        <primitive object={clone} />
      </group>

      {/* "iPhone 17" label */}
      <Html
        position={[
          iphonePosition[0],
          iphonePosition[1] - scaledIphoneHeight / 2 - lineOffset,
          iphonePosition[2],
        ]}
        center
        style={{ pointerEvents: "none" }}
      >
        <div style={{ color: "#555", fontSize: 11, whiteSpace: "nowrap", fontWeight: 500 }}>
          iPhone 17
        </div>
      </Html>

      {/* Width dimension line (bottom) */}
      <Line
        points={[
          [center.x - pSize.x / 2, productBBox.min.y - lineOffset, center.z],
          [center.x + pSize.x / 2, productBBox.min.y - lineOffset, center.z],
        ]}
        color="#C9A84C"
        lineWidth={1.5}
      />
      {/* Width tick marks */}
      <Line
        points={[
          [center.x - pSize.x / 2, productBBox.min.y - lineOffset - tickLen, center.z],
          [center.x - pSize.x / 2, productBBox.min.y - lineOffset + tickLen, center.z],
        ]}
        color="#C9A84C"
        lineWidth={1.5}
      />
      <Line
        points={[
          [center.x + pSize.x / 2, productBBox.min.y - lineOffset - tickLen, center.z],
          [center.x + pSize.x / 2, productBBox.min.y - lineOffset + tickLen, center.z],
        ]}
        color="#C9A84C"
        lineWidth={1.5}
      />
      {/* Width label */}
      <Html position={[center.x, productBBox.min.y - labelOffset, center.z]} center style={{ pointerEvents: "none" }}>
        <div style={{
          color: "#333", fontSize: 12, fontWeight: 600,
          background: "rgba(232,228,223,0.85)", padding: "1px 6px",
          borderRadius: 4, whiteSpace: "nowrap",
        }}>
          {productDimensions.w} mm
        </div>
      </Html>

      {/* Height dimension line (left) */}
      <Line
        points={[
          [productBBox.min.x - lineOffset, center.y - pSize.y / 2, center.z],
          [productBBox.min.x - lineOffset, center.y + pSize.y / 2, center.z],
        ]}
        color="#C9A84C"
        lineWidth={1.5}
      />
      {/* Height tick marks */}
      <Line
        points={[
          [productBBox.min.x - lineOffset - tickLen, center.y - pSize.y / 2, center.z],
          [productBBox.min.x - lineOffset + tickLen, center.y - pSize.y / 2, center.z],
        ]}
        color="#C9A84C"
        lineWidth={1.5}
      />
      <Line
        points={[
          [productBBox.min.x - lineOffset - tickLen, center.y + pSize.y / 2, center.z],
          [productBBox.min.x - lineOffset + tickLen, center.y + pSize.y / 2, center.z],
        ]}
        color="#C9A84C"
        lineWidth={1.5}
      />
      {/* Height label */}
      <Html position={[productBBox.min.x - labelOffset, center.y, center.z]} center style={{ pointerEvents: "none" }}>
        <div style={{
          color: "#333", fontSize: 12, fontWeight: 600,
          background: "rgba(232,228,223,0.85)", padding: "1px 6px",
          borderRadius: 4, whiteSpace: "nowrap", transform: "rotate(-90deg)",
        }}>
          {productDimensions.h} mm
        </div>
      </Html>

      {/* Depth label (only if depth > 10mm) */}
      {productDimensions.d > 10 && (
        <>
          <Line
            points={[
              [productBBox.max.x + lineOffset * 0.3, center.y, center.z - pSize.z / 2],
              [productBBox.max.x + lineOffset * 0.3, center.y, center.z + pSize.z / 2],
            ]}
            color="#C9A84C"
            lineWidth={1.5}
          />
          <Html
            position={[productBBox.max.x + lineOffset, center.y, center.z + pSize.z / 2 + 0.05]}
            center
            style={{ pointerEvents: "none" }}
          >
            <div style={{
              color: "#333", fontSize: 11, fontWeight: 600,
              background: "rgba(232,228,223,0.85)", padding: "1px 6px",
              borderRadius: 4, whiteSpace: "nowrap",
            }}>
              {productDimensions.d} mm deep
            </div>
          </Html>
        </>
      )}
    </group>
  );
}
