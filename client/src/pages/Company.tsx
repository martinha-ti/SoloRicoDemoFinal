import PageHeader from "@/components/PageHeader";
import { CheckCircle, Target, Eye, Heart, Users, Award, Globe } from "lucide-react";

export default function Company() {
  return (
    <div>
      <PageHeader
        title="A Empresa"
        subtitle="Conheça nossa história, missão e valores que nos guiam há mais de 30 anos"
      />

      {/* About Section with Circular Images - Same as Home */}
      <section className="agriculture-section">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Imagens Redondas (Esquerda) */}
            <div className="text-center lg:text-left">
              <div className="image-container">
                <img 
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop" 
                  alt="Solo Rico Facility" 
                  className="main-image w-full rounded-full"
                />
                <img 
                  src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop" 
                  alt="Plant Detail" 
                  className="small-image rounded-full"
                />
              </div>
            </div>

            {/* Texto (Direita) */}
            <div>
              <h4 className="section-title">Solo Rico</h4>
              <h2 className="section-heading">Nossa História</h2>
              <p className="section-subtitle">
                Fundada em 1989, a Solo Rico Agrociências nasceu com o propósito de <span className="highlight">revolucionar o agronegócio brasileiro.</span>
              </p>
              <p className="section-description">
                Começamos como uma pequena empresa familiar em São José do Rio Preto, interior de São Paulo, com a visão de que o campo brasileiro tinha potencial para muito mais. Ao longo de mais de três décadas, crescemos e nos expandimos, mas nunca perdemos nosso compromisso com o pequeno e médio produtor rural.
              </p>
              <div className="icons-list">
                <div className="icon-item">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Mais de 30 anos de experiência</span>
                </div>
                <div className="icon-item">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Presença nacional</span>
                </div>
                <div className="icon-item">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Foco no pequeno e médio produtor</span>
                </div>
                <div className="icon-item">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Inovação constante</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-green mb-4">
              Missão, Visão e Valores
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Nossos princípios fundamentais que orientam todas as nossas decisões e ações
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-brand-green mb-4">Missão</h3>
              <p className="text-gray-600 leading-relaxed">
                Fornecer soluções inovadoras e sustentáveis para o agronegócio, apoiando o produtor rural 
                no desenvolvimento de uma agricultura mais produtiva e responsável.
              </p>
            </div>
            
            <div className="text-center p-8 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-brand-green mb-4">Visão</h3>
              <p className="text-gray-600 leading-relaxed">
                Ser reconhecida como a principal parceira do produtor rural brasileiro, expandindo nossa 
                presença no mercado internacional e promovendo o desenvolvimento sustentável do agronegócio.
              </p>
            </div>
            
            <div className="text-center p-8 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-brand-green mb-4">Valores</h3>
              <p className="text-gray-600 leading-relaxed">
                Comprometimento com a qualidade, sustentabilidade, inovação, ética e transparência em 
                todas as nossas relações comerciais e sociais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Numbers Section */}
      <section className="py-20 bg-brand-green text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Solo Rico em Números
            </h2>
            <p className="text-green-100 max-w-3xl mx-auto">
              Números que comprovam nosso compromisso com o agronegócio brasileiro
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-gray-800" />
              </div>
              <h3 className="text-3xl font-bold mb-2">30+</h3>
              <p className="text-green-100">Anos de Experiência</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-gray-800" />
              </div>
              <h3 className="text-3xl font-bold mb-2">27</h3>
              <p className="text-green-100">Estados Atendidos</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-gray-800" />
              </div>
              <h3 className="text-3xl font-bold mb-2">5</h3>
              <p className="text-green-100">Linhas de Produtos</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-gray-800" />
              </div>
              <h3 className="text-3xl font-bold mb-2">1000+</h3>
              <p className="text-green-100">Produtores Atendidos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-green mb-4">
              Nosso Compromisso
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Trabalhamos incansavelmente para oferecer as melhores soluções para o campo brasileiro
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-brand-green mb-4">Sustentabilidade</h3>
              <p className="text-gray-600 leading-relaxed">
                Desenvolvemos produtos e práticas que respeitam o meio ambiente e promovem a 
                sustentabilidade do agronegócio, garantindo um futuro melhor para as próximas gerações.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-brand-green mb-4">Inovação</h3>
              <p className="text-gray-600 leading-relaxed">
                Investimos constantemente em pesquisa e desenvolvimento para oferecer produtos 
                inovadores que atendam às necessidades específicas de cada cultura e região.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-brand-green mb-4">Qualidade</h3>
              <p className="text-gray-600 leading-relaxed">
                Todos os nossos produtos passam por rigorosos controles de qualidade, garantindo 
                eficácia e segurança em todas as aplicações.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-brand-green mb-4">Suporte Técnico</h3>
              <p className="text-gray-600 leading-relaxed">
                Oferecemos suporte técnico especializado para ajudar os produtores a obter os 
                melhores resultados com nossos produtos.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
