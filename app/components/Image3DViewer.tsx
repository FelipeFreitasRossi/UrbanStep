// app/components/Image3DViewer.tsx
'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

function ImagePlane({ imageUrl, isInteracting }: { imageUrl: string; isInteracting: boolean }) {
  const texture = useLoader(TextureLoader, imageUrl);
  const meshRef = useRef<THREE.Mesh>(null);

  const width = 5;
  const height = width / (texture.image.width / texture.image.height);

  useFrame((_, delta) => {
    if (meshRef.current && !isInteracting) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial
        map={texture}
        side={2}
        toneMapped={true}
        transparent={true}  // 👈 respeita a transparência do PNG
      />
    </mesh>
  );
}

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10 gap-3">
      <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-red-500 animate-spin" />
      <p className="text-gray-500 text-sm tracking-widest uppercase">Carregando...</p>
    </div>
  );
}

interface Image3DViewerProps {
  imageUrl: string;
  bgColor?: string;
}

const Image3DViewer = ({ imageUrl, bgColor = '#ffffff' }: Image3DViewerProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    // 👇 fundo branco aqui no div, FORA do Canvas
    <div
      className="relative w-full rounded-2xl overflow-hidden shadow-2xl"
      style={{
        height: isMobile ? '320px' : '500px',
        background: bgColor, // fundo fica parado aqui
      }}
    >
      {!isLoaded && <LoadingFallback />}

      {isLoaded && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10
                        bg-black/10 backdrop-blur-sm text-gray-500 text-xs
                        px-3 py-1 rounded-full pointer-events-none select-none">
          🖱️ Arraste para girar · Scroll para zoom
        </div>
      )}

      {isLoaded && (
        <button
          onClick={handleReset}
          className="absolute top-3 right-3 z-10 bg-black/10 hover:bg-black/20
                     backdrop-blur-sm text-gray-700 text-xs px-3 py-1.5 rounded-full
                     transition border border-black/10"
        >
          ↺ Resetar
        </button>
      )}

      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: 'transparent', width: '100%', height: '100%' }} // 👈 Canvas transparente
        onCreated={() => setIsLoaded(true)}
      >
        <ambientLight intensity={1.0} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-3, 2, 4]} intensity={0.4} />

        <Suspense fallback={null}>
          <ImagePlane imageUrl={imageUrl} isInteracting={isInteracting} />
        </Suspense>

        <Environment preset="city" background={false} />

        <OrbitControls
          ref={controlsRef}
          enableZoom={true}
          enablePan={true}
          enableDamping={true}
          dampingFactor={0.08}
          zoomSpeed={isMobile ? 0.6 : 1.0}
          rotateSpeed={isMobile ? 0.8 : 1.2}
          minDistance={3}
          maxDistance={isMobile ? 8 : 10}
          onStart={() => setIsInteracting(true)}
          onEnd={() => setIsInteracting(false)}
        />
      </Canvas>
    </div>
  );
};

export default Image3DViewer;