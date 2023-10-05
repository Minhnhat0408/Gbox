import { motion } from "framer-motion";

export default function SlideLeft({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ x: 700, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -700, opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}
