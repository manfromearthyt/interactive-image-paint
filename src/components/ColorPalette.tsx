
import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Define the colors
const COLORS = [
  { name: "Red", value: "#D32F2F" },
  { name: "Green", value: "#388E3C" },
  { name: "Blue", value: "#1976D2" },
  { name: "Yellow", value: "#FBC02D" },
  { name: "Orange", value: "#F57C00" },
  { name: "Purple", value: "#7B1FA2" },
  { name: "Pink", value: "#C2185B" },
  { name: "Teal", value: "#00796B" },
  { name: "Brown", value: "#5D4037" },
  { name: "Black", value: "#212121" },
  { name: "White", value: "#FFFFFF" },
  { name: "Gray", value: "#9E9E9E" },
];

interface ColorPaletteProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
  onReset: () => void;
  onDownload: () => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({
  selectedColor,
  onSelectColor,
  onReset,
  onDownload,
}) => {
  return (
    <div className="w-full md:w-auto bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-medium mb-3">Color Palette</h2>
      
      <div className="grid grid-cols-6 gap-2 mb-4">
        {COLORS.map((color) => (
          <button
            key={color.value}
            className={`w-8 h-8 rounded-full border-2 ${
              selectedColor === color.value 
                ? "border-black animate-color-select" 
                : "border-gray-200"
            }`}
            style={{ backgroundColor: color.value }}
            title={color.name}
            aria-label={`Select color ${color.name}`}
            onClick={() => {
              onSelectColor(color.value);
              toast(`Selected ${color.name}`, {
                position: "top-right",
              });
            }}
          />
        ))}
      </div>
      
      <div className="flex flex-col space-y-2">
        <Button 
          variant="outline" 
          onClick={onReset}
          className="w-full"
        >
          Reset Canvas
        </Button>
        <Button 
          onClick={onDownload} 
          className="w-full"
        >
          Download Artwork
        </Button>
      </div>
    </div>
  );
};

export default ColorPalette;
