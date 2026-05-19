// app/components/Image3DViewer.tsx
'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

// Componente que aplica a textura da imagem em um plano 3D
function ImagePlane({ imageUrl }: { imageUrl: string }) {
  const texture = useLoader(TextureLoader, imageUrl);
  
  // Ajusta o tamanho do plano para manter a proporção
  const baseWidth = 5;
  const aspect = texture.image.width / texture.image.height;
  const planeWidth = baseWidth;
  const planeHeight = baseWidth / aspect;

  return (
    <mesh>
      <planeGeometry args={[planeWidth, planeHeight]} />
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

  // Detecta se é mobile para ajustar sensibilidade dos controles
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Configurações de controle responsivas
  const controlsConfig = {
    enableZoom: true,
    enablePan: true,
    zoomSpeed: isMobile ? 0.8 : 1.2,
    rotateSpeed: isMobile ? 1.0 : 1.5,
    panSpeed: isMobile ? 0.8 : 1.0,
    minDistance: 3,
    maxDistance: isMobile ? 8 : 10,
    enableTouchRotate: true,
    enableZoom: true,
  };

  return (
    <div className="relative w-full aspect-square md:aspect-video lg:aspect-auto lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-black">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: bgColor, width: '100%', height: '100%' }}
        resize={{ scroll: true, debounce: { scroll: 50, resize: 0 } }}
      >
        {/* Iluminação profissional */}
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

      {/* Instruções sutis para mobile */}
      {isMobile && (
        <div className="absolute bottom-3 left-0 right-0 text-center text-white/50 text-xs bg-black/50 py-1 backdrop-blur-sm pointer-events-none">
          {/* 👆 Gire com um dedo | ✌️ Zoom com dois dedos */}
        </div>
      )}
    </div>
  );
};

export default Image3DViewer;