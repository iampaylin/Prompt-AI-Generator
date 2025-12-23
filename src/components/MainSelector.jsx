import React, { useState, useEffect } from "react";
import { usePrompt } from "../context/PromptContext";
import {
  CLOTHING_CATEGORIES,
  SCENERY_CATEGORIES,
  POSES_CATEGORIES,
  SCENERY,
  POSES,
} from "../data/options";
import VisualGrid from "./VisualGrid";
import ConfigPanel from "./ConfigPanel";
import {
  RotateCcw,
  Menu,
  Grid,
  Layers,
  Image as ImageIcon,
  User as UserIcon,
} from "lucide-react";

const CLOTHING_ITEMS = [
  { id: "top", label: "Parte de cima", icon: Layers },
  { id: "bottom", label: "Parte de baixo", icon: Layers },
  { id: "dress", label: "Vestidos", icon: UserIcon },
  { id: "fantasies", label: "Fantasias", icon: Menu },
  { id: "bikinis", label: "Biquinis", icon: UserIcon },
  { id: "shoes", label: "Calçados", icon: Grid },
];

const ENVIRONMENT_ITEMS = [
  { id: "scenery", label: "Ambiente", icon: ImageIcon },
  { id: "pose", label: "Poses", icon: UserIcon },
];

const MainSelector = () => {
  const { selections, updateSelection, clearAll } = usePrompt();

  const [activeCategory, setActiveCategory] = useState("top"); // Sidebar selection
  const [activeSubcat, setActiveSubcat] = useState(null); // Sub-tab selection (e.g. "Skirts")
  const [activeGroup, setActiveGroup] = useState(null); // Pill filter (e.g. "Mini")

  // Reset sub-navigation when changing main category
  useEffect(() => {
    // 1. Identify Data Source
    let categoryData = null;
    if (
      ["top", "bottom", "dress", "bikinis", "fantasies", "shoes"].includes(
        activeCategory
      )
    ) {
      const key =
        activeCategory === "dress"
          ? "dresses"
          : activeCategory === "bikinis"
          ? "bikinis"
          : activeCategory === "fantasies"
          ? "fantasies"
          : activeCategory + "s";
      categoryData = CLOTHING_CATEGORIES[key];
    }

    if (categoryData && categoryData.subcategories) {
      // Default to first subcategory
      const firstSub = categoryData.subcategories[0];
      setActiveSubcat(firstSub.id);

      // Default to first group if exists
      if (firstSub.groups) {
        setActiveGroup(firstSub.groups[0].id);
      } else {
        setActiveGroup(null);
      }
    } else {
      setActiveSubcat(null);
      setActiveGroup(null);
    }
  }, [activeCategory]);

  // When subcategory changes, reset group filter to first available
  useEffect(() => {
    if (!activeSubcat) return;

    // Find current category data again
    let categoryData = null;
    if (
      ["top", "bottom", "dress", "bikinis", "fantasies", "shoes"].includes(
        activeCategory
      )
    ) {
      const key =
        activeCategory === "dress"
          ? "dresses"
          : activeCategory === "bikinis"
          ? "bikinis"
          : activeCategory + "s";
      categoryData = CLOTHING_CATEGORIES[key];
    }

    if (categoryData) {
      const sub = categoryData.subcategories.find((s) => s.id === activeSubcat);
      if (sub && sub.groups) {
        setActiveGroup(sub.groups[0].id);
      } else {
        setActiveGroup(null);
      }
    }
  }, [activeSubcat, activeCategory]);

  // HANDLERS
  const handleItemSelect = (item, type) => {
    if (type === "dress") {
      updateSelection("dress", { item });
    } else if (
      ["top", "bottom", "bikinis", "fantasies", "shoes"].includes(type)
    ) {
      updateSelection(type, { item });
    } else if (type === "scenery") {
      updateSelection("scenery", item);
    } else if (type === "pose") {
      updateSelection("pose", item);
    }
  };

  const handleAttributeUpdate = (field, value) => {
    const currentItemState = selections[activeCategory] || {};
    updateSelection(activeCategory, { ...currentItemState, [field]: value });
  };

  // RENDERERS
  const renderSidebar = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        borderRight: "1px solid var(--border-color)",
        paddingRight: "1.5rem",
        minWidth: "160px",
      }}
    >
      {/* CLOTHING SECTION */}
      <h3
        style={{
          fontSize: "0.75rem",
          textTransform: "uppercase",
          color: "var(--text-secondary)",
          marginBottom: "0.5rem",
          marginTop: "0.5rem",
        }}
      >
        Closet
      </h3>
      {CLOTHING_ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => setActiveCategory(item.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
              padding: "0.8rem 1rem",
              borderRadius: "12px",
              border: "none",
              background:
                activeCategory === item.id
                  ? "var(--accent-color)"
                  : "transparent",
              color:
                activeCategory === item.id ? "#fff" : "var(--text-secondary)",
              cursor: "pointer",
              textAlign: "left",
              fontWeight: activeCategory === item.id ? "600" : "400",
              transition: "all 0.2s",
            }}
          >
            <Icon size={18} />
            {item.label}
          </button>
        );
      })}

      {/* ENVIRONMENT SECTION */}
      <h3
        style={{
          fontSize: "0.75rem",
          textTransform: "uppercase",
          color: "var(--text-secondary)",
          marginBottom: "0.5rem",
          marginTop: "1.5rem",
        }}
      >
        Estúdio
      </h3>
      {ENVIRONMENT_ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => setActiveCategory(item.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
              padding: "0.8rem 1rem",
              borderRadius: "12px",
              border: "none",
              background:
                activeCategory === item.id
                  ? "var(--accent-color)"
                  : "transparent",
              color:
                activeCategory === item.id ? "#fff" : "var(--text-secondary)",
              cursor: "pointer",
              textAlign: "left",
              fontWeight: activeCategory === item.id ? "600" : "400",
              transition: "all 0.2s",
            }}
          >
            <Icon size={18} />
            {item.label}
          </button>
        );
      })}

      <div
        style={{
          marginTop: "auto",
          paddingTop: "1rem",
          borderTop: "1px solid var(--border-color)",
        }}
      >
        <button
          onClick={clearAll}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(239, 68, 68, 0.1)",
            color: "#ef4444",
            padding: "0.8rem 1rem",
            borderRadius: "12px",
            border: "none",
            width: "100%",
            cursor: "pointer",
            fontSize: "0.9rem",
            fontWeight: "500",
          }}
        >
          <RotateCcw size={16} /> Clear All
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    // 1. SCENERY & POSES (categorized lists)
    if (activeCategory === "scenery") {
      return (
        <div>
          <h2 style={{ marginBottom: "1rem" }}>Scenery</h2>
          {/* Reuse Subtabs for Scenery Categories */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              marginBottom: "1.5rem",
              overflowX: "auto",
            }}
          >
            {SCENERY_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveSubcat(cat.id)}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  background:
                    activeSubcat === cat.id
                      ? "rgba(56, 189, 248, 0.2)"
                      : "var(--bg-secondary)",
                  color:
                    activeSubcat === cat.id
                      ? "var(--accent-color)"
                      : "var(--text-secondary)",
                  border: "1px solid",
                  borderColor:
                    activeSubcat === cat.id
                      ? "var(--accent-color)"
                      : "transparent",
                  cursor: "pointer",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <VisualGrid
            items={
              SCENERY_CATEGORIES.find((c) => c.id === activeSubcat)?.items ||
              SCENERY
            }
            selectedId={selections.scenery?.id}
            onSelect={(item) => handleItemSelect(item, "scenery")}
          />
          <ConfigPanel
            itemType="scenery"
            currentSelection={selections.scenery}
          />
        </div>
      );
    }
    if (activeCategory === "pose") {
      return (
        <div>
          <h2 style={{ marginBottom: "1rem" }}>Pose</h2>
          {/* Reuse Subtabs for Pose Categories */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              marginBottom: "1.5rem",
              overflowX: "auto",
            }}
          >
            {POSES_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveSubcat(cat.id)}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  background:
                    activeSubcat === cat.id
                      ? "rgba(56, 189, 248, 0.2)"
                      : "var(--bg-secondary)",
                  color:
                    activeSubcat === cat.id
                      ? "var(--accent-color)"
                      : "var(--text-secondary)",
                  border: "1px solid",
                  borderColor:
                    activeSubcat === cat.id
                      ? "var(--accent-color)"
                      : "transparent",
                  cursor: "pointer",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <VisualGrid
            items={
              POSES_CATEGORIES.find((c) => c.id === activeSubcat)?.items ||
              POSES
            }
            selectedId={selections.pose?.id}
            onSelect={(item) => handleItemSelect(item, "pose")}
          />
        </div>
      );
    }

    // 2. CLOTHING (Hierarchical)
    // Fix: Explicitly handle 'shoes' to avoid 'shoess'
    const dataKey =
      activeCategory === "dress"
        ? "dresses"
        : activeCategory === "bikinis"
        ? "bikinis"
        : activeCategory === "shoes"
        ? "shoes"
        : activeCategory === "fantasies"
        ? "fantasies"
        : activeCategory + "s";

    const categoryData = CLOTHING_CATEGORIES[dataKey];

    if (!categoryData) return <div>No data</div>;

    const activeSubData = categoryData.subcategories.find(
      (s) => s.id === activeSubcat
    );
    // Items to display: Filter by Group if activeGroup is set
    let displayItems = activeSubData?.items || [];
    if (activeSubData?.groups && activeGroup) {
      displayItems = displayItems.filter((i) => i.group === activeGroup);
    }

    return (
      <div style={{ flex: 1 }}>
        <h2 style={{ marginBottom: "1.5rem", color: "var(--text-primary)" }}>
          {categoryData.label} Builder
        </h2>

        {/* SUBCATEGORY TABS (Big Tabs) */}
        <div
          style={{
            display: "flex",
            gap: "2rem",
            borderBottom: "1px solid var(--border-color)",
            marginBottom: "1.5rem",
          }}
        >
          {categoryData.subcategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setActiveSubcat(sub.id)}
              style={{
                padding: "0.5rem 0",
                background: "transparent",
                color:
                  activeSubcat === sub.id
                    ? "var(--accent-color)"
                    : "var(--text-secondary)",
                border: "none",
                borderBottom:
                  activeSubcat === sub.id
                    ? "2px solid var(--accent-color)"
                    : "2px solid transparent",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "1rem",
                marginBottom: "-1px",
              }}
            >
              {sub.label}
            </button>
          ))}
        </div>

        {/* GROUP FILTERS (Pills) - Only if groups exist */}
        {activeSubData?.groups && (
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              marginBottom: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            {activeSubData.groups.map((g) => (
              <button
                key={g.id}
                onClick={() => setActiveGroup(g.id)}
                style={{
                  padding: "0.4rem 1rem",
                  borderRadius: "20px",
                  border: "1px solid",
                  borderColor:
                    activeGroup === g.id
                      ? "var(--accent-color)"
                      : "var(--border-color)",
                  background:
                    activeGroup === g.id
                      ? "var(--accent-color)"
                      : "transparent",
                  color:
                    activeGroup === g.id ? "#fff" : "var(--text-secondary)",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {g.label}
              </button>
            ))}
          </div>
        )}

        {/* GRID */}
        <VisualGrid
          items={displayItems}
          selectedId={selections[activeCategory]?.item?.id}
          selectedColor={selections[activeCategory]?.color}
          onSelect={(item) => handleItemSelect(item, activeCategory)}
        />

        {/* ATTRIBUTE PANEL */}
        <ConfigPanel
          itemType={activeCategory}
          currentSelection={selections[activeCategory]}
          onUpdate={handleAttributeUpdate}
        />
      </div>
    );
  };

  return (
    <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
      {renderSidebar()}
      <div style={{ flex: 1 }}>{renderContent()}</div>
    </div>
  );
};

export default MainSelector;
