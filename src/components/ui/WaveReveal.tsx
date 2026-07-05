"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";

const parent = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const child = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

export default function WaveReveal({ text, className, style }: { text: string; className?: string; style?: CSSProperties }) {
  return (
    <motion.span
      variants={parent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className={className}
      style={style}
    >
      {text.split(" ").map((w, i) => (
        <motion.span key={i} variants={child} style={{ display: "inline-block", whiteSpace: "pre" }}>
          {w + " "}
        </motion.span>
      ))}
    </motion.span>
  );
}
