import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { produtos } from '../../data/produtos';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const produto = produtos.find(p => p.id === parseInt(id));
  return {
    title: produto ? `${produto.nome} | UrbanStep` : 'Produto não encontrado',
  };
}

export default async function ProdutoPage({ params }: PageProps) {
  const { id } = await params;
  const produtoId = parseInt(id);
  const produto = produtos.find(p => p.id === produtoId);

  if (!produto) notFound();

  const whatsappMessage = `Olá! Tenho interesse no ${produto.nome} (R$ ${produto.preco.toFixed(2)}).`;
  const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-red-600">Home</Link> / 
            <Link href={`/categoria/${produto.categoria.toLowerCase()}`} className="hover:text-red-600"> {produto.categoria}</Link> / 
            <span className="text-gray-700"> {produto.nome}</span>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image src={produto.imagem} alt={produto.nome} fill className="object-cover" priority />
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{produto.nome}</h1>
              <p className="text-gray-500 mb-4">Categoria: {produto.categoria}</p>
              <div className="text-3xl font-bold text-red-600 mb-6">R$ {produto.preco.toFixed(2)}</div>
              <p className="text-gray-700 text-lg mb-8">{produto.descricao || "Descrição não disponível"}</p>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-full text-center transition">
                Comprar via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}