
/**
 * Fills an area of the canvas with the specified color using a flood fill algorithm
 */
export const floodFill = (
  canvas: HTMLCanvasElement,
  x: number, 
  y: number, 
  fillColor: string,
  tolerance = 10
): void => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  // Get canvas dimensions and pixel data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const width = imageData.width;
  const height = imageData.height;
  
  // Convert coordinates to integer
  x = Math.floor(x);
  y = Math.floor(y);
  
  // Convert target coordinates to pixel index
  const targetIndex = (y * width + x) * 4;
  
  // Get target color
  const targetR = data[targetIndex];
  const targetG = data[targetIndex + 1];
  const targetB = data[targetIndex + 2];
  const targetA = data[targetIndex + 3];
  
  // Parse fill color
  const fillColorObj = hexToRgba(fillColor);
  const fillR = fillColorObj.r;
  const fillG = fillColorObj.g;
  const fillB = fillColorObj.b;
  const fillA = Math.floor(fillColorObj.a * 255);
  
  // Check if the target pixel already has the fill color
  if (
    Math.abs(targetR - fillR) <= tolerance &&
    Math.abs(targetG - fillG) <= tolerance &&
    Math.abs(targetB - fillB) <= tolerance &&
    Math.abs(targetA - fillA) <= tolerance
  ) {
    return;
  }
  
  // Stack for flood fill algorithm
  const stack: [number, number][] = [[x, y]];
  const visited = new Set<string>();
  
  while (stack.length) {
    const [curX, curY] = stack.pop()!;
    const posKey = `${curX},${curY}`;
    
    if (
      curX < 0 || curX >= width ||
      curY < 0 || curY >= height ||
      visited.has(posKey)
    ) {
      continue;
    }
    
    const index = (curY * width + curX) * 4;
    const r = data[index];
    const g = data[index + 1];
    const b = data[index + 2];
    const a = data[index + 3];
    
    if (
      Math.abs(r - targetR) <= tolerance &&
      Math.abs(g - targetG) <= tolerance &&
      Math.abs(b - targetB) <= tolerance &&
      Math.abs(a - targetA) <= tolerance
    ) {
      // Set the color
      data[index] = fillR;
      data[index + 1] = fillG;
      data[index + 2] = fillB;
      data[index + 3] = fillA;
      
      visited.add(posKey);
      
      // Add neighbors to stack
      stack.push([curX + 1, curY]);
      stack.push([curX - 1, curY]);
      stack.push([curX, curY + 1]);
      stack.push([curX, curY - 1]);
    }
  }
  
  // Put the modified image data back to the canvas
  ctx.putImageData(imageData, 0, 0);
};

/**
 * Converts a hex color string to an rgba object
 */
export const hexToRgba = (hex: string): { r: number; g: number; b: number; a: number } => {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const a = hex.length === 8 ? parseInt(hex.substring(6, 8), 16) / 255 : 1;
  
  return { r, g, b, a };
};

/**
 * Creates a canvas with the image loaded
 */
export const createImageCanvas = (
  image: HTMLImageElement,
  width: number,
  height: number
): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.drawImage(image, 0, 0, width, height);
  }
  
  return canvas;
};

/**
 * Load an image from a URL
 */
export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};
