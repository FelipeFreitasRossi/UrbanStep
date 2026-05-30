'use client';

import { useState } from 'react';
import { Produto } from '../data/produtos';

interface FiltersProps {
  produtos: Produto[];
  onFilter: (filtered: Produto[]) => void;
}

export default function ProductFilters({ produtos, onFilter }: FiltersProps) {
  const [search, setSearch] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precoMax, setPrecoMax] = useState<number>(1000);

  const categorias = [...new Set(produtos.map(p => p.categoria))];

  const handleFilter = () => {
    let filtered = [...produtos];
    if (search) {
      filtered = filtered.filter(p => p.nome.toLowerCase().includes(search.toLowerCase()));
    }
    if (categoria) {
      filtered = filtered.filter(p => p.categoria === categoria);
    }
    filtered = filtered.filter(p => p.preco <= precoMax);
    onFilter(filtered);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md space-y-4">
      <input
        type="text"
        placeholder="Buscar tênis..."
        value={search}
        onChange={(e) => { setSearch(e.target.value); handleFilter(); }}
        className="w-full p-2 border rounded-lg"
      />
      <select
        value={categoria}
        onChange={(e) => { setCategoria(e.target.value); handleFilter(); }}
        className="w-full p-2 border rounded-lg"
      >
        <option value="">Todas categorias</option>
        {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>
      <div>
        <label>Preço máximo: R$ {precoMax}</label>
        <input
          type="range"
          min={0}
          max={1000}
          step={50}
          value={precoMax}
          onChange={(e) => { setPrecoMax(Number(e.target.value)); handleFilter(); }}
          className="w-full"
        />
      </div>
    </div>
  );
}