// app/components/ProductModal.tsx
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
  // Impede scroll do body quando o modal está aberto
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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />
          {/* Modal responsivo */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-white rounded-2xl shadow-2xl z-50 overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Botão fechar */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition"
            >
              <FiX size={20} />
            </button>

            {/* Imagem do produto */}
            <div className="relative h-64 w-full bg-gray-100">
              <Image
                src={product.imagem}
                alt={product.nome}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>

            {/* Conteúdo */}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{product.nome}</h2>
              <span className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full mb-3">
                {product.categoria}
              </span>
              <p className="text-gray-600 mb-4">
                {product.descricao || "Tênis original Nike, conforto e estilo para o seu dia a dia. Modelo exclusivo da UrbanStep."}
              </p>
              <div className="text-3xl font-bold text-red-600 mb-6">
                R$ {product.preco.toFixed(2)}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-full transition"
                >
                  Adicionar ao carrinho
                </button>
                <button
                  onClick={handleFinalizarCompra}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full transition"
                >
                  Finalizar compra
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}