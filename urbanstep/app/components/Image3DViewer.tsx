// app/components/Image3DViewer.tsx
'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

function ImagePlane({ imageUrl }: { imageUrl: string }) {
  const texture = useLoader(TextureLoader, imageUrl);
  const width = 5;
  const height = width / (texture.image.width / texture.image.height);

  return (
    <mesh>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial map={texture} side={2} toneMapped={true} />
    </mesh>
  );
}

interface Image3DViewerProps {
  imageUrl: string;
  bgColor?: string;
}

const Image3DViewer = ({ imageUrl, bgColor = '#000000' }: Image3DViewerProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const controlsConfig = {
    enableZoom: true,          
    enablePan: true,
    zoomSpeed: isMobile ? 0.8 : 1.2,
    rotateSpeed: isMobile ? 1.0 : 1.5,
    panSpeed: isMobile ? 0.8 : 1.0,
    minDistance: 3,
    maxDistance: isMobile ? 8 : 10,
    enableTouchRotate: true,
  };

  return (
    <div className="relative w-full aspect-square md:aspect-video lg:aspect-auto lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-black">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: bgColor, width: '100%', height: '100%' }}
        resize={{ scroll: true, debounce: { scroll: 50, resize: 0 } }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-3, 2, 4]} intensity={0.5} />
        <pointLight position={[2, 3, 4]} intensity={0.4} />

        <Suspense fallback={null}>
          <ImagePlane imageUrl={imageUrl} />
        </Suspense>

        <Environment preset="city" background={false} />
        <OrbitControls {...controlsConfig} />
      </Canvas>
    </div>
  );
};

export default Image3DViewer;