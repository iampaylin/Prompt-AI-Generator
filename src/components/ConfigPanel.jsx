import React from "react";
import { NECKLINES, COLOR_GROUPS } from "../data/options";
import { usePrompt } from "../context/PromptContext";

const ConfigPanel = ({ itemType, currentSelection, onUpdate }) => {
  // We use the context to get "selections" for Scenery toggles
  const { selections, updateSelection } = usePrompt();

  // SCENERY MODE
  if (itemType === "scenery") {
    if (!currentSelection) return null;
    return (
      <div style={panelStyle}>
        <h3>Cenário</h3>
        <p
          style={{
            color: "var(--text-secondary)",
            marginBottom: "1rem",
            fontSize: "0.9rem",
          }}
        >
          {currentSelection.description || currentSelection.value}
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
            style={{
              width: "18px",
              height: "18px",
              accentColor: "var(--accent-color)",
            }}
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

  const { item, color, neckline } = currentSelection;

  return (
    <div style={panelStyle}>
      <h3
        style={{
          marginBottom: "1.5rem",
          fontSize: "1.1rem",
          color: "var(--text-primary)",
          borderBottom: "1px solid var(--border-color)",
          paddingBottom: "0.5rem",
        }}
      >
        Customização {item.label}
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {/* COLORS (Grouped) */}
        <div>
          <label style={labelStyle}>Color</label>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {COLOR_GROUPS.map((group) => (
              <div key={group.id}>
                <h4
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-secondary)",
                    marginBottom: "0.5rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {group.label}
                </h4>
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
                >
                  {group.colors.map((c) => (
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
                            : "1px solid rgba(0,0,0,0.1)",
                        boxShadow:
                          color?.id === c.id
                            ? "0 0 0 2px var(--accent-color)"
                            : "none",
                        transition: "all 0.2s",
                        position: "relative",
                      }}
                    >
                      {/* Checkmark for active color (optional visual cue) */}
                      {color?.id === c.id && (
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: c.id === "white" ? "#000" : "#fff",
                            fontSize: "10px",
                          }}
                        >
                          ✓
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FABRICS 
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
        </div> */}

        {/* NECKLINES - Only for Top/Dress/Fantasies */}
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
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
};

const labelStyle = {
  display: "block",
  marginBottom: "0.8rem",
  fontSize: "0.9rem",
  fontWeight: "600",
  color: "var(--text-primary)",
};

const getBtnStyle = (isActive) => ({
  padding: "0.5rem 1rem",
  fontSize: "0.85rem",
  borderRadius: "8px",
  border: "1px solid",
  borderColor: isActive ? "var(--accent-color)" : "var(--border-color)",
  background: isActive ? "var(--accent-color)" : "transparent",
  color: isActive ? "#fff" : "var(--text-secondary)",
  cursor: "pointer",
  transition: "all 0.2s",
  fontWeight: isActive ? "600" : "400",
});

export default ConfigPanel;
