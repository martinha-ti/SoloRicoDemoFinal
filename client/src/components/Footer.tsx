import { Link } from "wouter";
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-gray-900 text-white">
      {/* Seção Principal com Logo e Descrição */}
      <div className="bg-gray-800 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="text-center mb-8">
            <div className="text-3xl font-bold text-white mb-2">Solo Rico</div>
            <div className="text-sm text-gray-400 tracking-wider">AGROCIÊNCIAS</div>
          </div>
          <p className="text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {t('footer_about_text')}
          </p>
        </div>
      </div>

      {/* Seção de Links */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Para Empresas */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">{t('for_businesses')}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/para-empresas" className="text-gray-300 hover:text-green-400 transition-colors">
                    {t('corporate_products')}
                  </Link>
                </li>
                <li>
                  <Link href="/para-empresas" className="text-gray-300 hover:text-green-400 transition-colors">
                    {t('smart_solutions')}
                  </Link>
                </li>
                <li>
                  <Link href="/para-empresas" className="text-gray-300 hover:text-green-400 transition-colors">
                    {t('success_cases')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Ajuda */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">{t('help')}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/sac" className="text-gray-300 hover:text-green-400 transition-colors">
                    {t('faq')}
                  </Link>
                </li>
                <li>
                  <Link href="/sac" className="text-gray-300 hover:text-green-400 transition-colors">
                    {t('support_center')}
                  </Link>
                </li>
                <li>
                  <Link href="/politica-de-privacidade" className="text-gray-300 hover:text-green-400 transition-colors">
                    {t('privacy_policy')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Atendimento */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">{t('footer_contact_info')}</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center text-gray-300">
                  <Phone className="w-4 h-4 mr-2 text-yellow-400" />
                  <a href="tel:+551732316000" className="hover:text-green-400 transition-colors">
                    (17) 3231-6000
                  </a>
                </li>
                <li className="flex items-center text-gray-300">
                  <Mail className="w-4 h-4 mr-2 text-yellow-400" />
                  <a href="mailto:sac@gruposolorico.com.br" className="hover:text-green-400 transition-colors">
                    sac@gruposolorico.com.br
                  </a>
                </li>
                <li className="flex items-start text-gray-300">
                  <MapPin className="w-4 h-4 mr-2 mt-1 text-yellow-400 flex-shrink-0" />
                  <span className="text-sm">
                    R. Roque de Campos Teixeira, 180 - Distrito Industrial<br />
                    São José do Rio Preto - SP, 15035-430, Brasil
                  </span>
                </li>
              </ul>
            </div>

            {/* Siga-nos */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Siga-nos</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seção Inferior com Grid de 3 Colunas */}
      <div className="border-t border-gray-700 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sobre a Solo Rico */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Sobre a Solo Rico</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/empresa" className="text-gray-300 hover:text-green-400 transition-colors">
                    Conheça + Solo Rico
                  </Link>
                </li>
                <li>
                  <Link href="/trabalhe-conosco" className="text-gray-300 hover:text-green-400 transition-colors">
                    Trabalhe conosco
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-300 hover:text-green-400 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/empresa" className="text-gray-300 hover:text-green-400 transition-colors">
                    Imprensa
                  </Link>
                </li>
                <li>
                  <a 
                    href="mailto:contato@solorico.com.br" 
                    className="text-gray-300 hover:text-green-400 transition-colors"
                  >
                    contato@solorico.com.br
                  </a>
                </li>
              </ul>
            </div>

            {/* Assuntos mais lidos */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Assuntos mais lidos</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/blog" className="text-gray-300 hover:text-green-400 transition-colors block">
                    Agronegócio Brasileiro: Descubra o que irá impulsionar o Crescimento em 2024...
                  </Link>
                  <p className="text-xs text-gray-500 mt-1">Junho 2024</p>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-300 hover:text-green-400 transition-colors block">
                    Tendências da Volatilidade dos Preços das Commodities Agrícolas em 2024...
                  </Link>
                  <p className="text-xs text-gray-500 mt-1">Maio 2024</p>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-300 hover:text-green-400 transition-colors block">
                    Novos Mercados: Abrindo Portas para Pequenos e Médios Produtores Brasileiros...
                  </Link>
                  <p className="text-xs text-gray-500 mt-1">Abril 2024</p>
                </li>
              </ul>
            </div>

            {/* Categorias */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Categorias</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/blog" className="text-gray-300 hover:text-green-400 transition-colors">
                    Solo
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-300 hover:text-green-400 transition-colors">
                    Tecnologia
                  </Link>
                </li>
                <li>
                  <Link href="/comex" className="text-gray-300 hover:text-green-400 transition-colors">
                    Comex
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-300 hover:text-green-400 transition-colors">
                    Mercados
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-300 hover:text-green-400 transition-colors">
                    Tendências
                  </Link>
                </li>
              </ul>
              
              <div className="mt-8">
                {/* Botão Provisório Admin */}
                <div className="mb-4">
                  <Link 
                    href="/admin" 
                    className="inline-block px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded transition-colors"
                  >
                    🔧 Painel Admin
                  </Link>
                </div>
                
                <p className="text-xs text-gray-400">© 2025 Solo Rico Agrociências</p>
                <p className="text-xs text-gray-500 mt-2">
                  CNPJ: 67.681.007/0001-97 | Endereço: R. Roque de Campos Teixeira, 180 - Distrito Industrial, São José do Rio Preto - SP, 15035-430
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Proibida a reprodução total ou parcial de conteúdos deste site.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seção Final */}
      <div className="border-t border-gray-700 py-6">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-gray-400">
            <p>SOLO RICO © 2025 Todos os direitos reservados | Desenvolvido por Martinha TI</p>
            <div className="mt-2 space-x-4">
              <Link href="/politica-de-privacidade" className="hover:text-green-400 transition-colors">
                Política de Privacidade
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="/politica-de-seguranca" className="hover:text-green-400 transition-colors">
                Política de Segurança
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}