// src/components/TestSlide.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TestSlide() {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ padding: "40px" }}>
      <button onClick={() => setVisible(!visible)}>
        {visible ? "Masquer" : "Afficher"} le panneau
      </button>

      <AnimatePresence>
        {visible && (
          <motion.div
            key="panel"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              backgroundColor: "#fff",
              width: "300px",
              height: "200px",
              marginTop: "20px",
              boxShadow: "0 2px 20px rgba(0,0,0,0.1)",
              borderRadius: "15px",
              padding: "20px",
            }}
          >
            Ceci est un panneau animé ✨
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
