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

const ItemIcon = ({ id, color = "var(--text-secondary)", size = 40 }) => {
  // Helper to match partial IDs
  const match = (term) => id.includes(term);

  let Icon = Circle; // Default

  // TOPS
  if (match("crop") || match("tube") || match("halter")) Icon = Shirt;
  else if (match("tshirt") || match("tee")) Icon = Shirt;
  else if (match("social")) Icon = Briefcase; // Formal
  else if (match("camisole") || match("bodysuit")) Icon = Heart;
  // BOTTOMS
  else if (match("skirt")) Icon = Circle; // Triangular shape
  else if (match("short")) Icon = Scissors;
  else if (match("jeans") || match("pants") || match("leg")) Icon = Scissors;
  // DRESSES
  else if (match("dress") || match("gown")) Icon = User;
  // BIKINIS
  else if (match("bikini")) Icon = Droplet;
  else if (match("swimsuit")) Icon = Droplet;
  // FANTASIES
  else if (match("fantasy")) Icon = Star;
  else if (match("costume")) Icon = Anchor;
  // SHOES
  else if (match("heel") || match("stiletto")) Icon = Star;
  else if (match("boot")) Icon = Box;
  else if (match("sneaker")) Icon = Disc;
  // SCENERY
  else if (match("nature") || match("forest") || match("tropical"))
    Icon = Flower;
  else if (match("urban") || match("street")) Icon = Home;
  else if (match("room") || match("interior") || match("bath")) Icon = Box;
  else if (match("beach")) Icon = Sun;
  else if (match("studio") || match("solid")) Icon = Camera;
  // POSES
  else if (match("pose") || match("standing") || match("sitting")) Icon = User;

  return (
    <div style={{ color: color, transition: "color 0.3s ease" }}>
      <Icon size={size} />
    </div>
  );
};

export default ItemIcon;
