import React from 'react';

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <h1 className="text-white text-4xl md:text-6xl font-bold tracking-widest animate-pulse">
        UrbanStep
      </h1>
    </div>
  );
};

export default SplashScreen;