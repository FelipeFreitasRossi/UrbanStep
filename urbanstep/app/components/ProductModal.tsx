'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiX } from 'react-icons/fi';

interface Product {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  categoria: string;
  descricao?: string;
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleFinalizarCompra = () => {
    if (!product) return;
    const message = `Olá! Gostaria de comprar o ${product.nome} por R$ ${product.preco.toFixed(2)}.`;
    window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay escuro com blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal principal - centralizado e responsivo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                       w-[90%] max-w-md 
                       bg-white rounded-2xl shadow-2xl z-50
                       overflow-hidden
                       max-h-[90vh] flex flex-col"
          >
            {/* Botão fechar */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-20 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-full transition"
              aria-label="Fechar"
            >
              <FiX size={20} />
            </button>

            {/* Container rolável */}
            <div className="flex-1 overflow-y-auto">
              {/* Imagem */}
              <div className="relative w-full h-64 sm:h-72 md:h-80 bg-gray-100">
                <Image
                  src={product.imagem}
                  alt={product.nome}
                  fill
                  className="object-contain p-3"
                  sizes="(max-width: 640px) 90vw, (max-width: 768px) 80vw, 400px"
                />
              </div>

              {/* Conteúdo */}
              <div className="p-5 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 pr-6">
                  {product.nome}
                </h2>
                <span className="inline-block mt-2 bg-gray-200 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {product.categoria}
                </span>
                <p className="text-gray-600 text-sm sm:text-base mt-3 leading-relaxed">
                  {product.descricao || "Tênis original Nike, conforto e estilo para o seu dia a dia. Modelo exclusivo da UrbanStep."}
                </p>
                <div className="text-2xl sm:text-3xl font-bold text-red-600 mt-4 mb-6">
                  R$ {product.preco.toFixed(2)}
                </div>

                {/* Botões */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      onAddToCart(product);
                      onClose();
                    }}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-full transition active:scale-95 shadow-md"
                  >
                    Adicionar ao carrinho
                  </button>
                  <button
                    onClick={handleFinalizarCompra}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full transition active:scale-95 shadow-md"
                  >
                    Finalizar compra
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}