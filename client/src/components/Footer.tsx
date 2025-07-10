import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container mx-auto px-4">
        {/* Logo and Description */}
        <div className="text-center mb-8">
          <img 
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=150&h=75&fit=crop" 
            alt="Solo Rico Logo" 
            className="footer-logo mx-auto"
          />
          <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A Solo Rico Agrociências é uma empresa 100% brasileira, com sede em São José do Rio Preto,
            considerada uma das maiores produtoras de fertilizantes do Brasil. Atualmente, opera em todos os
            Estados e no Distrito Federal.
            <br />
            <br />
            Atendimento aos clientes, colaboradores e empresas de segunda à sexta-feira das 09h às 18h
            (exceto feriados).
          </p>
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Blog Posts */}
          <div>
            <h3>Assuntos mais lidos</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/blog" className="hover:text-brand-green">
                  Agronegócio Brasileiro: Descubra o que irá Impulsionar o Crescimento em 2024...
                </Link>
                <span className="block text-gray-500 text-xs mt-1">Jul, 2024</span>
              </li>
              <li>
                <Link href="/blog" className="hover:text-brand-green">
                  Tendências da Volatilidade dos Preços das Commodities Agrícolas em 2024...
                </Link>
                <span className="block text-gray-500 text-xs mt-1">Jan, 2025</span>
              </li>
              <li>
                <Link href="/blog" className="hover:text-brand-green">
                  Novos Mercados: Abrindo Portas para Pequenos e Médios Produtores Brasileiros...
                </Link>
                <span className="block text-gray-500 text-xs mt-1">Jan, 2025</span>
              </li>
            </ul>
          </div>

          {/* Menu */}
          <div>
            <h3>Menu</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/">HOME</Link></li>
              <li><Link href="/empresa">A EMPRESA</Link></li>
              <li><Link href="/para-empresas">PARA EMPRESAS</Link></li>
              <li><Link href="/para-voce">PARA VOCÊ</Link></li>
              <li><Link href="/comex">COMEX</Link></li>
              <li><Link href="/contatos">CONTATOS</Link></li>
              <li><Link href="#">LOJA</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h3>Atendimento</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-brand-yellow" />
                <a href="https://wa.me/551732316000" target="_blank" rel="noopener noreferrer">
                  (17) 3231-6000
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-brand-yellow" />
                <a href="mailto:sac@gruposolorico.com.br">sac@gruposolorico.com.br</a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-4 w-4 mr-3 text-brand-yellow mt-1" />
                <span>
                  R. Roque de Campos Teixeira, 180 - Distrito Industrial<br />
                  São José do Rio Preto - SP, 15035-430, Brasil
                </span>
              </li>
            </ul>

            {/* Contact Form */}
            <form className="mt-6 flex">
              <input
                type="text"
                placeholder="Dúvidas?"
                className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
              <button
                type="submit"
                className="bg-brand-green text-white px-4 py-2 rounded-r-md hover:bg-brand-green-dark transition-colors"
              >
                <Mail className="h-4 w-4" />
              </button>
            </form>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-6">
              <a
                href="https://www.instagram.com/soloricoagrociencias"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-green transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.facebook.com/soloricoagrociencias"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-green transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/company/soloricoagrociencias"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-green transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>SOLO RICO ® 2025 Todos os direitos reservados | Desenvolvimento Martinha TI</p>
          <div className="mt-2">
            <a href="https://wa.me/551732316000" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green">
              Política e Privacidade
            </a>
            {" | "}
            <Link href="/sac" className="hover:text-brand-green">
              Central de Atendimento
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
