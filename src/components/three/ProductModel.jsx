import { useRef, useLayoutEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import gsap from "gsap";
import ModelLoader from "./ModelLoader";

export default function ProductModel({
  product,
  index,
  productStartFraction,
  productLengthFraction,
  yPosition,
}) {
  const ref = useRef();
  const scroll = useScroll();
  const tl = useRef();
  const { viewport } = useThree();

  useLayoutEffect(() => {
    tl.current = gsap.timeline({ paused: true });
    tl.current.to(
      {},
      {
        duration: 1,
      }
    );
  }, []);

  useFrame(() => {
    if (!ref.current) return;

    const visible = scroll.visible(
      productStartFraction,
      productLengthFraction
    );
    ref.current.visible = visible;

    if (!visible) return;

    const progress = scroll.range(
      productStartFraction,
      productLengthFraction
    );

    // Alternate CW/CCW based on index
    const direction = index % 2 === 0 ? 1 : -1;
    ref.current.rotation.y = progress * Math.PI * 2 * direction;
    ref.current.rotation.x = Math.sin(progress * Math.PI) * 0.2;
  });

  return (
    <group
      ref={ref}
      position={[-viewport.width * 0.15, yPosition, 0]}
      scale={product.scale}
    >
      <ModelLoader product={product} />
    </group>
  );
}
