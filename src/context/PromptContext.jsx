import React, { createContext, useContext, useState } from "react";
import { SCENERY, POSES } from "../data/options";

// 1. Create the Context object
const PromptContext = createContext();

/**
 * 2. Provider Component
 * Wraps the app and holds the state of the user's prompt (selections).
 */
export const PromptProvider = ({ children }) => {
  // Initial state covers all categories.
  const [selections, setSelections] = useState({
    clothingType: "mix", // 'mix' = Top + Bottom + Shoe, 'dress' = Dress + Shoe, 'bikini' = Bikini
    top: null, // { item: {...}, color: {...}, fabric: {...}, neckline: {...} }
    bottom: null,
    dress: null,
    bikinis: null, // New: Bikini
    shoes: null, // New: Shoes category
    fantasies: null,
    pose: POSES[0], // Default pose
    scenery: SCENERY[0], // Default scenery
    bokeh: false, // New: Background blur toggle
  });

  // Helper to update a specific category's state
  const updateSelection = (category, value) => {
    setSelections((prev) => {
      const newState = { ...prev };

      // Logic to switch modes and clear conflicting selections
      if (category === "top" || category === "bottom") {
        newState.clothingType = "mix";
        newState.dress = null;
        newState.bikinis = null;
        newState.fantasies = null;
      } else if (category === "dress") {
        newState.clothingType = "dress";
        newState.top = null;
        newState.bottom = null;
        newState.bikinis = null;
        newState.fantasies = null;
      } else if (category === "bikinis") {
        newState.clothingType = "bikini";
        newState.top = null;
        newState.bottom = null;
        newState.dress = null;
        newState.fantasies = null;
      } else if (category === "fantasies") {
        newState.clothingType = "fantasy";
        newState.top = null;
        newState.bottom = null;
        newState.dress = null;
        newState.bikinis = null;
      }

      // Finally update the specific field
      newState[category] = value;
      return newState;
    });
  };

  // Function to clear all selections
  const clearAll = () => {
    setSelections({
      clothingType: "mix",
      top: null,
      bottom: null,
      dress: null,
      bikinis: null,
      shoes: null,
      fantasies: null,
      pose: POSES[0],
      scenery: SCENERY[0],
      bokeh: false,
    });
  };

  /**
   * Generates the final text string for the AI (PORTUGUESE - V14 STANDARD RESTORATION).
   */
  const generatePrompt = () => {
    const parts = [];

    // Helper: "top de alcinha coral com hard plunging neck, tecido velvet"
    const formatItem = (data) => {
      if (!data || !data.item) return null;
      const { item, fabric, color, neckline } = data;

      let str = item.value;

      if (color) str += ` ${color.value}`;

      // Neckline (Restored "com ")
      if (neckline) str += ` com ${neckline.value}`;

      // Fabric (Restored manual fabric selection, ", tecido ")
      if (fabric) str += `, tecido ${fabric.value}`;

      return str.trim();
    };

    // 1. CLOTHING (Bottom First, then Top)
    if (selections.clothingType === "dress") {
      const s = formatItem(selections.dress);
      if (s) parts.push(s);
    } else if (selections.clothingType === "bikini") {
      const s = formatItem(selections.bikinis);
      if (s) parts.push(s);
    } else if (selections.clothingType === "fantasy") {
      const s = formatItem(selections.fantasies);
      if (s) parts.push(s);
    } else {
      // MIX MODE: Bottom -> Top ("combinada com")
      // Apply formatItem to both
      const topStr = formatItem(selections.top);
      const bottomStr = formatItem(selections.bottom);

      if (bottomStr && topStr) {
        // "royal blue chino mini short, combinada com top..." (User example had comma before combinada?)
        // User Example: "item..., combinada com item..."
        parts.push(`${bottomStr}, combinada com ${topStr}`); // Added comma before combinada
      } else {
        if (bottomStr) parts.push(bottomStr);
        if (topStr) parts.push(topStr);
      }
    }

    // SHOES
    if (selections.shoes && selections.shoes.item) {
      const { item, color, fabric } = selections.shoes;
      let shoeStr = item.value;
      if (color) shoeStr += ` ${color.value}`;
      if (fabric) shoeStr += `, tecido ${fabric.value}`;
      parts.push(shoeStr);
    }

    // 2. POSE
    if (selections.pose) {
      // Example had "(Mude a pose)"
      parts.push(`(${selections.pose.value})`);
    }

    // 3. SCENERY
    if (selections.scenery) {
      let sceneStr = selections.scenery.value;
      if (selections.bokeh) {
        sceneStr += ", fundo bokeh";
      } else {
        sceneStr += "";
      }
      parts.push(sceneStr);
    }

    // 4. FIXED SUFFIX (Restored standard from user example)
    // "modelo em primeiro plano. Enquadramento idêntico à foto original. Ambiente bem iluminado, estética limpa, sensualidade sutil, Instagram safe."
    parts.push(
      "modelo em primeiro plano. Enquadramento idêntico à foto original. Ambiente bem iluminado, estética limpa, sensualidade sutil, Instagram safe, fotorrealista. Respeite a silhueta do corpo e não mude o rosto."
    );

    return parts.filter(Boolean).join(". ");
  };

  return (
    <PromptContext.Provider
      value={{ selections, updateSelection, clearAll, generatePrompt }}
    >
      {children}
    </PromptContext.Provider>
  );
};

export const usePrompt = () => useContext(PromptContext);
