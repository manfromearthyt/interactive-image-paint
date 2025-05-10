
import React from "react";
import ColoringCanvas from "@/components/ColoringCanvas";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="container px-4 py-12 mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-kathakali-green">
            Kathakali Mask Coloring
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Explore the vibrant art of Kathakali by coloring this traditional mask design.
            Click on any area of the image to fill it with your selected color.
          </p>
        </header>

        <div className="max-w-6xl mx-auto">
          <ColoringCanvas 
            imageSrc="/lovable-uploads/1cb0a2a1-c2c9-4507-b1c6-42f2f1c4049f.png"
            width={550}
            height={550}
          />
          
          <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-kathakali-red">About Kathakali</h2>
            <p className="text-gray-700 mb-4">
              Kathakali is a classical Indian dance-drama known for its elaborate costumes, 
              colorful makeup, and stylized gestures. Originating in Kerala, it combines dance, 
              music, and acting to tell stories primarily from Hindu epics.
            </p>
            <p className="text-gray-700">
              The masks and makeup in Kathakali are vibrant and symbolic, with each color and 
              pattern representing specific character traits and personalities. Create your own 
              unique design by filling in the areas of the mask with different colors!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
