import PageHeader from "@/components/PageHeader";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { User, Home, Sprout, Heart, CheckCircle, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ForYou() {
  const { t } = useLanguage();
  const { data: products = [] } = useQuery({
    queryKey: ['/api/products'],
    queryFn: () => api.getProducts(),
  });

  return (
    <div>
      <PageHeader
        title={t("for_you_title")}
        subtitle={t("for_you_subtitle")}
      />

      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-green mb-4">
              {t("for_you_hero_title")}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              {t("for_you_hero_description")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-brand-green mb-2">Pequenos Produtores</h3>
              <p className="text-gray-600">Soluções para propriedades de até 10 hectares</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-brand-green mb-2">Hortas Domésticas</h3>
              <p className="text-gray-600">Produtos seguros para uso doméstico</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Sprout className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-brand-green mb-2">Jardins</h3>
              <p className="text-gray-600">Cuidado especial para plantas ornamentais</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-brand-green mb-2">Orgânicos</h3>
              <p className="text-gray-600">Linha especial para cultivo orgânico</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-green mb-4">
              Produtos Ideais para Você
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Embalagens menores, instruções claras e resultados profissionais
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
                  <div className="absolute top-4 right-4 bg-brand-yellow text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Para Você
                  </div>
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

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-green mb-4">
              Por que Escolher Solo Rico?
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Mais de 30 anos de experiência adaptados às suas necessidades
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-brand-green mb-4">Embalagens Adequadas</h3>
              <p className="text-gray-600 mb-4">
                Oferecemos embalagens menores e mais práticas, ideais para pequenos cultivos e uso doméstico.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                  <span className="text-sm text-gray-600">Embalagens de 500g, 1kg e 5kg</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                  <span className="text-sm text-gray-600">Fácil manuseio e armazenamento</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                  <span className="text-sm text-gray-600">Instruções claras de uso</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-brand-green mb-4">Suporte Técnico</h3>
              <p className="text-gray-600 mb-4">
                Nossa equipe está sempre disponível para ajudar com dúvidas sobre aplicação e dosagem.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                  <span className="text-sm text-gray-600">Atendimento por WhatsApp</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                  <span className="text-sm text-gray-600">Dicas práticas de aplicação</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                  <span className="text-sm text-gray-600">Cronograma de adubação</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-brand-green mb-4">Qualidade Garantida</h3>
              <p className="text-gray-600 mb-4">
                Mesma qualidade e eficiência dos produtos profissionais, adaptados para uso pessoal.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                  <span className="text-sm text-gray-600">Controle de qualidade rigoroso</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                  <span className="text-sm text-gray-600">Certificações nacionais</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                  <span className="text-sm text-gray-600">Resultados comprovados</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-brand-green mb-4">Entrega Facilitada</h3>
              <p className="text-gray-600 mb-4">
                Sistema de entrega que atende desde grandes centros até pequenas propriedades rurais.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                  <span className="text-sm text-gray-600">Entrega em todo o Brasil</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                  <span className="text-sm text-gray-600">Frete grátis acima de R$ 100</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                  <span className="text-sm text-gray-600">Rastreamento online</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-green mb-4">
              O que Nossos Clientes Dizem
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Depoimentos de quem já usa nossos produtos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-brand-yellow fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Uso os produtos Solo Rico na minha horta há 2 anos. A diferença na qualidade dos vegetais é impressionante!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center mr-3">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-brand-green">Maria Silva</p>
                  <p className="text-sm text-gray-500">Produtora Rural - SP</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-brand-yellow fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Produtos de qualidade e atendimento excelente. Meu jardim nunca esteve tão bonito!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center mr-3">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-brand-green">João Santos</p>
                  <p className="text-sm text-gray-500">Jardineiro Doméstico - RJ</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-brand-yellow fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Pequeno produtor de hortaliças. Os produtos Solo Rico aumentaram minha produtividade em 40%!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center mr-3">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-brand-green">Ana Costa</p>
                  <p className="text-sm text-gray-500">Produtora Orgânica - MG</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("for_you_cta_title")}
          </h2>
          <p className="text-green-100 max-w-3xl mx-auto mb-8 text-lg">
            {t("for_you_cta_description")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-brand-green">
              <Link href="/contatos">{t("contact_us")}</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-brand-green">
              <a href="https://wa.me/551732316000" target="_blank" rel="noopener noreferrer">
                {t("whatsapp")}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
