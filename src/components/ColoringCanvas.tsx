
import React, { useEffect, useRef, useState } from "react";
import { floodFill, loadImage } from "@/lib/canvas-utils";
import { toast } from "sonner";
import ColorPalette from "./ColorPalette";

interface ColoringCanvasProps {
  imageSrc: string;
  width?: number;
  height?: number;
}

const ColoringCanvas: React.FC<ColoringCanvasProps> = ({ 
  imageSrc,
  width = 500,
  height = 500 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedColor, setSelectedColor] = useState("#D32F2F");
  const [isLoading, setIsLoading] = useState(true);
  const [originalCanvas, setOriginalCanvas] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let mounted = true;
    const initCanvas = async () => {
      try {
        setIsLoading(true);
        
        // Load the image
        const image = await loadImage(imageSrc);
        
        if (!canvasRef.current || !mounted) return;
        
        // Calculate aspect ratio to fit the image
        const aspectRatio = image.width / image.height;
        let canvasWidth = width;
        let canvasHeight = height;
        
        if (aspectRatio > 1) {
          // Image is wider than tall
          canvasHeight = width / aspectRatio;
        } else {
          // Image is taller than wide
          canvasWidth = height * aspectRatio;
        }
        
        // Set canvas size
        canvasRef.current.width = canvasWidth;
        canvasRef.current.height = canvasHeight;
        
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          // Draw the image on the canvas
          ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
          
          // Save the original canvas for reset functionality
          const tempCanvas = document.createElement("canvas");
          tempCanvas.width = canvasWidth;
          tempCanvas.height = canvasHeight;
          tempCanvas.getContext("2d")?.drawImage(canvasRef.current, 0, 0);
          setOriginalCanvas(tempCanvas);
        }
      } catch (error) {
        console.error("Error initializing canvas:", error);
        toast.error("Failed to load the image. Please try again.");
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initCanvas();
    
    return () => {
      mounted = false;
    };
  }, [imageSrc, width, height]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    // Get the canvas and compute the click coordinates
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate the actual canvas coordinates accounting for scaling
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const canvasX = x * scaleX;
    const canvasY = y * scaleY;
    
    // Apply the flood fill algorithm
    floodFill(canvas, canvasX, canvasY, selectedColor);
  };

  const handleReset = () => {
    if (!canvasRef.current || !originalCanvas) return;
    
    const ctx = canvasRef.current.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(originalCanvas, 0, 0);
      toast("Canvas reset", {
        position: "top-right",
        duration: 1500,
      });
    }
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    
    const link = document.createElement("a");
    link.download = "kathakali-artwork.png";
    link.href = canvasRef.current.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Artwork saved successfully", {
      position: "top-center",
      duration: 1500,
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
      <div className="relative bg-white/20 p-4 rounded-xl backdrop-blur-sm shadow-lg border border-white/30 transition-all duration-300 hover:shadow-xl">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-xl">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-kathakali-blue"></div>
          </div>
        )}
        
        <canvas
          ref={canvasRef}
          className="rounded-lg shadow-inner cursor-pointer max-w-full h-auto touch-none transition-all duration-300"
          onClick={handleCanvasClick}
          style={{ 
            display: isLoading ? "none" : "block",
            maxWidth: "100%",
            height: "auto"
          }}
        />
      </div>
      
      <ColorPalette 
        selectedColor={selectedColor}
        onSelectColor={setSelectedColor}
        onReset={handleReset}
        onDownload={handleDownload}
      />
    </div>
  );
};

export default ColoringCanvas;
