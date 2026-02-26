'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimation, useInView } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { produtos } from '../data/produtos';

const AnimatedSection = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
      initial="hidden"
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function InicioPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Nike Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <div className="relative z-10 text-center text-white px-4">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-4"
            >
              NIKE
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            >
              O melhor da Nike você encontra aqui na UrbanStep
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                href="#destaques"
                className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition inline-block"
              >
                Ver Destaques
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Destaques Nike */}
        <section id="destaques" className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                Destaques Nike
              </h2>
              <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                Os modelos casuais mais icônicos e confortáveis
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
              {produtos.slice(0, 3).map((produto) => (
                <AnimatedSection key={produto.id} className="h-full">
                  <ProductCard produto={produto} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Lançamentos */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                Lançamentos Exclusivos
              </h2>
              <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
                Os modelos mais recentes acabaram de chegar
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {produtos.slice(3, 5).map((produto) => (
                <AnimatedSection key={produto.id} className="h-full">
                  <div className="bg-gray-800 rounded-2xl overflow-hidden flex flex-col md:flex-row">
                    <div className="relative h-64 md:h-auto md:w-1/2">
                      <Image
                        src={produto.imagem}
                        alt={produto.nome}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 md:w-1/2 flex flex-col justify-center">
                      <span className="text-sm text-gray-400">{produto.categoria}</span>
                      <h3 className="font-bold text-2xl mt-1">{produto.nome}</h3>
                      <p className="text-gray-300 mt-2">
                        Lançamento exclusivo! Garanta já o seu.
                      </p>
                      <p className="text-white font-bold text-xl mt-4">
                        R$ {produto.preco.toFixed(2)}
                      </p>
                      <button className="mt-4 bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700 transition font-medium inline-block w-full md:w-auto text-center">
                        Comprar
                      </button>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Categorias */}
        <section id="categorias" className="py-20">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                Estilos Casuais
              </h2>
              <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                Encontre o visual perfeito para o dia a dia
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { nome: 'Air Force', imagem: 'https://i.postimg.cc/Y0DNKc94/CAPA-AIR-FORCE.png' },
                { nome: 'Dunk', imagem: 'https://i.postimg.cc/pLS29s9Y/CAPA-DUNK.png' },
                { nome: 'Court', imagem: 'https://i.postimg.cc/L55CZ3gj/CAPA-COURTO-LOW-VISION.png' },
              ].map((cat) => (
                <AnimatedSection key={cat.nome} className="relative group h-80 overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src={cat.imagem}
                    alt={cat.nome}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-2xl font-bold">{cat.nome}</h3>
                    <Link
                      href={`/categoria/${cat.nome.toLowerCase()}`}
                      className="inline-block mt-2 text-white/90 hover:text-white text-sm font-medium underline underline-offset-2"
                    >
                      Ver modelos →
                    </Link>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Sobre */}
        <section id="sobre" className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <AnimatedSection className="lg:w-1/2">
                <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl aspect-video md:aspect-auto md:h-96">
                  <Image
                    src="https://i.postimg.cc/CM4JwttH/Foto-Casal.png"
                    alt="Sobre a UrbanStep"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </AnimatedSection>
              <AnimatedSection className="lg:w-1/2 text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Por que escolher a UrbanStep?
                </h2>
                <p className="text-gray-300 text-lg mb-4">
                  Somos especialistas em Nike. Trabalhamos com os lançamentos mais exclusivos e os clássicos que nunca saem de moda. Conforto, estilo e autenticidade em cada par.
                </p>
                <p className="text-gray-300 text-lg mb-6">
                  Nossa missão é oferecer a melhor experiência de compra, com produtos originais e atendimento personalizado. Cada cliente é único, e tratamos todos com a atenção que merecem.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="font-bold text-white">+5000</span> clientes satisfeitos
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="font-bold text-white">+1000</span> produtos vendidos
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Fique por dentro das novidades
                </h2>
                <p className="text-gray-400 text-lg mb-8">
                  Assine nossa newsletter e receba em primeira mão lançamentos, ofertas exclusivas e dicas de estilo.
                </p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                  <input
                    type="email"
                    placeholder="Seu melhor e-mail"
                    className="flex-grow px-6 py-4 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-red-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-red-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Assinar
                  </button>
                </form>
                <p className="text-gray-500 text-sm mt-4">
                  Ao assinar, você concorda em receber e-mails da UrbanStep. Você pode cancelar a qualquer momento.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}