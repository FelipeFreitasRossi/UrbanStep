// app/categoria/[nome]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { produtos } from '../../data/produtos';
import ProductCard from '../../components/ProductCard';

interface PageProps {
  params: Promise<{ nome: string }>;
}

export default async function CategoriaProdutosPage({ params }: PageProps) {
  const { nome } = await params;
  const nomeCategoria = decodeURIComponent(nome).replace(/-/g, ' ');

  const produtosFiltrados = produtos.filter(
    (p) => p.categoria.toLowerCase() === nomeCategoria.toLowerCase()
  );

  if (produtosFiltrados.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-red-600">Home</Link> / 
          <Link href="/categorias" className="hover:text-red-600"> Categorias</Link> / 
          <span className="text-gray-700"> {nomeCategoria}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
          {nomeCategoria}
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Confira todos os modelos disponíveis nesta categoria
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {produtosFiltrados.map((produto) => (
            <ProductCard key={produto.id} produto={produto} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}