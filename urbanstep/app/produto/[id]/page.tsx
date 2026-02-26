import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { produtos } from '../../data/produtos';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Metadata } from 'next';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const produto = produtos.find(p => p.id === parseInt(params.id));
  return {
    title: produto ? `${produto.nome} | UrbanStep` : 'Produto não encontrado',
  };
}

export default function ProdutoPage({ params }: PageProps) {
  const id = parseInt(params.id);
  const produto = produtos.find(p => p.id === id);

  if (!produto) {
    notFound();
  }

  // Função para gerar mensagem do WhatsApp
  const whatsappMessage = `Olá! Tenho interesse no ${produto.nome} (R$ ${produto.preco.toFixed(2)}). Poderia me passar mais informações?`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-red-600">Home</Link> / 
            <Link href={`/categoria/${produto.categoria.toLowerCase()}`} className="hover:text-red-600"> {produto.categoria}</Link> / 
            <span className="text-gray-700"> {produto.nome}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Imagem */}
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={produto.imagem}
                alt={produto.nome}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Detalhes */}
            <div className="flex flex-col">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{produto.nome}</h1>
              <p className="text-gray-500 mb-4">Categoria: {produto.categoria}</p>
              <div className="text-3xl font-bold text-red-600 mb-6">
                R$ {produto.preco.toFixed(2)}
              </div>
              <p className="text-gray-700 text-lg mb-8">
                {produto.descricao || "Descrição não disponível para este produto. Entre em contato para mais informações."}
              </p>

              {/* Botão WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-full text-center transition transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.45-1.272.61-1.447c.109-.12.278-.145.373-.145.114 0 .229.001.343.005.116.004.264-.043.411.317.149.36.507 1.242.553 1.331.045.09.073.194.015.312-.058.118-.086.194-.172.298-.087.104-.183.23-.262.31-.087.087-.178.182-.076.358.101.176.449.741.964 1.201.662.592 1.221.776 1.394.86.173.084.274.07.374-.043.101-.113.433-.506.549-.68.116-.173.232-.145.391-.087.159.058 1.011.477 1.184.564.173.087.289.13.332.202.043.072.043.419-.101.824z"/>
                </svg>
                Comprar via WhatsApp
              </a>

              {/* Informações adicionais */}
              <div className="mt-8 border-t pt-6">
                <h3 className="font-semibold text-lg mb-2">Características</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Modelo: {produto.nome}</li>
                  <li>Categoria: {produto.categoria}</li>
                  <li>Material: Couro sintético e tecido</li>
                  <li>Origem: Original Nike</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}