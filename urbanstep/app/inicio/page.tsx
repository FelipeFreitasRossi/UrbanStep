// app/inicio/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image3DViewer from '../components/Image3DViewer';
import ProductModal from '../components/ProductModal';

// Produtos Nike (adicionando descrição opcional)
const produtos = [
  {
    id: 1,
    nome: "Nike Air Force 1 '07",
    preco: 599.99,
    imagem: "https://i.postimg.cc/xdf27KVb/Nike-Air-Force-1-07.png",
    categoria: "Air Force",
    descricao: "Clássico imortal, conforto e estilo em um só tênis. Perfeito para o dia a dia."
  },
  {
    id: 2,
    nome: "Nike Dunk Low Retro",
    preco: 699.99,
    imagem: "https://i.postimg.cc/5y69r8vj/Dunk-Low-Retro.png",
    categoria: "Dunk",
    descricao: "O modelo mais icônico do skate agora em versão retrô. Design único."
  },
  {
    id: 3,
    nome: "Nike Travis Scott",
    preco: 499.99,
    imagem: "https://i.postimg.cc/TYSvdp5K/Tenis-Travis-Scott.png",
    categoria: "Travis Scott",
    descricao: "Colaboração exclusiva, detalhes que fazem a diferença."
  },
  {
    id: 4,
    nome: "Nike Dunk High Retro",
    preco: 749.99,
    imagem: "https://i.postimg.cc/Jn3dWFNf/Nike-Dunk-High-Retro.png",
    categoria: "Dunk",
    descricao: "Cano alto, visual agressivo e autêntico."
  },
  {
    id: 5,
    nome: "Nike Court Vision Low",
    preco: 399.99,
    imagem: "https://i.postimg.cc/XJDBXjkk/Nike-Court-Low-Vision.png",
    categoria: "Court",
    descricao: "Inspirado nos anos 80, moderno e acessível."
  },
];

const AnimatedSection = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function InicioPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para adicionar ao carrinho
  const addToCart = (produto: any) => {
    const existingCart = JSON.parse(localStorage.getItem('urbanstep-cart') || '[]');
    const existingIndex = existingCart.findIndex((i: any) => i.id === produto.id);
    if (existingIndex >= 0) {
      existingCart[existingIndex].quantidade += 1;
    } else {
      existingCart.push({ ...produto, quantidade: 1 });
    }
    localStorage.setItem('urbanstep-cart', JSON.stringify(existingCart));
    window.dispatchEvent(new Event('storage'));
  };

  const openModal = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const categorias = ['Todos', ...new Set(produtos.map(p => p.categoria))];

  const filtered = produtos.filter(p => {
    const matchName = p.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory === 'Todos' || p.categoria === selectedCategory;
    const matchPrice = p.preco >= priceRange.min && p.preco <= priceRange.max;
    return matchName && matchCat && matchPrice;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
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

        {/* Destaques com busca e filtros */}
        <section id="destaques" className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Destaques Nike</h2>
              <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">Os modelos casuais mais icônicos</p>
            </AnimatedSection>

            {/* Busca */}
            <div className="max-w-md mx-auto mb-8">
              <input
                type="text"
                placeholder="Buscar tênis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Filtros de categoria */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categorias.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full transition ${selectedCategory === cat ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Filtro de preço */}
            <div className="flex justify-center gap-4 mb-12 text-sm">
              <div>
                <label className="block text-gray-600">Mínimo (R$)</label>
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                  className="w-24 border rounded px-2 py-1"
                />
              </div>
              <div>
                <label className="block text-gray-600">Máximo (R$)</label>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                  className="w-24 border rounded px-2 py-1"
                />
              </div>
            </div>

            {/* Grid de produtos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(produto => (
                <AnimatedSection key={produto.id} className="h-full">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col relative group hover:shadow-xl transition">
                    <div className="absolute top-2 left-2 z-10 bg-black text-white text-xs font-bold px-2 py-1 rounded">NIKE</div>
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={produto.imagem}
                        alt={produto.nome}
                        fill
                        className="object-cover group-hover:scale-110 transition duration-500"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <span className="text-sm text-gray-500">{produto.categoria}</span>
                      <h3 className="font-bold text-xl mt-1">{produto.nome}</h3>
                      <p className="text-gray-700 font-semibold mt-2 text-lg">R$ {produto.preco.toFixed(2)}</p>
                      <button
                        onClick={() => addToCart(produto)}
                        className="mt-4 w-full bg-red-600 text-white py-2 rounded-full hover:bg-red-700 transition font-medium"
                      >
                        Adicionar ao carrinho
                      </button>
                      <button
                        onClick={() => openModal(produto)}
                        className="mt-2 w-full bg-gray-800 text-white py-2 rounded-full hover:bg-gray-900 transition font-medium"
                      >
                        Ver detalhes
                      </button>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Seção 3D */}
        <section className="py-20 bg-gradient-to-r from-black to-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <AnimatedSection className="text-white">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Explore o novo <span className="text-red-500">Nike Air Max</span> em 3D</h2>
                <p className="text-gray-300 text-lg mb-6">Gire, aproxime e veja cada detalhe.</p>
                <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full transition">Comprar agora</button>
              </AnimatedSection>
              <AnimatedSection>
                <Image3DViewer imageUrl="https://i.postimg.cc/6QrwLj6V/Gemini-Generated-Image-olrn8rolrn8rolrn.png" bgColor="#000000" />
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Lançamentos */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Lançamentos Exclusivos</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {produtos.slice(2,4).map(p => (
                <div key={p.id} className="bg-gray-800 rounded-2xl overflow-hidden flex flex-col md:flex-row">
                  <div className="relative h-64 md:w-1/2">
                    <Image src={p.imagem} alt={p.nome} fill className="object-cover" />
                  </div>
                  <div className="p-6 md:w-1/2">
                    <span className="text-gray-400">{p.categoria}</span>
                    <h3 className="font-bold text-2xl">{p.nome}</h3>
                    <p className="text-white font-bold text-xl mt-4">R$ {p.preco.toFixed(2)}</p>
                    <button onClick={() => addToCart(p)} className="mt-4 bg-red-600 py-2 px-6 rounded-full">Adicionar</button>
                    <button onClick={() => openModal(p)} className="mt-2 ml-2 bg-gray-700 py-2 px-6 rounded-full">Detalhes</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categorias */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Estilos Casuais</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {['Air Force','Dunk','Court'].map((cat,i)=> (
                <div key={i} className="relative h-80 rounded-2xl overflow-hidden">
                  <Image
                    src={i===0?'https://i.postimg.cc/Y0DNKc94/CAPA-AIR-FORCE.png':i===1?'https://i.postimg.cc/pLS29s9Y/CAPA-DUNK.png':'https://i.postimg.cc/L55CZ3gj/CAPA-COURTO-LOW-VISION.png'}
                    alt={cat}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-end p-6">
                    <h3 className="text-white text-2xl font-bold">{cat}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sobre */}
        <section className="py-20 bg-gray-900 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">Por que escolher a UrbanStep?</h2>
            <p className="max-w-2xl mx-auto">Somos especialistas em Nike. Conforto, estilo e autenticidade.</p>
          </div>
        </section>
      </main>

      <Footer />

      {/* Botão flutuante WhatsApp */}
      <a
        href="https://wa.me/5516996167381"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition z-40"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.45-1.272.61-1.447c.109-.12.278-.145.373-.145.114 0 .229.001.343.005.116.004.264-.043.411.317.149.36.507 1.242.553 1.331.045.09.073.194.015.312-.058.118-.086.194-.172.298-.087.104-.183.23-.262.31-.087.087-.178.182-.076.358.101.176.449.741.964 1.201.662.592 1.221.776 1.394.86.173.084.274.07.374-.043.101-.113.433-.506.549-.68.116-.173.232-.145.391-.087.159.058 1.011.477 1.184.564.173.087.289.13.332.202.043.072.043.419-.101.824z"/>
        </svg>
      </a>

      {/* Modal do produto */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
        onAddToCart={addToCart}
      />
    </div>
  );
}