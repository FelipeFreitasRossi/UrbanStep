import Link from 'next/link';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa6';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">UrbanStep</h2>
            <p className="text-gray-400 text-sm">
              Seus pés merecem o melhor. Tênis para todos os estilos e ocasiões.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link href="#sobre" className="text-gray-400 hover:text-white transition">Sobre</Link></li>
              <li><Link href="#produtos" className="text-gray-400 hover:text-white transition">Produtos</Link></li>
              <li><Link href="#contato" className="text-gray-400 hover:text-white transition">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <p className="text-gray-400">felipedev@gmail.com</p>
            <p className="text-gray-400">(16) 99616-7381</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Siga-nos</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition"><FaInstagram size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><FaLinkedinIn size={24} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-400 text-sm">
          &copy; {currentYear} UrbanStep. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;