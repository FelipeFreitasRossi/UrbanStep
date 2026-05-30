// app/components/ProductModal.tsx
'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  FiX, FiShoppingCart, FiMessageCircle, FiTag,
  FiTruck, FiShield, FiRefreshCw, FiStar
} from 'react-icons/fi';

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
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleFinalizarCompra = () => {
    if (!product) return;
    const message = `Olá! Gostaria de comprar o ${product.nome} por R$ ${product.preco.toFixed(2)}.`;
    window.open(`https://wa.me/5516996167381?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };

  if (!product) return null;

  const parcelas = 6;
  const valorParcela = (product.preco / parcelas).toFixed(2);

  const beneficios = [
    { icon: FiTruck,      label: 'Frete grátis',   sub: 'Para todo o Brasil' },
    { icon: FiShield,     label: '100% original',  sub: 'Garantia Nike'      },
    { icon: FiRefreshCw,  label: 'Troca fácil',    sub: 'Em até 30 dias'     },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
          {/* Fundo escuro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(10px)',
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ y: '100%', opacity: 0.6 }}
            animate={{ y: '-6vh', opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 34, stiffness: 280, mass: 1 }}
            style={{
              position: 'relative',
              zIndex: 1,
              backgroundColor: '#ffffff',
              borderRadius: '32px 32px 24px 24px',
              width: '100%',
              maxWidth: '500px',
              maxHeight: '84vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 -12px 80px rgba(0,0,0,0.35)',
            }}
          >
            {/* ── Topo: alça + fechar ── */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '14px 20px 0',
              position: 'relative',
              flexShrink: 0,
            }}>
              <div style={{
                width: 40, height: 4,
                borderRadius: 99,
                backgroundColor: '#e2e8f0',
              }} />
              <button
                onClick={onClose}
                aria-label="Fechar"
                style={{
                  position: 'absolute',
                  right: 16,
                  top: 10,
                  width: 32, height: 32,
                  borderRadius: '50%',
                  backgroundColor: '#f1f5f9',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#94a3b8',
                }}
              >
                <FiX size={16} />
              </button>
            </div>

            {/* ── Conteúdo rolável ── */}
            <div style={{ overflowY: 'auto', flex: 1 }}>

              {/* Imagem */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: 230,
                backgroundColor: '#f8fafc',
                margin: '12px 0 0',
              }}>
                <Image
                  src={product.imagem}
                  alt={product.nome}
                  fill
                  style={{ objectFit: 'contain', padding: 24 }}
                  sizes="500px"
                  priority
                />

                {/* Badge Nike */}
                <span style={{
                  position: 'absolute',
                  top: 14, left: 14,
                  backgroundColor: '#111827',
                  color: 'white',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  padding: '5px 12px',
                  borderRadius: 99,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                }}>
                  NIKE
                </span>

                {/* Badge categoria */}
                <span style={{
                  position: 'absolute',
                  top: 14, right: 14,
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  color: '#475569',
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  padding: '5px 12px',
                  borderRadius: 99,
                  border: '1px solid #e2e8f0',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                }}>
                  <FiTag size={9} />
                  {product.categoria.toUpperCase()}
                </span>
              </div>

              {/* Dados do produto */}
              <div style={{ padding: '20px 22px 8px' }}>

                {/* Estrelas decorativas */}
                <div style={{ display: 'flex', gap: 2, marginBottom: 8 }}>
                  {[1,2,3,4,5].map(i => (
                    <FiStar
                      key={i}
                      size={13}
                      style={{
                        fill: i <= 4 ? '#f59e0b' : 'none',
                        color: '#f59e0b',
                        strokeWidth: i <= 4 ? 0 : 2,
                      }}
                    />
                  ))}
                  <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 4, fontWeight: 500 }}>
                    4.0 · 128 avaliações
                  </span>
                </div>

                {/* Nome */}
                <h2 style={{
                  fontSize: 21,
                  fontWeight: 800,
                  color: '#0f172a',
                  lineHeight: 1.2,
                  margin: '0 0 14px',
                  letterSpacing: '-0.02em',
                }}>
                  {product.nome}
                </h2>

                {/* Preço */}
                <div style={{
                  backgroundColor: '#fef2f2',
                  borderRadius: 16,
                  padding: '14px 18px',
                  marginBottom: 16,
                  border: '1px solid #fee2e2',
                }}>
                  <p style={{ fontSize: 28, fontWeight: 900, color: '#dc2626', margin: 0, lineHeight: 1 }}>
                    R$ {product.preco.toFixed(2)}
                  </p>
                  <p style={{ fontSize: 12, color: '#ef4444', marginTop: 6, marginBottom: 0, fontWeight: 500 }}>
                    ou {parcelas}× de{' '}
                    <strong style={{ color: '#b91c1c' }}>R$ {valorParcela}</strong> sem juros
                  </p>
                </div>

                {/* Descrição */}
                <p style={{
                  fontSize: 13.5,
                  color: '#64748b',
                  lineHeight: 1.7,
                  margin: '0 0 18px',
                }}>
                  {product.descricao || 'Tênis original Nike, conforto e estilo para o seu dia a dia. Modelo exclusivo da UrbanStep.'}
                </p>

                {/* Divisória com texto */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 14,
                }}>
                  <div style={{ flex: 1, height: 1, backgroundColor: '#f1f5f9' }} />
                  <span style={{ fontSize: 10, color: '#cbd5e1', fontWeight: 600, letterSpacing: '0.08em' }}>
                    BENEFÍCIOS
                  </span>
                  <div style={{ flex: 1, height: 1, backgroundColor: '#f1f5f9' }} />
                </div>

                {/* Benefícios */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 8,
                  marginBottom: 6,
                }}>
                  {beneficios.map(({ icon: Icon, label, sub }) => (
                    <div key={label} style={{
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: 16,
                      padding: '12px 8px',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 6,
                    }}>
                      <div style={{
                        width: 32, height: 32,
                        borderRadius: '50%',
                        backgroundColor: '#f1f5f9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#475569',
                      }}>
                        <Icon size={15} />
                      </div>
                      <div>
                        <p style={{ fontSize: 10.5, fontWeight: 700, color: '#334155', margin: 0 }}>{label}</p>
                        <p style={{ fontSize: 9.5, color: '#94a3b8', margin: '2px 0 0', fontWeight: 500 }}>{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Botões ── */}
            <div style={{
              padding: '14px 20px 20px',
              borderTop: '1px solid #f1f5f9',
              backgroundColor: '#ffffff',
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}>
              <button
                onClick={() => { onAddToCart(product); onClose(); }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1e293b')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#0f172a')}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                  backgroundColor: '#0f172a', color: 'white',
                  fontWeight: 700, fontSize: 14,
                  padding: '15px', borderRadius: 18,
                  border: 'none', cursor: 'pointer',
                  letterSpacing: '0.02em',
                  transition: 'background 0.2s',
                }}
              >
                <FiShoppingCart size={17} />
                Adicionar ao carrinho
              </button>

              <button
                onClick={handleFinalizarCompra}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#15803d')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#16a34a')}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                  backgroundColor: '#16a34a', color: 'white',
                  fontWeight: 700, fontSize: 14,
                  padding: '15px', borderRadius: 18,
                  border: 'none', cursor: 'pointer',
                  letterSpacing: '0.02em',
                  transition: 'background 0.2s',
                }}
              >
                <FiMessageCircle size={17} />
                Comprar via WhatsApp
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}