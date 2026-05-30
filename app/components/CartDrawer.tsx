'use client';

import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cart, updateQuantity, removeFromCart, totalPrice } = useCart();

  const sendWhatsApp = () => {
    let message = '🛒 *Meu pedido na UrbanStep:*\n\n';
    cart.forEach(item => {
      message += `*${item.nome}* - R$ ${item.preco.toFixed(2)} x ${item.quantity} = R$ ${(item.preco * item.quantity).toFixed(2)}\n`;
    });
    message += `\n*Total: R$ ${totalPrice.toFixed(2)}*\n\n`;
    message += 'Gostaria de finalizar a compra.';
    const url = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl flex flex-col"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">Carrinho</h2>
              <button onClick={onClose}><FiX size={24} /></button>
            </div>
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {cart.length === 0 && <p>Carrinho vazio</p>}
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <h3>{item.nome}</h3>
                    <p>R$ {item.preco.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 bg-gray-200 rounded">-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 bg-gray-200 rounded">+</button>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500">Remover</button>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <div className="flex justify-between font-bold mb-4">
                <span>Total:</span>
                <span>R$ {totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={sendWhatsApp}
                disabled={cart.length === 0}
                className="w-full bg-green-600 text-white py-3 rounded-full disabled:opacity-50"
              >
                Finalizar compra via WhatsApp
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}