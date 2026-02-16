import { useGLTF } from "@react-three/drei";
import { useLoader, useFrame } from "@react-three/fiber";
import { useMemo, useEffect, useRef } from "react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

function PlaceholderGeometry({ type, color, colorOverride }) {
  const matProps = { color: colorOverride || color || "#C9A84C", metalness: 0.8, roughness: 0.2 };

  switch (type) {
    // ── Islamic product-specific shapes ──
    case "crescentMoon":
      return (
        <group>
          <mesh>
            <sphereGeometry args={[0.9, 32, 32]} />
            <meshStandardMaterial {...matProps} />
          </mesh>
          <mesh position={[0.45, 0.25, 0]}>
            <sphereGeometry args={[0.7, 32, 32]} />
            <meshStandardMaterial color="#0E2640" metalness={0.1} roughness={0.9} />
          </mesh>
        </group>
      );

    case "quranStand":
      return (
        <group>
          <mesh position={[-0.4, 0.15, 0]} rotation={[0, 0, 0.3]}>
            <boxGeometry args={[0.08, 1.4, 0.9]} />
            <meshStandardMaterial {...matProps} />
          </mesh>
          <mesh position={[0.4, 0.15, 0]} rotation={[0, 0, -0.3]}>
            <boxGeometry args={[0.08, 1.4, 0.9]} />
            <meshStandardMaterial {...matProps} />
          </mesh>
          <mesh position={[0, -0.5, 0]}>
            <boxGeometry args={[1.0, 0.08, 0.9]} />
            <meshStandardMaterial {...matProps} />
          </mesh>
        </group>
      );

    case "mosque":
      return (
        <group>
          <mesh position={[0, 0.5, 0]}>
            <sphereGeometry args={[0.6, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial {...matProps} />
          </mesh>
          <mesh position={[0, -0.1, 0]}>
            <cylinderGeometry args={[0.6, 0.65, 1.0, 32]} />
            <meshStandardMaterial {...matProps} />
          </mesh>
          <mesh position={[0.8, 0.3, 0]}>
            <cylinderGeometry args={[0.08, 0.1, 1.4, 16]} />
            <meshStandardMaterial {...matProps} />
          </mesh>
          <mesh position={[0.8, 1.05, 0]}>
            <coneGeometry args={[0.12, 0.2, 16]} />
            <meshStandardMaterial {...matProps} />
          </mesh>
        </group>
      );

    case "calligraphyPanel":
      return (
        <group>
          <mesh>
            <boxGeometry args={[1.6, 1.0, 0.1]} />
            <meshStandardMaterial {...matProps} />
          </mesh>
          <mesh position={[0, 0, 0.06]}>
            <boxGeometry args={[1.3, 0.7, 0.02]} />
            <meshStandardMaterial color={matProps.color} metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      );

    case "beadStand":
      return (
        <group>
          <mesh position={[0, 0.4, 0]} rotation={[Math.PI / 6, 0, 0]}>
            <torusGeometry args={[0.5, 0.12, 16, 32]} />
            <meshStandardMaterial {...matProps} />
          </mesh>
          <mesh position={[0, -0.3, 0]}>
            <cylinderGeometry args={[0.15, 0.3, 0.6, 16]} />
            <meshStandardMaterial {...matProps} />
          </mesh>
          <mesh position={[0, -0.65, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.08, 32]} />
            <meshStandardMaterial {...matProps} />
          </mesh>
        </group>
      );

    case "frame":
      return (
        <group>
          <mesh position={[0, 0.65, 0]}>
            <boxGeometry args={[1.4, 0.12, 0.12]} />
            <meshStandardMaterial {...matProps} />
          </mesh>
          <mesh position={[0, -0.65, 0]}>
            <boxGeometry args={[1.4, 0.12, 0.12]} />
            <meshStandardMaterial {...matProps} />
          </mesh>
          <mesh position={[-0.64, 0, 0]}>
            <boxGeometry args={[0.12, 1.18, 0.12]} />
            <meshStandardMaterial {...matProps} />
          </mesh>
          <mesh position={[0.64, 0, 0]}>
            <boxGeometry args={[0.12, 1.18, 0.12]} />
            <meshStandardMaterial {...matProps} />
          </mesh>
        </group>
      );

    case "phoneStand":
      return (
        <group>
          <mesh position={[0, 0.3, 0]} rotation={[0, 0, Math.PI / 6]}>
            <torusGeometry args={[0.5, 0.08, 16, 32, Math.PI]} />
            <meshStandardMaterial {...matProps} />
          </mesh>
          <mesh position={[0, -0.4, 0]}>
            <boxGeometry args={[0.8, 0.1, 0.6]} />
            <meshStandardMaterial {...matProps} />
          </mesh>
          <mesh position={[0, 0, -0.2]} rotation={[0.2, 0, 0]}>
            <boxGeometry args={[0.06, 1.0, 0.06]} />
            <meshStandardMaterial {...matProps} />
          </mesh>
        </group>
      );

    // ── Generic shapes (nerdy & flags products) ──
    case "torusKnot":
      return (
        <mesh>
          <torusKnotGeometry args={[0.8, 0.3, 100, 24]} />
          <meshStandardMaterial {...matProps} />
        </mesh>
      );
    case "box":
      return (
        <mesh>
          <boxGeometry args={[1.4, 1.4, 1.4]} />
          <meshStandardMaterial {...matProps} />
        </mesh>
      );
    case "cone":
      return (
        <mesh>
          <coneGeometry args={[0.8, 1.8, 32]} />
          <meshStandardMaterial {...matProps} />
        </mesh>
      );
    case "dodecahedron":
      return (
        <mesh>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial {...matProps} />
        </mesh>
      );
    case "octahedron":
      return (
        <mesh>
          <octahedronGeometry args={[1.1, 0]} />
          <meshStandardMaterial {...matProps} />
        </mesh>
      );
    case "icosahedron":
      return (
        <mesh>
          <icosahedronGeometry args={[1.1, 0]} />
          <meshStandardMaterial {...matProps} />
        </mesh>
      );
    case "torus":
      return (
        <mesh>
          <torusGeometry args={[0.9, 0.35, 24, 48]} />
          <meshStandardMaterial {...matProps} />
        </mesh>
      );
    case "sphere":
      return (
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial {...matProps} />
        </mesh>
      );
    default:
      return (
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial {...matProps} />
        </mesh>
      );
  }
}

function GLBModel({ path, scale, zoneColors, onZonesDetected, zoneConfig, activeZone }) {
  const { scene } = useGLTF(path);
  const whiteColor = useRef(new THREE.Color(1, 1, 1));

  // Detect color zones from the original scene, using zoneConfig when available
  const zones = useMemo(() => {
    if (zoneConfig === "none") return [];

    // Collect all mesh colors
    const meshColors = [];
    scene.traverse((child) => {
      if (child.isMesh && child.material && child.material.color) {
        const c = child.material.color;
        meshColors.push({
          hex: "#" + c.getHexString(),
          r: Math.round(c.r * 255),
          g: Math.round(c.g * 255),
          b: Math.round(c.b * 255),
        });
      }
    });

    if (zoneConfig === "single") {
      // All meshes become one zone
      const allHexes = [...new Set(meshColors.map((m) => m.hex))];
      if (allHexes.length === 0) return [];
      return [{
        hex: allHexes[0],
        name: "Color",
        count: meshColors.length,
        memberHexes: allHexes,
        editable: true,
      }];
    }

    if (Array.isArray(zoneConfig)) {
      // Custom zones — assign each mesh to nearest configured zone
      const configuredZones = zoneConfig.map((z) => ({
        name: z.name,
        editable: z.editable,
        r: z.rgb[0], g: z.rgb[1], b: z.rgb[2],
        hex: "#" + z.rgb.map((v) => v.toString(16).padStart(2, "0")).join(""),
        count: 0,
        memberHexes: [],
      }));

      for (const mc of meshColors) {
        let closest = null;
        let closestDist = Infinity;
        for (const zone of configuredZones) {
          const dist = Math.sqrt(
            (mc.r - zone.r) ** 2 + (mc.g - zone.g) ** 2 + (mc.b - zone.b) ** 2
          );
          if (dist < closestDist) {
            closestDist = dist;
            closest = zone;
          }
        }
        if (closest) {
          closest.count++;
          if (!closest.memberHexes.includes(mc.hex)) {
            closest.memberHexes.push(mc.hex);
          }
        }
      }

      // Only return editable zones to the UI
      return configuredZones.filter((z) => z.editable && z.count > 0);
    }

    // Fallback: auto-detect with merging (existing behavior for products without zoneConfig)
    const zoneList = [];
    const threshold = 40;
    for (const mc of meshColors) {
      let closest = null;
      let closestDist = Infinity;
      for (const zone of zoneList) {
        const dist = Math.sqrt(
          (mc.r - zone.r) ** 2 + (mc.g - zone.g) ** 2 + (mc.b - zone.b) ** 2
        );
        if (dist < closestDist) { closestDist = dist; closest = zone; }
      }
      if (closest && closestDist < threshold) {
        closest.count++;
        if (!closest.memberHexes.includes(mc.hex)) closest.memberHexes.push(mc.hex);
      } else {
        zoneList.push({ hex: mc.hex, r: mc.r, g: mc.g, b: mc.b, count: 1, memberHexes: [mc.hex] });
      }
    }
    return zoneList;
  }, [scene, zoneConfig]);

  // Report zones to parent (ProductViewerModal)
  useEffect(() => {
    if (onZonesDetected) onZonesDetected(zones);
  }, [zones, onZonesDetected]);

  // Build lookup: original mesh hex → zone hex key
  const origHexToZoneHex = useMemo(() => {
    const map = {};
    for (const zone of zones) {
      for (const mh of zone.memberHexes) {
        map[mh] = zone.hex;
      }
    }
    return map;
  }, [zones]);

  // Per-mesh data: zone membership + base color (for highlight animation)
  const meshDataRef = useRef({});

  // Clone scene, clone ALL materials, apply overrides, and record base colors
  const coloredScene = useMemo(() => {
    const clone = scene.clone(true);
    const meshData = {};

    // Build override lookup
    const hexToOverride = {};
    if (zoneColors && Object.keys(zoneColors).length > 0) {
      for (const zone of zones) {
        if (zoneColors[zone.hex]) {
          for (const memberHex of zone.memberHexes) {
            hexToOverride[memberHex] = zoneColors[zone.hex];
          }
        }
      }
    }

    // Clone every mesh material, apply overrides, and record base color
    clone.traverse((child) => {
      if (!child.isMesh || !child.material || !child.material.color) return;
      const originalHex = "#" + child.material.color.getHexString();
      // Always clone material so each mesh has its own instance
      child.material = child.material.clone();
      // Apply color override if needed
      if (hexToOverride[originalHex]) {
        child.material.color = new THREE.Color(hexToOverride[originalHex]);
      }
      // Record zone membership and base color (after override)
      const zoneHex = origHexToZoneHex[originalHex];
      if (zoneHex) {
        meshData[child.uuid] = {
          zoneHex,
          baseColor: child.material.color.clone(),
        };
      }
    });

    meshDataRef.current = meshData;
    return clone;
  }, [scene, zoneColors, zones, origHexToZoneHex]);

  // Animate: brighten active zone meshes toward white in a slow 1s pulse
  useFrame(({ clock }) => {
    if (!coloredScene || !activeZone) return;
    // Sine wave 0→1→0 over 1 second
    const t = (Math.sin(clock.elapsedTime * Math.PI * 2) + 1) / 2;
    const brightenFactor = t * 0.35; // up to 35% toward white
    const data = meshDataRef.current;

    coloredScene.traverse((child) => {
      if (!child.isMesh || !child.material) return;
      const info = data[child.uuid];
      if (!info) return;
      if (info.zoneHex === activeZone) {
        child.material.color.copy(info.baseColor).lerp(whiteColor.current, brightenFactor);
      } else {
        // Ensure non-active meshes stay at base color
        child.material.color.copy(info.baseColor);
      }
    });
  });

  return <primitive object={coloredScene} scale={scale} />;
}

function STLModel({ path, scale, color, colorOverride }) {
  const geometry = useLoader(STLLoader, path);

  useMemo(() => {
    geometry.center();
    geometry.computeVertexNormals();
  }, [geometry]);

  // Auto-scale so the model fits within ~2 units (like GLB normalization)
  const normalizedScale = useMemo(() => {
    geometry.computeBoundingBox();
    const size = new THREE.Vector3();
    geometry.boundingBox.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = 2;
    return maxDim > 0 ? (targetSize / maxDim) * scale : scale;
  }, [geometry, scale]);

  return (
    <mesh geometry={geometry} scale={normalizedScale}>
      <meshStandardMaterial
        color={colorOverride || color || "#C9A84C"}
        metalness={0.1}
        roughness={0.8}
      />
    </mesh>
  );
}

export default function ModelLoader({ product, colorOverride, zoneColors, onZonesDetected, activeZone }) {
  if (!product.modelPath) {
    return (
      <PlaceholderGeometry
        type={product.placeholderGeometry}
        color={product.color}
        colorOverride={colorOverride}
      />
    );
  }

  switch (product.modelType) {
    case "glb":
    case "gltf":
      return <GLBModel path={product.modelPath} scale={product.scale} zoneColors={zoneColors} onZonesDetected={onZonesDetected} zoneConfig={product.zoneConfig} activeZone={activeZone} />;
    case "stl":
      return <STLModel path={product.modelPath} scale={product.scale} color={product.color} colorOverride={colorOverride} />;
    default:
      return (
        <PlaceholderGeometry
          type={product.placeholderGeometry || "box"}
          color={product.color}
          colorOverride={colorOverride}
        />
      );
  }
}
