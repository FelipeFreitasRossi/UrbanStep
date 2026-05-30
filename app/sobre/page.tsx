import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SobrePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero da página sobre */}
        <section className="relative h-64 md:h-96 bg-gray-900 text-white flex items-center justify-center">
          <div className="absolute inset-0 z-0 opacity-40">
            <Image
              src="https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Sobre a UrbanStep"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold">Sobre Nós</h1>
          </div>
        </section>

        {/* Conteúdo */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg mx-auto text-gray-700">
              <h2>UrbanStep: Paixão por tênis</h2>
              <p>
                A UrbanStep nasceu da paixão por tênis e sneakers. Somos uma loja especializada em modelos Nike, 
                desde os clássicos como Air Force 1 e Dunk até os lançamentos mais exclusivos.
              </p>
              <p>
                Nossa missão é oferecer produtos originais com a melhor experiência de compra, 
                seja para uso diário, esporte ou coleção. Cada cliente é único e merece um atendimento personalizado.
              </p>
              <h3>Nossos valores</h3>
              <ul>
                <li><strong>Autenticidade:</strong> Trabalhamos apenas com produtos originais.</li>
                <li><strong>Qualidade:</strong> Selecionamos os melhores modelos para você.</li>
                <li><strong>Atendimento:</strong> Estamos sempre prontos para ajudar.</li>
              </ul>
              <p>
                Seja bem-vindo à nossa loja e faça parte dessa comunidade que respira sneakers!
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}