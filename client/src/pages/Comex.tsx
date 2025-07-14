import PageHeader from "@/components/PageHeader";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Globe, Truck, FileText, Shield, CheckCircle, Target, TrendingUp, Users } from "lucide-react";

export default function Comex() {
  return (
    <Layout>
      <PageHeader
        title="Comércio Exterior"
        subtitle="Expandindo fronteiras, levando qualidade brasileira para o mundo"
      />

      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-green mb-4">
              Solo Rico Global
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Expandindo nossa presença internacional, levamos a qualidade e inovação dos 
              fertilizantes Solo Rico para produtores rurais em diversos países, contribuindo 
              para o desenvolvimento da agricultura mundial.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-brand-green mb-2">Exportação</h3>
              <p className="text-gray-600">Produtos brasileiros para o mundo</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-brand-green mb-2">Logística</h3>
              <p className="text-gray-600">Entregas internacionais seguras</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-brand-green mb-2">Documentação</h3>
              <p className="text-gray-600">Suporte completo em documentação</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-brand-green mb-2">Certificações</h3>
              <p className="text-gray-600">Produtos certificados internacionalmente</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-green mb-4">
              Nossos Serviços de Comex
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Oferecemos soluções completas para exportação, desde a documentação até a entrega final
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-brand-green flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Exportação de Produtos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Exportamos nossa linha completa de fertilizantes e adjuvantes para países da América Latina, 
                  África e outros mercados emergentes.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                    <span className="text-sm text-gray-600">Fertilizantes foliares</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                    <span className="text-sm text-gray-600">Adjuvantes especializados</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                    <span className="text-sm text-gray-600">Linha Protect</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                    <span className="text-sm text-gray-600">Formulações customizadas</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-brand-green flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Suporte Documental
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Nossa equipe especializada em comércio exterior cuida de toda a documentação 
                  necessária para exportação.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                    <span className="text-sm text-gray-600">Certificados de origem</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                    <span className="text-sm text-gray-600">Laudos técnicos</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                    <span className="text-sm text-gray-600">Documentação alfandegária</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                    <span className="text-sm text-gray-600">Certificações internacionais</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-brand-green flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  Logística Internacional
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Parceria com as melhores empresas de logística para garantir entregas 
                  seguras e pontuais em qualquer lugar do mundo.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                    <span className="text-sm text-gray-600">Transporte marítimo</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                    <span className="text-sm text-gray-600">Transporte aéreo</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                    <span className="text-sm text-gray-600">Rastreamento completo</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                    <span className="text-sm text-gray-600">Seguro de carga</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-brand-green flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Suporte Técnico Global
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Oferecemos suporte técnico especializado para nossos clientes internacionais, 
                  adaptando nossas soluções às condições locais.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                    <span className="text-sm text-gray-600">Consultoria agronômica</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                    <span className="text-sm text-gray-600">Treinamento de aplicação</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                    <span className="text-sm text-gray-600">Adaptação climática</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                    <span className="text-sm text-gray-600">Suporte multilíngue</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Markets Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-green mb-4">
              Mercados Atendidos
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Presença crescente em mercados estratégicos ao redor do mundo
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-bold text-brand-green mb-4">América Latina</h3>
              <p className="text-gray-600 mb-4">
                Expandindo nossa presença em países vizinhos com soluções adaptadas às condições locais.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Argentina</li>
                <li>• Paraguai</li>
                <li>• Uruguai</li>
                <li>• Bolívia</li>
              </ul>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-bold text-brand-green mb-4">África</h3>
              <p className="text-gray-600 mb-4">
                Apoiando o desenvolvimento da agricultura africana com tecnologia brasileira.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Angola</li>
                <li>• Moçambique</li>
                <li>• Ghana</li>
                <li>• Costa do Marfim</li>
              </ul>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-bold text-brand-green mb-4">Novos Mercados</h3>
              <p className="text-gray-600 mb-4">
                Constantemente explorando novas oportunidades para expandir nossa presença global.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• América Central</li>
                <li>• Caribe</li>
                <li>• Ásia</li>
                <li>• Oriente Médio</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-brand-green text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Solo Rico no Mundo
            </h2>
            <p className="text-green-100 max-w-3xl mx-auto">
              Números que demonstram nosso crescimento no mercado internacional
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-gray-800" />
              </div>
              <h3 className="text-3xl font-bold mb-2">15+</h3>
              <p className="text-green-100">Países Atendidos</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-gray-800" />
              </div>
              <h3 className="text-3xl font-bold mb-2">50%</h3>
              <p className="text-green-100">Crescimento Anual</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-gray-800" />
              </div>
              <h3 className="text-3xl font-bold mb-2">200+</h3>
              <p className="text-green-100">Embarques Anuais</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-gray-800" />
              </div>
              <h3 className="text-3xl font-bold mb-2">95%</h3>
              <p className="text-green-100">Satisfação dos Clientes</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-green mb-4">
            Interessado em Nossos Produtos?
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8 text-lg">
            Entre em contato conosco para conhecer nossas soluções de exportação e 
            levar a qualidade Solo Rico para seu país
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild variant="outline" className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white">
              <Link href="/contatos">Fale Conosco</Link>
            </Button>
            <Button asChild variant="outline" className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white">
              <a href="https://wa.me/551732316000" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
