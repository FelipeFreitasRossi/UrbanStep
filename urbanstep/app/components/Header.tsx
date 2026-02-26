'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiHome, FiStar, FiGrid, FiInfo } from 'react-icons/fi';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#hero', label: 'Início', icon: FiHome },
    { href: '#destaques', label: 'Destaques', icon: FiStar },
    { href: '#categorias', label: 'Categorias', icon: FiGrid },
    { href: '#sobre', label: 'Sobre', icon: FiInfo },
  ];

  const handleLinkClick = () => setIsOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/90 backdrop-blur-md shadow-lg' : 'bg-black'
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo branca */}
          <Link href="/" className="text-2xl font-bold text-white">
            UrbanStep
          </Link>

          {/* Desktop Menu - links em branco */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white transition font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Hamburger - ícone branco */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-white focus:outline-none"
            aria-label="Menu"
          >
            <FiMenu size={28} />
          </button>
        </div>
      </header>

      {/* Sidebar overlay e menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay escuro com blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar propriamente dito */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-64 bg-black z-50 shadow-2xl md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Cabeçalho do sidebar com logo e botão fechar */}
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
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={handleLinkClick}
                        className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-900 transition font-medium py-3 px-4 rounded-lg"
                      >
                        <Icon size={20} />
                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                </nav>

                {/* Rodapé do sidebar (opcional) */}
                <div className="mt-auto p-4 border-t border-gray-800">
                  <p className="text-sm text-gray-500">© 2024 UrbanStep</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;