import { Suspense } from "react";
import { Environment } from "@react-three/drei";

const IS_MOBILE = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

export default function Lighting({ lightColors }) {
  return (
    <>
      <ambientLight intensity={0.8} color={lightColors.ambient} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.4}
        color={lightColors.warm}
      />
      <directionalLight
        position={[-3, 4, -5]}
        intensity={0.4}
        color={lightColors.cool}
      />
      {!IS_MOBILE && (
        <directionalLight
          position={[0, -3, 3]}
          intensity={0.2}
          color={lightColors.accent}
        />
      )}
      {/* Note: "Program Info Log" warnings from Environment HDRI shader compilation are cosmetic and expected */}
      <Suspense fallback={null}>
        {!IS_MOBILE && <Environment preset="sunset" />}
      </Suspense>
    </>
  );
}
