// app/components/ModelViewer.tsx
'use client'; // Necessário para rodar apenas no navegador

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';

// Componente que carrega e renderiza o modelo 3D
function Model() {
  // Substitua '/models/seu-tenis.glb' pelo caminho real do seu arquivo .glb ou .gltf
  // O arquivo deve estar dentro da pasta 'public' do seu projeto.
  // Ex: '/models/meu-tenis.glb'
  const { scene } = useGLTF('/models/shoe.glb');
  return <primitive object={scene} scale={2.5} />;
}

// O componente principal que configura a cena 3D
const ModelViewer = () => {
  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 45 }}
        style={{ background: 'radial-gradient(circle at top, #1a1a1a, #000000)' }}
      >
        {/* Luz ambiente, ilumina o modelo uniformemente */}
        <ambientLight intensity={0.6} />
        {/* Luz direcional principal, para dar volume */}
        <directionalLight position={[5, 10, 7]} intensity={1} />
        {/* Uma segunda luz para dar detalhes nas sombras */}
        <pointLight position={[-5, 0, 5]} intensity={0.5} />

        {/* Carrega o modelo 3D */}
        <Suspense fallback={<div className="text-white text-center">Carregando modelo 3D...</div>}>
          <Model />
        </Suspense>

        {/* Adiciona fundo e reflexos sutis */}
        <Environment preset="city" />

        {/* Permite que o usuário interaja: rotacionar e dar zoom */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={10}
          rotateSpeed={1.5}
          zoomSpeed={1.2}
        />
      </Canvas>
    </div>
  );
};

export default ModelViewer;