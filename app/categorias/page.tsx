// app/categorias/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { produtos } from '../data/produtos';

// Extrai categorias únicas
const categorias = [...new Set(produtos.map(p => p.categoria))];

// Mapeia uma imagem de exemplo para cada categoria (opcional)
const categoriaImagem: Record<string, string> = {
  'Air Force': 'https://i.postimg.cc/Y0DNKc94/CAPA-AIR-FORCE.png',
  'Dunk': 'https://i.postimg.cc/pLS29s9Y/CAPA-DUNK.png',
  'Court': 'https://i.postimg.cc/L55CZ3gj/CAPA-COURTO-LOW-VISION.png',
  'Travis Scott': 'https://i.postimg.cc/TYSvdp5K/Tenis-Travis-Scott.png',
};

export default function CategoriasPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Adicionado pt-24 para dar espaçamento abaixo do header fixo */}
      <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Nossas Categorias
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categorias.map((cat) => (
            <Link
              key={cat}
              href={`/categoria/${cat.toLowerCase().replace(/\s+/g, '-')}`}
              className="group relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition"
            >
              <Image
                src={categoriaImagem[cat] || 'https://i.postimg.cc/Y0DNKc94/CAPA-AIR-FORCE.png'}
                alt={cat}
                fill
                className="object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition flex items-end justify-start p-6">
                <h2 className="text-white text-3xl font-bold">{cat}</h2>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}