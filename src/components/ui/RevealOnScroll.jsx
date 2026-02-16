import { motion } from "framer-motion";

export default function RevealOnScroll({
  children,
  delay = 0,
  direction = "up",
  threshold = 0.2,
  duration = 0.6,
  scale = false,
  style,
}) {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
      x: direction === "left" ? 30 : direction === "right" ? -30 : 0,
      scale: scale ? 0.95 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      variants={variants}
      style={style}
    >
      {children}
    </motion.div>
  );
}
