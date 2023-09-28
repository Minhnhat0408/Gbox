"use client";
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
type Animate = {
  opacity: number;
  y?: number;
  x?: number;
  scale?: number;
};
function Reveal({
  children,
  hiddenY,
  hiddenX,
  duration = 0.8,
  scale,
  delay,
  initial = "hidden",
  preanimation = false,
  className,
}: {
  children: React.ReactNode;
  hiddenY?: number;
  hiddenX?: number;
  duration?: number;
  scale?: number;
  delay?: number;
  initial?: string;
  preanimation?: boolean;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const slideControls = useAnimation();
  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    }
  }, [isInView, mainControls, slideControls]);

  function getVariant() {
    let variants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    };

    if (hiddenY) {
      variants.hidden = { ...variants.hidden, y: hiddenY } as Animate;
      variants.visible = { ...variants.visible, y: 0 } as Animate;
    }
    if (hiddenX) {
      variants.hidden = { ...variants.hidden, x: hiddenX } as Animate;
      variants.visible = { ...variants.visible, x: 0 } as Animate;
    }
    if (scale) {
      variants.hidden = { ...variants.hidden, scale: scale } as Animate;
      variants.visible = { ...variants.visible, scale: 1 } as Animate;
    }
    return variants;
  }
  function getTransition() {
    let transition = {};
    if (duration) {
      transition = { ...transition, duration: duration };
    }
    if (delay) {
      transition = { ...transition, delay: delay };
    }

    return transition;
  }
  return (
    <>
      <motion.div
        variants={getVariant()}
        initial={initial}
        animate={mainControls}
        exit={"hidden"}
        ref={ref}
        className={className || "relative w-fit"}
        transition={getTransition()}
      >
        {children}
      </motion.div>
      {preanimation && (
        <motion.div
          variants={{
            hidden: { left: 0 },
            visible: { left: "100%" },
          }}
          initial={initial}
          animate={slideControls}
          transition={{ duration: 0.5, ease: "easeIn" }}
          style={{
            position: "absolute",
            top: 4,
            bottom: 4,
            left: 0,
            right: 0,
            background: "#8a2be2",
            zIndex: 20,
          }}
        />
      )}
    </>
  );
}

export default Reveal;
