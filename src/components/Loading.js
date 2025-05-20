// src/components/Loading.js
import React from "react";

function Loading() {
  return (
    <div style={styles.overlay}>
      <div style={styles.spinner}></div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0,
    width: "100%", height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9998,
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "6px solid #ccc",
    borderTop: "6px solid #2ecc71",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

export default Loading;
