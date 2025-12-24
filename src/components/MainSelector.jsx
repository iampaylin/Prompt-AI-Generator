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
  Layers,
  Image as ImageIcon,
  User as UserIcon,
  Grid,
  Shirt,
  Heart,
  Sparkles,
} from "lucide-react";

const CLOTHING_ITEMS = [
  { id: "top", label: "Parte de cima", icon: Shirt },
  { id: "bottom", label: "Parte de baixo", icon: Layers },
  { id: "dress", label: "Vestidos", icon: Heart },
  { id: "fantasies", label: "Fantasies", icon: Sparkles },
  { id: "bikinis", label: "Bikinis", icon: Sparkles }, // Updated icon
  { id: "shoes", label: "Shoes", icon: Grid },
];

const ENVIRONMENT_ITEMS = [
  { id: "scenery", label: "Scenery", icon: ImageIcon },
  { id: "pose", label: "Pose", icon: UserIcon },
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
      ["top", "bottom", "dress", "fantasies", "bikinis", "shoes"].includes(
        activeCategory
      )
    ) {
      const key =
        activeCategory === "dress"
          ? "dresses"
          : activeCategory === "fantasies"
          ? "fantasies"
          : activeCategory === "bikinis"
          ? "bikinis"
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
      ["top", "bottom", "dress", "fantasies", "bikinis", "shoes"].includes(
        activeCategory
      )
    ) {
      const key =
        activeCategory === "dress"
          ? "dresses"
          : activeCategory === "fantasies"
          ? "fantasies"
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
      ["top", "bottom", "fantasies", "bikinis", "shoes"].includes(type)
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
        minWidth: "200px",
        flexShrink: 0,
      }}
    >
      {/* CLOTHING SECTION */}
      <h3 style={sectionHeaderStyle}>Wardrobe</h3>
      {CLOTHING_ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => setActiveCategory(item.id)}
            style={navBtnStyle(activeCategory === item.id)}
          >
            <Icon size={18} strokeWidth={2} />
            {item.label}
          </button>
        );
      })}

      {/* ENVIRONMENT SECTION */}
      <h3 style={{ ...sectionHeaderStyle, marginTop: "1.5rem" }}>Studio</h3>
      {ENVIRONMENT_ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => setActiveCategory(item.id)}
            style={navBtnStyle(activeCategory === item.id)}
          >
            <Icon size={18} strokeWidth={2} />
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
            fontWeight: "600",
          }}
        >
          <RotateCcw size={16} /> Clear All
        </button>
      </div>
    </div>
  );

  // MIDDLE CONTENT: GRID & CONFIG
  const renderContent = () => {
    // 1. SCENERY & POSES (categorized lists)
    if (activeCategory === "scenery") {
      return (
        <div style={contentContainerStyle}>
          <h2 style={pageTitleStyle}>Scenery</h2>
          {/* Reuse Subtabs for Scenery Categories */}
          <div style={subTabContainerStyle}>
            {SCENERY_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveSubcat(cat.id)}
                style={subTabStyle(activeSubcat === cat.id)}
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
        <div style={contentContainerStyle}>
          <h2 style={pageTitleStyle}>Pose</h2>
          {/* Reuse Subtabs for Pose Categories */}
          <div style={subTabContainerStyle}>
            {POSES_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveSubcat(cat.id)}
                style={subTabStyle(activeSubcat === cat.id)}
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
        : activeCategory === "fantasies"
        ? "fantasies"
        : activeCategory === "shoes"
        ? "shoes"
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
      <div style={contentContainerStyle}>
        <h2 style={pageTitleStyle}>{categoryData.label}</h2>

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
                fontWeight: activeSubcat === sub.id ? "700" : "500",
                fontSize: "1rem",
                marginBottom: "-1px",
                transition: "color 0.2s",
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
                  fontWeight: activeGroup === g.id ? "600" : "400",
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

  // RIGHT SIDEBAR: PREVIEW
  // Shows the image of the CURRENTLY SELECTED item in the active category
  const renderPreviewSidebar = () => {
    let currentItem = null;
    let title = "Select an Item";

    if (activeCategory === "scenery") {
      currentItem = selections.scenery;
      title = "Scenery";
    } else if (activeCategory === "pose") {
      currentItem = selections.pose;
      title = "Pose";
    } else {
      // Clothing
      if (selections[activeCategory] && selections[activeCategory].item) {
        currentItem = selections[activeCategory].item;
        title = currentItem.label;
      }
    }

    return (
      <div
        style={{
          width: "300px",
          borderLeft: "1px solid var(--border-color)",
          paddingLeft: "1.5rem",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3 style={{ ...sectionHeaderStyle, marginBottom: "1rem" }}>
          Active Preview
        </h3>

        <div
          style={{
            width: "100%",
            aspectRatio: "3/4",
            background: "#fff",
            borderRadius: "16px",
            border: "1px solid var(--border-color)",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          {currentItem ? (
            <>
              {/* Placeholder logic: You can map currentItem.id to real paths here later */}
              <img
                src={`/public/clothes/${currentItem.id}.jpg`}
                alt={currentItem.label}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/400x600/fdf2f8/f472b6?text=No+Image"; // Nice pastel placeholder
                }}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "1rem",
                  /* background:
                    "linear-gradient(to top, rgba(0,0,0,0.6), transparent)", */
                  color: "white",
                }}
              >
                {/* <p style={{ fontWeight: "600", fontSize: "0.95rem" }}>
                  {currentItem.label}
                </p> */}
              </div>
            </>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "1rem",
                color: "var(--text-secondary)",
              }}
            >
              <p>No item selected</p>
              <p style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
                Select an item to see details
              </p>
            </div>
          )}
        </div>

        <div style={{ marginTop: "1.5rem" }}>
          <h4 style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>
            Instructions
          </h4>
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--text-secondary)",
              lineHeight: "1.4",
            }}
          >
            Place your images in <code>public/images/</code> named as{" "}
            <code>[id].jpg</code> to see them here.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        alignItems: "flex-start",
        maxWidth: "1600px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      {renderSidebar()}

      <div style={{ flex: 1, minWidth: 0 }}>
        {" "}
        {/* minWidth 0 prevents flex child from overflowing */}
        {renderContent()}
      </div>

      {renderPreviewSidebar()}
    </div>
  );
};

// Styles
const sectionHeaderStyle = {
  fontSize: "0.75rem",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "var(--text-secondary)",
  marginBottom: "0.8rem",
  marginTop: "0.5rem",
  fontWeight: "700",
};

const navBtnStyle = (isActive) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.8rem",
  padding: "0.9rem 1rem",
  borderRadius: "12px",
  border: "none",
  background: isActive ? "var(--accent-color)" : "transparent",
  color: isActive ? "#fff" : "var(--text-secondary)",
  cursor: "pointer",
  textAlign: "left",
  fontWeight: isActive ? "600" : "500",
  transition: "all 0.2s",
  width: "100%",
});

const contentContainerStyle = {
  flex: 1,
};

const pageTitleStyle = {
  marginBottom: "1.5rem",
  color: "var(--text-primary)",
  fontSize: "1.8rem",
  fontWeight: "700",
};

const subTabContainerStyle = {
  display: "flex",
  gap: "0.5rem",
  marginBottom: "1.5rem",
  overflowX: "auto",
  paddingBottom: "0.5rem",
};

const subTabStyle = (isActive) => ({
  padding: "0.5rem 1rem",
  borderRadius: "8px",
  background: isActive ? "rgba(244, 114, 182, 0.15)" : "var(--bg-secondary)", // Pink tint
  color: isActive ? "var(--accent-color)" : "var(--text-secondary)",
  border: "1px solid",
  borderColor: isActive ? "var(--accent-color)" : "transparent",
  cursor: "pointer",
  fontWeight: isActive ? "600" : "400",
  whiteSpace: "nowrap",
});

export default MainSelector;
