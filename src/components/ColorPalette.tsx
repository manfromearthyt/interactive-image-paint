import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Download, RefreshCcw, Palette } from "lucide-react";

// Define the colors - keeping the same color palette
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
    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-5 w-full md:w-auto border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-gray-600" />
          <h2 className="text-base font-medium text-gray-700">Colors</h2>
        </div>
        <div className="h-6 w-6 rounded-full border-2 border-gray-300" style={{ backgroundColor: selectedColor }}></div>
      </div>
      
      <div className="grid grid-cols-6 gap-3 mb-6">
        {COLORS.map((color) => (
          <button
            key={color.value}
            className={`w-8 h-8 rounded-full transition-all duration-300 ${
              selectedColor === color.value 
                ? "ring-2 ring-offset-2 ring-gray-500 scale-110" 
                : "hover:scale-105"
            }`}
            style={{ 
              backgroundColor: color.value,
              boxShadow: selectedColor === color.value ? "0 4px 6px rgba(0,0,0,0.1)" : "none"
            }}
            title={color.name}
            aria-label={`Select color ${color.name}`}
            onClick={() => {
              onSelectColor(color.value);
              toast(`${color.name} selected`, {
                position: "top-right",
                duration: 1500,
              });
            }}
          />
        ))}
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={onReset}
          className="flex-1 gap-2"
          size="sm"
        >
          <RefreshCcw className="h-4 w-4" /> Reset
        </Button>
        <Button 
          onClick={onDownload} 
          className="flex-1 gap-2"
          size="sm"
        >
          <Download className="h-4 w-4" /> Save
        </Button>
      </div>
    </div>
  );
};

export default ColorPalette;
