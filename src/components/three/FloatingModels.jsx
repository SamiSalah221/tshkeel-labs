import { useRef, useMemo, Suspense, Component } from "react";
import * as THREE from "three";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { useScroll, useGLTF } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

// Error boundary to gracefully handle GLB load failures
class GLBErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback || null;
    return this.props.children;
  }
}

const GEOMETRY_TYPES = [
  "torusKnot",
  "box",
  "cone",
  "dodecahedron",
  "octahedron",
  "icosahedron",
  "torus",
  "sphere",
];

const COLORS = [
  "#C9A84C", // gold
  "#E2C66D", // light gold
  "#2574A8", // tile blue
  "#3BB8D0", // turquoise
  "#1A5580", // deep blue
  "#5CD4E8", // light turquoise
  "#28B5A4", // teal
  "#9B7E2E", // dark gold
];

function FloatingModel({ geometryType, color, position, scale, index }) {
  const meshRef = useRef();
  const initialPos = useMemo(() => [...position], [position]);

  const geometry = useMemo(() => {
    switch (geometryType) {
      case "torusKnot":
        return <torusKnotGeometry args={[0.4, 0.15, 64, 16]} />;
      case "box":
        return <boxGeometry args={[0.7, 0.7, 0.7]} />;
      case "cone":
        return <coneGeometry args={[0.4, 0.8, 16]} />;
      case "dodecahedron":
        return <dodecahedronGeometry args={[0.5, 0]} />;
      case "octahedron":
        return <octahedronGeometry args={[0.5, 0]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[0.5, 0]} />;
      case "torus":
        return <torusGeometry args={[0.4, 0.15, 16, 32]} />;
      default:
        return <sphereGeometry args={[0.4, 16, 16]} />;
    }
  }, [geometryType]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const pointer = state.pointer;

    // Per-shape parallax strength based on index (reduced on mobile)
    const isMobileDevice = window.innerWidth <= 768;
    const baseStrength = isMobileDevice ? 0.15 : 0.3;
    const strength = baseStrength + (index % 5) * (isMobileDevice ? 0.05 : 0.15);

    // Uniform slow rotation
    meshRef.current.rotation.x += 0.002;
    meshRef.current.rotation.y += 0.003;

    // Gentle bobbing + mouse parallax
    meshRef.current.position.x +=
      (initialPos[0] + pointer.x * strength - meshRef.current.position.x) * 0.03;
    meshRef.current.position.y +=
      (initialPos[1] + Math.sin(t * 0.3 + index * 1.7) * 0.1 + pointer.y * strength * 0.5 - meshRef.current.position.y) * 0.03;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometry}
      <meshStandardMaterial
        color={color}
        metalness={0.6}
        roughness={0.4}
        transparent
        opacity={0.25}
      />
    </mesh>
  );
}

function FloatingGLBModel({ modelPath, position, scale, index }) {
  const groupRef = useRef();
  const initialPos = useMemo(() => [...position], [position]);
  const { scene } = useGLTF(modelPath);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    // Make all materials semi-transparent to match the floating grid aesthetic
    clone.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
        child.material.transparent = true;
        child.material.opacity = 0.35;
      }
    });
    return clone;
  }, [scene]);

  // Auto-scale the model to fit within a ~1 unit bounding box
  const normalizedScale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    // Normalize so largest dimension is ~1 unit, then apply the grid scale
    return maxDim > 0 ? scale / maxDim : scale;
  }, [clonedScene, scale]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const pointer = state.pointer;

    const isMobileDevice = window.innerWidth <= 768;
    const baseStrength = isMobileDevice ? 0.15 : 0.3;
    const strength = baseStrength + (index % 5) * (isMobileDevice ? 0.05 : 0.15);

    groupRef.current.rotation.x += 0.002;
    groupRef.current.rotation.y += 0.003;

    groupRef.current.position.x +=
      (initialPos[0] + pointer.x * strength - groupRef.current.position.x) * 0.03;
    groupRef.current.position.y +=
      (initialPos[1] + Math.sin(t * 0.3 + index * 1.7) * 0.1 + pointer.y * strength * 0.5 - groupRef.current.position.y) * 0.03;
  });

  return (
    <group ref={groupRef} position={position} scale={normalizedScale}>
      <primitive object={clonedScene} />
    </group>
  );
}

function FloatingSTLModel({ modelPath, position, scale, index }) {
  const groupRef = useRef();
  const initialPos = useMemo(() => [...position], [position]);
  const geometry = useLoader(STLLoader, modelPath);

  useMemo(() => {
    geometry.center();
    geometry.computeVertexNormals();
  }, [geometry]);

  const normalizedScale = useMemo(() => {
    geometry.computeBoundingBox();
    const size = new THREE.Vector3();
    geometry.boundingBox.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    return maxDim > 0 ? scale / maxDim : scale;
  }, [geometry, scale]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const pointer = state.pointer;

    const isMobileDevice = window.innerWidth <= 768;
    const baseStrength = isMobileDevice ? 0.15 : 0.3;
    const strength = baseStrength + (index % 5) * (isMobileDevice ? 0.05 : 0.15);

    groupRef.current.rotation.x += 0.002;
    groupRef.current.rotation.y += 0.003;

    groupRef.current.position.x +=
      (initialPos[0] + pointer.x * strength - groupRef.current.position.x) * 0.03;
    groupRef.current.position.y +=
      (initialPos[1] + Math.sin(t * 0.3 + index * 1.7) * 0.1 + pointer.y * strength * 0.5 - groupRef.current.position.y) * 0.03;
  });

  return (
    <group ref={groupRef} position={position} scale={normalizedScale}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color="#C9A84C"
          metalness={0.1}
          roughness={0.8}
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}

// glbModels is passed per-theme from themeScene.glbModels in themes.js.
// Each section (islamic/nerdy/flags) has its own set of real 3D models.
export default function FloatingModels({ colors = COLORS, glbModels = [] }) {
  const { viewport } = useThree();
  const scroll = useScroll();

  const models = useMemo(() => {
    if (!scroll.pages || scroll.pages <= 0) return [];
    const items = [];

    // Total scroll height in Three.js units
    const totalHeight = scroll.pages * viewport.height;

    // Checkerboard grid settings — reduced density on mobile
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const cols = isMobile ? 3 : 5;
    const rowSpacing = isMobile ? 3.0 : 2.2;
    const colSpacing = viewport.width / (cols - 1); // edge-to-edge spacing
    const fixedScale = isMobile ? 0.2 : 0.25;
    const fixedZ = -3;

    // Exclude shapes from the center area where HTML content sits
    // (product cards, contact form, etc.). Keep shapes on outer edges only.
    const centerExclusion = viewport.width * 0.28;

    // Cover from above the viewport top to the full scroll bottom
    const startY = viewport.height * 0.5;
    const totalRange = startY + totalHeight;
    const rows = Math.ceil(totalRange / rowSpacing);

    let idx = 0;
    for (let row = 0; row < rows; row++) {
      const isOddRow = row % 2 === 1;
      const colsInRow = isOddRow ? cols - 1 : cols;

      for (let col = 0; col < colsInRow; col++) {
        // Even rows: edge-to-edge; odd rows: offset by half step
        const offset = isOddRow ? colSpacing * 0.5 : 0;
        const x = col * colSpacing - viewport.width / 2 + offset;
        const y = startY - row * rowSpacing;

        // Skip shapes that would overlap center content
        if (Math.abs(x) < centerExclusion) continue;

        // When the theme has real 3D models, use ONLY those (no primitives).
        // Cycle through the models array so all models appear in the grid.
        if (glbModels.length > 0) {
          const modelPath = glbModels[idx % glbModels.length];
          const isSTL = modelPath.toLowerCase().endsWith(".stl");
          items.push({
            isGLB: !isSTL,
            isSTL,
            modelPath,
            position: [x, y, fixedZ],
            scale: fixedScale * 2.5,
          });
        } else {
          const colorIndex = idx % colors.length;
          const geoIndex = idx % GEOMETRY_TYPES.length;
          items.push({
            isGLB: false,
            geometryType: GEOMETRY_TYPES[geoIndex],
            color: colors[colorIndex],
            position: [x, y, fixedZ],
            scale: fixedScale,
          });
        }

        idx++;
      }
    }

    return items;
  }, [scroll.pages, viewport.height, viewport.width, colors, glbModels]);

  return (
    <group>
      {models.map((model, i) =>
        model.isSTL ? (
          <GLBErrorBoundary
            key={`stl-${i}`}
            fallback={
              <FloatingModel
                index={i}
                geometryType={GEOMETRY_TYPES[i % GEOMETRY_TYPES.length]}
                color={colors[i % colors.length]}
                position={model.position}
                scale={model.scale * 0.4}
              />
            }
          >
            <Suspense fallback={null}>
              <FloatingSTLModel index={i} modelPath={model.modelPath} position={model.position} scale={model.scale} />
            </Suspense>
          </GLBErrorBoundary>
        ) : model.isGLB ? (
          <GLBErrorBoundary
            key={`glb-${i}`}
            fallback={
              <FloatingModel
                index={i}
                geometryType={GEOMETRY_TYPES[i % GEOMETRY_TYPES.length]}
                color={colors[i % colors.length]}
                position={model.position}
                scale={model.scale * 0.4}
              />
            }
          >
            <Suspense fallback={null}>
              <FloatingGLBModel index={i} modelPath={model.modelPath} position={model.position} scale={model.scale} />
            </Suspense>
          </GLBErrorBoundary>
        ) : (
          <FloatingModel key={i} index={i} {...model} />
        )
      )}
    </group>
  );
}
