'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Produto } from '../data/produtos';
import { motion } from 'framer-motion';

interface ProductCardProps {
  produto: Produto;
}

export default function ProductCard({ produto }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col relative group"
    >
      {/* Selo Nike */}
      <div className="absolute top-2 left-2 z-10 bg-black text-white text-xs font-bold px-2 py-1 rounded">
        NIKE
      </div>
      {/* Imagem com zoom no hover */}
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
        <p className="text-gray-700 font-semibold mt-2 text-lg">
          R$ {produto.preco.toFixed(2)}
        </p>
        <Link href={`/produto/${produto.id}`}>
          <button className="mt-4 w-full bg-red-600 text-white py-2 rounded-full hover:bg-red-700 transition font-medium">
            Ver detalhes
          </button>
        </Link>
      </div>
    </motion.div>
  );
}