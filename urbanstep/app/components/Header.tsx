'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const navLinks = [
    { href: '#sobre', label: 'Sobre' },
    { href: '#produtos', label: 'Produtos' },
    { href: '#contato', label: 'Contato' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/home" className="text-2xl font-bold text-gray-800">
          UrbanStep
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-gray-600 hover:text-gray-900 transition">
              {link.label}
            </Link>
          ))}
          {user && (
            <span className="text-sm text-gray-500">Olá, {user}</span>
          )}
          <button onClick={logout} className="text-red-600 hover:text-red-800">
            Sair
          </button>
        </nav>

        {/* Mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex items-center px-3 py-2 border rounded text-gray-600 border-gray-300"
        >
          <svg className="fill-current h-5 w-5" viewBox="0 0 20 20">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 p-4">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="block py-2 text-gray-600" onClick={() => setIsMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          {user && <p className="py-2 text-sm text-gray-500">Olá, {user}</p>}
          <button onClick={logout} className="block w-full text-left py-2 text-red-600">
            Sair
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;