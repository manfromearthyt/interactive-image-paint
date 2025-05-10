
import React from "react";
import ColoringCanvas from "@/components/ColoringCanvas";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="container px-4 py-12 mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-kathakali-green bg-clip-text text-transparent bg-gradient-to-r from-kathakali-green to-kathakali-teal">
            Kathakali Mask
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Explore this traditional art form through digital coloring.
          </p>
        </header>

        <div className="max-w-6xl mx-auto">
          <ColoringCanvas 
            imageSrc="/lovable-uploads/1cb0a2a1-c2c9-4507-b1c6-42f2f1c4049f.png"
            width={550}
            height={550}
          />
          
          <Card className="mt-12 border-none shadow-lg bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-3 text-kathakali-blue">About Kathakali</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Kathakali is a classical Indian dance-drama known for its elaborate costumes, 
                colorful makeup, and stylized gestures. Originating in Kerala, it combines dance, 
                music, and acting to tell stories primarily from Hindu epics.
              </p>
              <p className="text-gray-600 leading-relaxed">
                The masks and makeup in Kathakali are symbolic, with colors representing specific character traits. 
                Create your own design with the color palette provided.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
