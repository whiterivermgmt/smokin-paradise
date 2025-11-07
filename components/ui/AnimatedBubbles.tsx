"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

const AnimatedBubbles = () => {
  const [bubbles, setBubbles] = useState<{ size: number; top: number; left: number }[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 10 }).map(() => ({
      size: Math.random() * 60 + 20, // random size 20-80px
      top: Math.random() * 80,       // random top %
      left: Math.random() * 80,      // random left %
    }));
    setBubbles(generated);
  }, []);

  return (
    <>
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          className="absolute bg-green-200 rounded-full opacity-30"
          style={{ width: b.size, height: b.size, top: `${b.top}%`, left: `${b.left}%` }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4 + Math.random() * 2, repeat: Infinity }}
        />
      ))}
    </>
  );
};

export default AnimatedBubbles;
