import React from "react";
import { Camera, Sparkles } from "lucide-react";

const Header = () => {
  return (
    <header
      style={{
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        justifyItems: "center",
        padding: "1.5rem 2rem",
        background: "var(--bg-secondary)",
        borderBottom: "1px solid var(--border-color)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        {/*<div> Logo </div> */}
        <div>
          <h1
            style={{
              fontSize: "1.35rem",
              color: "var(--text-primary)",
              textAlign: "center",
            }}
          >
            Closet AI [BETA]
          </h1>
          <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
            Your wardrobe, reimagined by AI
          </span>
        </div>
      </div>
      {/* <div style={{ marginLeft: "auto", display: "flex", gap: "1rem" }}>
        <button
          style={{
            background: "none",
            border: "1px solid var(--border-color)",
            color: "var(--text-secondary)",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Sparkles size={16} /> Coming soon...
        </button> 
      </div> */}
    </header>
  );
};

export default Header;
