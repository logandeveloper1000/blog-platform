// src/components/Modal.js
import React, { useEffect } from "react";

function Modal({ type, title, message, onClose, onConfirm, confirmText }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOutsideClick} style={styles.overlay}>
      <div
        style={{
          ...styles.modal,
          borderLeft: `5px solid ${type === "error" ? "#e74c3c" : "#2ecc71"}`,
        }}
      >
        <h2 style={{ color: type === "error" ? "#e74c3c" : "#2ecc71" }}>
          {title}
        </h2>
        <p>{message}</p>
        <div style={styles.buttonGroup}>
          {onConfirm ? (
            <>
              <button onClick={onConfirm} style={styles.button}>
                {confirmText || "Yes"}
              </button>
              <button onClick={onClose} style={styles.button}>
                Cancel
              </button>
            </>
          ) : (
            <button onClick={onClose} style={styles.button}>
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0,
    width: "100%", height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "400px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.25)",
  },
  buttonGroup: {
    marginTop: "1rem",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  button: {
    padding: "0.5rem 1rem",
    background: "#333",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Modal;
