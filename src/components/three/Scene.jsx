import { Sparkles } from "@react-three/drei";
import Lighting from "./Lighting";
import FloatingModels from "./FloatingModels";

export default function Scene({ themeScene }) {
  return (
    <>
      <Lighting lightColors={themeScene.lightColors} />
      <FloatingModels colors={themeScene.floatingModelColors} glbModels={themeScene.glbModels} />
      <Sparkles
        key={themeScene.sparklesColor}
        count={40}
        scale={[10, 6, 4]}
        size={2}
        speed={0.3}
        opacity={0.5}
        color={themeScene.sparklesColor}
        position={[0, 1, 0]}
      />
    </>
  );
}
