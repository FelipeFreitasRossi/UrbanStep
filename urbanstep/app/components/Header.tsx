'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fecha o menu ao redimensionar para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { href: '/inicio', label: 'Início' },
    { href: '/inicio#destaques', label: 'Destaques' },
    { href: '/inicio#categorias', label: 'Categorias' },
    { href: '/sobre', label: 'Sobre' },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const isActive = (href: string) => {
    if (href.includes('#')) {
      const [path] = href.split('#');
      return pathname === path;
    }
    return pathname === href;
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/90 backdrop-blur-md shadow-lg' : 'bg-black'
        }`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo à esquerda */}
            <Link href="/inicio" className="text-2xl font-bold text-white">
              UrbanStep
            </Link>

            {/* Botão hambúrguer à direita (mobile) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white focus:outline-none z-50 w-10 h-10 flex items-center justify-center"
              aria-label="Menu"
            >
              {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>

            {/* Menu desktop (visível apenas em md+) */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition font-medium ${
                    isActive(link.href)
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Sidebar mobile (direita) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay escuro */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu lateral vindo da direita */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-64 bg-black z-50 shadow-2xl md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Cabeçalho do menu */}
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                  <span className="text-xl font-bold text-white">UrbanStep</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white transition"
                  >
                    <FiX size={24} />
                  </button>
                </div>

                {/* Links de navegação */}
                <nav className="flex flex-col p-4 space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={handleLinkClick}
                      className={`transition font-medium py-3 px-4 rounded-lg ${
                        isActive(link.href)
                          ? 'text-white bg-gray-900'
                          : 'text-gray-300 hover:text-white hover:bg-gray-900'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;