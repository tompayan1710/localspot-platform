import React from "react";
import styles from "./BottomSheet.module.css";

export default function BottomSheet({ open, onClose, children }) {
  return (
    <div
      className={`${styles.backdrop} ${open ? styles.open : ""}`}
      onClick={onClose}
    >
      <div
        className={`${styles.sheet} ${open ? styles.open : ""}`}
        onClick={e => e.stopPropagation()}
      >
        <button className={styles.close} onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
