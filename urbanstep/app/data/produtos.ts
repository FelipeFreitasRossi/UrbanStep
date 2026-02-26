// app/data/produtos.ts
export interface Produto {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  categoria: string;
  descricao?: string; // opcional para detalhes
}

export const produtos: Produto[] = [
  {
    id: 1,
    nome: "Nike Air Force 1 '07",
    preco: 599.99,
    imagem: "https://i.postimg.cc/xdf27KVb/Nike-Air-Force-1-07.png",
    categoria: "Air Force",
    descricao: "O tênis que nunca sai de moda. Conforto e estilo para o dia a dia."
  },
  {
    id: 2,
    nome: "Nike Dunk Low Retro",
    preco: 699.99,
    imagem: "https://i.postimg.cc/5y69r8vj/Dunk-Low-Retro.png",
    categoria: "Dunk",
    descricao: "Ícone do skate e das ruas, agora com design retrô."
  },
  {
    id: 3,
    nome: "Nike Travis Scott",
    preco: 499.99,
    imagem: "https://i.postimg.cc/TYSvdp5K/Tenis-Travis-Scott.png",
    categoria: "Travis Scott",
    descricao: "Edição limitada com detalhes exclusivos."
  },
  {
    id: 4,
    nome: "Nike Dunk High Retro",
    preco: 749.99,
    imagem: "https://i.postimg.cc/Jn3dWFNf/Nike-Dunk-High-Retro.png",
    categoria: "Dunk",
    descricao: "O clássico cano alto para um visual autêntico."
  },
  {
    id: 5,
    nome: "Nike Court Vision Low",
    preco: 399.99,
    imagem: "https://i.postimg.cc/XJDBXjkk/Nike-Court-Low-Vision.png",
    categoria: "Court",
    descricao: "Inspiração nos anos 80, modernizado para hoje."
  }
];