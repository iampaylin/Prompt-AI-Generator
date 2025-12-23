import React from "react";
import { FABRICS, NECKLINES, COLORS } from "../data/options";
import { usePrompt } from "../context/PromptContext";
import ColorSelector from "./ColorSelector";

const ConfigPanel = ({ itemType, currentSelection, onUpdate }) => {
  // We use the context to get "selections" for Scenery toggles
  const { selections, updateSelection } = usePrompt();

  // SCENERY MODE
  if (itemType === "scenery") {
    if (!currentSelection) return null;
    return (
      <div style={panelStyle}>
        <h3>Customize Scenery</h3>
        <p style={{ color: "var(--text-secondary)", marginBottom: "1rem" }}>
          {currentSelection.description}
        </p>

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={selections.bokeh || false}
            onChange={(e) => updateSelection("bokeh", e.target.checked)}
            style={{ width: "18px", height: "18px" }}
          />
          <span style={{ color: "var(--text-primary)" }}>
            Bokeh (Desfocar fundo)
          </span>
        </label>
      </div>
    );
  }

  // CLOTHING MODE
  if (!currentSelection || !currentSelection.item) return null;

  const { item, fabric, color, neckline } = currentSelection;

  return (
    <div style={panelStyle}>
      <h3
        style={{
          marginBottom: "1rem",
          fontSize: "1rem",
          color: "var(--text-primary)",
        }}
      >
        Customize {item.label}
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* COLORS */}
        <div>
          <label style={labelStyle}>Color</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {COLORS.map((c) => (
              <div
                key={c.id}
                onClick={() => onUpdate("color", c)}
                title={c.label}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: c.hex,
                  cursor: "pointer",
                  border:
                    color?.id === c.id
                      ? "2px solid #fff"
                      : "2px solid transparent",
                  boxShadow:
                    color?.id === c.id
                      ? "0 0 0 2px var(--accent-color)"
                      : "none",
                  transition: "all 0.2s",
                }}
              />
            ))}
          </div>
        </div>

        {/* FABRICS */}
        <div>
          <label style={labelStyle}>Fabric</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {FABRICS.map((f) => (
              <button
                key={f.id}
                onClick={() => onUpdate("fabric", f)}
                style={getBtnStyle(fabric?.id === f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* NECKLINES - Only for Top/Dress */}
        {(itemType === "top" ||
          itemType === "dress" ||
          itemType === "fantasies") && (
          <div>
            <label style={labelStyle}>Neckline</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {NECKLINES.map((n) => (
                <button
                  key={n.id}
                  onClick={() => onUpdate("neckline", n)}
                  style={getBtnStyle(neckline?.id === n.id)}
                >
                  {n.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Styles
const panelStyle = {
  marginTop: "1.5rem",
  padding: "1.5rem",
  background: "var(--bg-secondary)",
  borderRadius: "16px",
  border: "1px solid var(--border-color)",
};

const labelStyle = {
  display: "block",
  marginBottom: "0.5rem",
  fontSize: "0.85rem",
  color: "var(--text-secondary)",
};

const getBtnStyle = (isActive) => ({
  padding: "0.4rem 0.8rem",
  fontSize: "0.8rem",
  borderRadius: "6px",
  border: "1px solid",
  borderColor: isActive ? "var(--accent-color)" : "var(--border-color)",
  background: isActive ? "rgba(56, 189, 248, 0.1)" : "transparent",
  color: isActive ? "var(--accent-color)" : "var(--text-secondary)",
  cursor: "pointer",
  transition: "all 0.2s",
});

export default ConfigPanel;
