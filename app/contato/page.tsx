// app/contato/page.tsx
'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: '',
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => setEnviado(false), 4000);
    setFormData({ nome: '', email: '', mensagem: '' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow pt-20">
        {/* Título da página - sem faixa escura, apenas texto centralizado */}
        <div className="container mx-auto px-4 py-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          >
            Contato
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Tire suas dúvidas ou envie sugestões
          </motion.p>
        </div>

        {/* Conteúdo principal com fundo branco e cards brancos */}
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Formulário */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Envie uma mensagem</h2>
              {enviado && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
                  Mensagem enviada com sucesso!
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">Nome</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Mensagem</label>
                  <textarea
                    name="mensagem"
                    rows={5}
                    value={formData.mensagem}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <FiSend /> Enviar
                </button>
              </form>
            </motion.div>

            {/* Informações de contato */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-6"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Informações</h2>
              <div className="flex items-start gap-3">
                <FiMail className="text-red-500 mt-1" size={20} />
                <div className="text-gray-700">
                  <p>contato@urbanstep.com</p>
                  <p>vendas@urbanstep.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiPhone className="text-red-500 mt-1" size={20} />
                <div className="text-gray-700">
                  <p>(16) 99616-7381</p>
                  <p>(11) 3333-4444</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiMapPin className="text-red-500 mt-1" size={20} />
                <p className="text-gray-700">Av. Paulista, 1000 - São Paulo, SP</p>
              </div>
              <div className="pt-4">
                <a
                  href="https://wa.me/5516996167381"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-green-600 hover:bg-green-700 text-white text-center font-semibold py-3 rounded-lg transition"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}