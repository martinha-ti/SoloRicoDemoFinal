import PageHeader from "@/components/PageHeader";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Building2, Users, TrendingUp, Award, CheckCircle, Globe } from "lucide-react";

export default function ForBusinesses() {
  const { data: products = [] } = useQuery({
    queryKey: ['/api/products'],
    queryFn: () => api.getProducts(),
  });

  return (
    <div>
      <PageHeader
        title="Para Empresas"
        subtitle="Soluções completas para o agronegócio empresarial"
      />

      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-green mb-4">
              Parceiro Estratégico do Seu Negócio
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Há mais de 30 anos, a Solo Rico oferece soluções completas para empresas do agronegócio, 
              combinando qualidade, inovação e suporte técnico especializado.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-brand-green mb-2">Empresas</h3>
              <p className="text-gray-600">Parcerias estratégicas para crescimento</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-brand-green mb-2">Cooperativas</h3>
              <p className="text-gray-600">Soluções para cooperativas agrícolas</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-brand-green mb-2">Distribuidores</h3>
              <p className="text-gray-600">Rede de distribuição qualificada</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-brand-green mb-2">Consultoria</h3>
              <p className="text-gray-600">Consultoria técnica especializada</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-green mb-4">
              Nossos Produtos
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Linhas completas de fertilizantes e adjuvantes para maximizar a produtividade
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.imageUrl || 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=200&fit=crop'} 
                    alt={product.name} 
                    className="w-full h-48 object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-brand-green">{product.name}</CardTitle>
                  <p className="text-sm text-brand-yellow font-medium">{product.category}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="space-y-2 mb-4">
                    {product.benefits.slice(0, 3).map((benefit, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-brand-green mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <Button asChild className="w-full">
                    <Link href={`/produto/${product.slug}`}>Ver Detalhes</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-green mb-4">
              Serviços Especializados
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Oferecemos uma gama completa de serviços para atender às necessidades específicas do seu negócio
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-brand-green mb-4">Consultoria Técnica</h3>
              <p className="text-gray-600 mb-4">
                Nossa equipe de agrônomos especializados oferece consultoria técnica completa, desde a 
                análise de solo até o acompanhamento de aplicações e resultados.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                  <span className="text-sm text-gray-600">Análise de necessidades nutricionais</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                  <span className="text-sm text-gray-600">Planejamento de adubação</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                  <span className="text-sm text-gray-600">Acompanhamento de resultados</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-brand-green mb-4">Treinamento e Capacitação</h3>
              <p className="text-gray-600 mb-4">
                Oferecemos programas de treinamento e capacitação para equipes técnicas, garantindo 
                a aplicação correta dos produtos e maximização dos resultados.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                  <span className="text-sm text-gray-600">Cursos presenciais e online</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                  <span className="text-sm text-gray-600">Material didático especializado</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                  <span className="text-sm text-gray-600">Certificação técnica</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-brand-green mb-4">Suporte Logístico</h3>
              <p className="text-gray-600 mb-4">
                Estrutura logística completa para garantir entregas pontuais e eficientes em todo o território nacional.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                  <span className="text-sm text-gray-600">Entrega em todo o Brasil</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                  <span className="text-sm text-gray-600">Rastreamento de pedidos</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                  <span className="text-sm text-gray-600">Prazos flexíveis</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-brand-green mb-4">Desenvolvimento Customizado</h3>
              <p className="text-gray-600 mb-4">
                Desenvolvemos soluções customizadas para atender necessidades específicas de diferentes culturas e regiões.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                  <span className="text-sm text-gray-600">Formulações específicas</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                  <span className="text-sm text-gray-600">Pesquisa e desenvolvimento</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                  <span className="text-sm text-gray-600">Testes de campo</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para Fazer Parte da Nossa Rede?
          </h2>
          <p className="text-green-100 max-w-3xl mx-auto mb-8 text-lg">
            Entre em contato conosco e descubra como podemos ajudar sua empresa a crescer no agronegócio
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-brand-green">
              <Link href="/contatos">Fale Conosco</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-brand-green">
              <a href="https://wa.me/551732316000" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
