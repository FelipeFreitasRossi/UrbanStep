'use client';

import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function HomePage() {
  const { user, logout, deleteAccount } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl mb-4">Bem-vindo, {user}!</h1>
        <p>Aqui será o catálogo de tênis.</p>
        {/* Botão de deletar conta (opcional) */}
        <button
          onClick={async () => {
            if (confirm('Tem certeza?')) {
              await deleteAccount();
              router.push('/');
            }
          }}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
        >
          Deletar conta
        </button>
        <button onClick={logout} className="mt-4 ml-2 bg-gray-600 text-white px-4 py-2 rounded">
          Sair
        </button>
      </main>
      <Footer />
    </div>
  );
}