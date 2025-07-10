import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Sobre a Solo Rico */}
          <div>
            <h3 className="text-lg font-bold mb-4">Sobre a Solo Rico</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-green-400 transition-colors">
                  Conheça a Solo Rico
                </Link>
              </li>
              <li>
                <Link href="/trabalhe-conosco" className="hover:text-green-400 transition-colors">
                  Trabalhe conosco
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-green-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/empresa" className="hover:text-green-400 transition-colors">
                  Imprensa
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:contato@solorico.com.br" 
                  className="hover:text-green-400 transition-colors"
                >
                  contato@solorico.com.br
                </a>
              </li>
            </ul>
          </div>

          {/* Assuntos mais lidos */}
          <div>
            <h3 className="text-lg font-bold mb-4">Assuntos mais lidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="hover:text-green-400 transition-colors">
                  Agronegócio Brasileiro: Descubra o que irá impulsionar o Crescimento em 2024...
                </Link>
                <p className="text-xs text-gray-400 mt-1">Junho 2024</p>
              </li>
              <li>
                <Link href="/blog" className="hover:text-green-400 transition-colors">
                  Tendências da Volatilidade dos Preços das Commodities Agrícolas em 2024...
                </Link>
                <p className="text-xs text-gray-400 mt-1">Maio 2024</p>
              </li>
              <li>
                <Link href="/blog" className="hover:text-green-400 transition-colors">
                  Novos Mercados: Abrindo Portas para Pequenos e Médios Produtores Brasileiros...
                </Link>
                <p className="text-xs text-gray-400 mt-1">Abril 2024</p>
              </li>
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="text-lg font-bold mb-4">Categorias</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="hover:text-green-400 transition-colors">
                  Solo
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-green-400 transition-colors">
                  Tecnologia
                </Link>
              </li>
              <li>
                <Link href="/comex" className="hover:text-green-400 transition-colors">
                  Comex
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-green-400 transition-colors">
                  Mercados
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-green-400 transition-colors">
                  Tendências
                </Link>
              </li>
            </ul>
          </div>

          {/* Informações da Empresa */}
          <div>
            <div className="text-center mb-6">
              <div className="text-xl font-bold">Solo Rico</div>
              <div className="text-xs text-gray-400">AGROCIÊNCIAS</div>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              A Solo Rico Agrociências é uma empresa 100% brasileira, com sede em São José do Rio Preto, considerada
              uma das maiores produtoras de fertilizantes do Brasil. Atua em todos os Estados e no Distrito Federal.
              Atendimento de segunda a sexta-feira, das 09h às 18h (exceto feriados).
            </p>
            <div className="text-sm text-gray-300 mb-4">
              <p>© 2025 Solo Rico Agrociências</p>
              <p>CNPJ: 67.681.007/0001-97 | Endereço: R. Roque de Campos Teixeira, 180 - Distrito Industrial, São José do Rio Preto - SP, 15035-430</p>
              <p>Proibida a reprodução total ou parcial de conteúdos deste site.</p>
            </div>
          </div>
        </div>

        {/* Seção Empresa */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Para Empresas */}
            <div>
              <h3 className="text-lg font-bold mb-4">Para Empresas</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/para-empresas" className="hover:text-green-400 transition-colors">
                    Produtos Corporativos
                  </Link>
                </li>
                <li>
                  <Link href="/para-empresas" className="hover:text-green-400 transition-colors">
                    Soluções Inteligentes
                  </Link>
                </li>
                <li>
                  <Link href="/para-empresas" className="hover:text-green-400 transition-colors">
                    Cases de Sucesso
                  </Link>
                </li>
              </ul>
            </div>

            {/* Ajuda */}
            <div>
              <h3 className="text-lg font-bold mb-4">Ajuda</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/sac" className="hover:text-green-400 transition-colors">
                    Perguntas Frequentes
                  </Link>
                </li>
                <li>
                  <Link href="/sac" className="hover:text-green-400 transition-colors">
                    Central de Atendimento
                  </Link>
                </li>
                <li>
                  <Link href="/politica-de-privacidade" className="hover:text-green-400 transition-colors">
                    Política de Privacidade
                  </Link>
                </li>
              </ul>
            </div>

            {/* Atendimento */}
            <div>
              <h3 className="text-lg font-bold mb-4">Atendimento</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="mr-2">📞</span>
                  <a href="tel:+551732316000" className="hover:text-green-400 transition-colors">
                    (17) 3231-6000
                  </a>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">📧</span>
                  <a href="mailto:sac@gruposolorico.com.br" className="hover:text-green-400 transition-colors">
                    sac@gruposolorico.com.br
                  </a>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">📍</span>
                  <span>
                    R. Roque de Campos Teixeira, 180 - Distrito Industrial
                    <br />
                    São José do Rio Preto - SP, 15035-430, Brasil
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Seção Siga-nos */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-bold mb-2">Siga-nos</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-green-400 transition-colors">
                  <span className="text-2xl">📘</span>
                </a>
                <a href="#" className="hover:text-green-400 transition-colors">
                  <span className="text-2xl">📷</span>
                </a>
                <a href="#" className="hover:text-green-400 transition-colors">
                  <span className="text-2xl">💼</span>
                </a>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400">
                SOLO RICO © 2025 Todos os direitos reservados | Desenvolvido por Martinha TI
              </p>
              <div className="mt-2 space-x-4 text-sm">
                <Link href="/politica-de-privacidade" className="hover:text-green-400 transition-colors">
                  Política de Privacidade
                </Link>
                <span className="text-gray-500">|</span>
                <Link href="/politica-de-seguranca" className="hover:text-green-400 transition-colors">
                  Política de Segurança
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}