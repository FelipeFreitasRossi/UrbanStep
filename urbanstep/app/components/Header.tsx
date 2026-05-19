// app/components/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiShoppingCart } from 'react-icons/fi';

export interface CartItem {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  quantidade: number;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const pathname = usePathname();

  // Carregar carrinho do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('urbanstep-cart');
    if (saved) setCartItems(JSON.parse(saved));
  }, []);

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('urbanstep-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Escutar mudanças no localStorage (vindas de outras abas ou do próprio site)
  useEffect(() => {
    const handleStorageChange = () => {
      const updated = localStorage.getItem('urbanstep-cart');
      if (updated) setCartItems(JSON.parse(updated));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Detectar scroll para aplicar efeito no header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar menu mobile ao redimensionar para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { href: '/inicio', label: 'Início' },
    { href: '/inicio#destaques', label: 'Destaques' },
    { href: '/inicio#categorias', label: 'Categorias' },
    { href: '/sobre', label: 'Sobre' },
    { href: '/contato', label: 'Contato' },
  ];

  const isActive = (href: string) => {
    if (href.includes('#')) return pathname === href.split('#')[0];
    return pathname === href;
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantidade, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.preco * item.quantidade, 0);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.id === id) {
            const newQtd = item.quantidade + delta;
            if (newQtd <= 0) return null;
            return { ...item, quantidade: newQtd };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    const message = cartItems
      .map(i => `${i.nome} x${i.quantidade} = R$ ${(i.preco * i.quantidade).toFixed(2)}`)
      .join('\n');
    const total = totalPrice.toFixed(2);
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(
      `Olá! Gostaria de comprar:\n${message}\nTotal: R$ ${total}`
    )}`;
    window.open(whatsappUrl, '_blank');
    setCartItems([]);
    setIsCartOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/90 backdrop-blur-md shadow-lg' : 'bg-black'
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Menu hambúrguer (mobile) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white focus:outline-none"
            aria-label="Menu"
          >
            {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>

          {/* Logo */}
          <Link href="/inicio" className="text-2xl font-bold text-white">
            UrbanStep
          </Link>

          {/* Ícone do carrinho e menu desktop */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="text-white relative focus:outline-none"
              aria-label="Carrinho"
            >
              <FiShoppingCart size={24} />
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* Menu desktop */}
            <nav className="hidden md:flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition font-medium ${
                    isActive(link.href) ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Sidebar mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-64 bg-black z-50 shadow-2xl md:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                  <span className="text-xl font-bold text-white">UrbanStep</span>
                  <button onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-white">
                    <FiX size={24} />
                  </button>
                </div>
                <nav className="flex flex-col p-4 space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
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

      {/* Drawer do carrinho */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-gray-900 z-50 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <h2 className="text-xl font-bold text-white">Seu Carrinho</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-white">
                  <FiX size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {cartItems.length === 0 ? (
                  <p className="text-gray-400 text-center">Carrinho vazio</p>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-3 bg-gray-800 p-3 rounded-lg">
                        <img src={item.imagem} alt={item.nome} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <h3 className="text-white font-semibold">{item.nome}</h3>
                          <p className="text-gray-400">R$ {item.preco.toFixed(2)}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="bg-gray-700 hover:bg-gray-600 text-white w-7 h-7 rounded"
                            >
                              -
                            </button>
                            <span className="text-white">{item.quantidade}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="bg-gray-700 hover:bg-gray-600 text-white w-7 h-7 rounded"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="border-t border-gray-800 p-4">
                  <div className="flex justify-between text-white mb-4">
                    <span>Total:</span>
                    <span className="font-bold">R$ {totalPrice.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
                  >
                    Finalizar Compra via WhatsApp
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;