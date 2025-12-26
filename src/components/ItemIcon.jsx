import React from "react";
import {
  Shirt,
  Scissors,
  Anchor,
  Box,
  User,
  Circle,
  Flower,
  Moon,
  Sun,
  Umbrella,
  Home,
  Camera,
  Hexagon,
  Cloud,
  Heart,
  Star,
  Disc,
  Watch,
  Briefcase,
  Droplet,
} from "lucide-react";

import { skirt, } from "@lucide/lab";

const ItemIcon = ({ id, color = "var(--text-secondary)", size = 40 }) => {

  let Icon = Circle; // Default

  return (
    <div style={{ color: color, transition: "color 0.3s ease" }}>
      <Icon size={size} />
    </div>
  );
};

export default ItemIcon;
