// src/components/Spinner/Spinner.jsx
import React from "react";
import "./Spinner.css";

export default function Spinner({ centerPage, replaceText }) {
  return (
    // <div className={centerPage ? "centerPage" : ""} style={{minHeight: "100%"}}>
    <div className={`${centerPage ? "centerPage" : ""} ${replaceText ? "replaceText" : ""}`}>
      <div className="spinner"></div>
    </div>
  );
}
