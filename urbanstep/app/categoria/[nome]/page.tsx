import { notFound } from 'next/navigation';
import { produtos } from '../../data/produtos';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';

interface PageProps {
  params: Promise<{ nome: string }>;
}

export default async function CategoriaPage({ params }: PageProps) {
  const { nome } = await params;
  const nomeCategoria = decodeURIComponent(nome).replace(/-/g, ' ');
  const produtosFiltrados = produtos.filter(
    p => p.categoria.toLowerCase() === nomeCategoria.toLowerCase()
  );
  if (produtosFiltrados.length === 0) notFound();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">{nomeCategoria}</h1>
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