'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SplashScreen from './components/SplashScreen';
import Image from 'next/image';

export default function LandingPage() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen />}
      {!showSplash && (
        <div className="relative min-h-screen w-full overflow-hidden">
          <div className="absolute inset-0 z-0">
            <picture>
              <source
                media="(max-width: 768px)"
                srcSet="https://i.postimg.cc/Kvf5JJRw/12Mola-Nike-Mobile.png"
              />
              <source
                media="(min-width: 769px)"
                srcSet="https://i.postimg.cc/0NmHN7yd/12Mola-Nike.png"
              />
              <Image
                src="https://i.postimg.cc/0NmHN7yd/12Mola-Nike.png"
                alt="Background UrbanStep"
                fill
                className="object-cover object-center"
                priority
                sizes="100vw"
                quality={90}
              />
            </picture>
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <div className="relative z-10 flex flex-col justify-between min-h-screen px-6 py-8 md:px-16 md:py-16 text-white">
            <div className="max-w-xl mt-12 md:mt-32 space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                UrbanStep
              </h1>
              <p className="text-base md:text-xl text-gray-200 max-w-md">
                Bem-vindo à sua nova loja de tênis. Conforto, estilo e qualidade para todos os momentos.
              </p>
            </div>

            <div className="flex justify-center md:justify-start mb-8 md:mb-16">
              <Link
                href="/inicio"
                className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-gray-100 transition transform active:scale-95 w-full max-w-xs md:w-auto inline-block text-center"
              >
                Entrar
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}