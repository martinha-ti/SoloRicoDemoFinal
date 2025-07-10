import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  FileText, 
  HelpCircle, 
  CheckCircle, 
  AlertCircle,
  Truck,
  CreditCard,
  Package,
  Users
} from "lucide-react";

export default function Sac() {
  return (
    <div>
      <PageHeader
        title="SAC - Atendimento ao Cliente"
        subtitle="Estamos aqui para ajudar você com suas dúvidas e necessidades"
      />

      {/* Quick Contact */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-green mb-4">
              Precisa de Ajuda Rápida?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Escolha o canal de atendimento mais conveniente para você
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-brand-green mb-2">WhatsApp</h3>
                <p className="text-gray-600 text-sm mb-4">Atendimento direto e rápido</p>
                <Badge className="bg-green-100 text-green-800 mb-4">Online agora</Badge>
                <Button asChild className="w-full bg-green-500 hover:bg-green-600">
                  <a href="https://wa.me/5517981863298" target="_blank" rel="noopener noreferrer">
                    Falar no WhatsApp
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-brand-green mb-2">Telefone</h3>
                <p className="text-gray-600 text-sm mb-4">Atendimento por telefone</p>
                <Badge className="bg-blue-100 text-blue-800 mb-4">Seg-Sex 9h-18h</Badge>
                <Button asChild variant="outline" className="w-full border-brand-green text-brand-green hover:bg-brand-green hover:text-white">
                  <a href="tel:+551732316000">
                    (17) 3231-6000
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-brand-green mb-2">E-mail</h3>
                <p className="text-gray-600 text-sm mb-4">Envie sua mensagem</p>
                <Badge className="bg-yellow-100 text-yellow-800 mb-4">Resposta em 24h</Badge>
                <Button asChild variant="outline" className="w-full border-brand-green text-brand-green hover:bg-brand-green hover:text-white">
                  <a href="mailto:sac@gruposolorico.com.br">
                    Enviar E-mail
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-green mb-4">
              Como Podemos Ajudar?
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Selecione o tipo de atendimento que você precisa
            </p>
          </div>

          <Tabs defaultValue="produtos" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
              <TabsTrigger value="produtos" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Produtos
              </TabsTrigger>
              <TabsTrigger value="pedidos" className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Pedidos
              </TabsTrigger>
              <TabsTrigger value="financeiro" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Financeiro
              </TabsTrigger>
              <TabsTrigger value="tecnico" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Técnico
              </TabsTrigger>
            </TabsList>

            <TabsContent value="produtos" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-brand-green">Informações sobre Produtos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                        <span className="text-gray-600">Especificações técnicas</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                        <span className="text-gray-600">Modo de aplicação</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                        <span className="text-gray-600">Compatibilidade</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                        <span className="text-gray-600">Dosagens recomendadas</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-brand-green">Problemas com Produtos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                        <span className="text-gray-600">Produto com defeito</span>
                      </li>
                      <li className="flex items-center">
                        <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                        <span className="text-gray-600">Embalagem danificada</span>
                      </li>
                      <li className="flex items-center">
                        <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                        <span className="text-gray-600">Resultado insatisfatório</span>
                      </li>
                      <li className="flex items-center">
                        <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                        <span className="text-gray-600">Troca ou devolução</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="pedidos" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-brand-green">Acompanhamento de Pedidos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Número do Pedido
                        </label>
                        <Input placeholder="Digite o número do seu pedido" />
                      </div>
                      <Button className="w-full bg-brand-green hover:bg-brand-green-dark">
                        Rastrear Pedido
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-brand-green">Status de Entrega</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <div>
                          <p className="font-medium text-green-800">Pedido confirmado</p>
                          <p className="text-sm text-green-600">Pedido em processamento</p>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                        <Truck className="h-5 w-5 text-blue-500 mr-3" />
                        <div>
                          <p className="font-medium text-blue-800">Em trânsito</p>
                          <p className="text-sm text-blue-600">Produto a caminho</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="financeiro" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-brand-green">Questões Financeiras</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <CreditCard className="h-4 w-4 text-brand-green mr-2" />
                        <span className="text-gray-600">Formas de pagamento</span>
                      </li>
                      <li className="flex items-center">
                        <FileText className="h-4 w-4 text-brand-green mr-2" />
                        <span className="text-gray-600">Segunda via de boleto</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                        <span className="text-gray-600">Confirmação de pagamento</span>
                      </li>
                      <li className="flex items-center">
                        <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                        <span className="text-gray-600">Problemas no pagamento</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-brand-green">Faturamento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <FileText className="h-4 w-4 text-brand-green mr-2" />
                        <span className="text-gray-600">Nota fiscal eletrônica</span>
                      </li>
                      <li className="flex items-center">
                        <FileText className="h-4 w-4 text-brand-green mr-2" />
                        <span className="text-gray-600">Relatórios de compra</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                        <span className="text-gray-600">Histórico de pedidos</span>
                      </li>
                      <li className="flex items-center">
                        <CreditCard className="h-4 w-4 text-brand-green mr-2" />
                        <span className="text-gray-600">Crédito e limite</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="tecnico" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-brand-green">Suporte Agronômico</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <Users className="h-4 w-4 text-brand-green mr-2" />
                        <span className="text-gray-600">Consultoria técnica</span>
                      </li>
                      <li className="flex items-center">
                        <FileText className="h-4 w-4 text-brand-green mr-2" />
                        <span className="text-gray-600">Análise de solo</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
                        <span className="text-gray-600">Recomendação de produtos</span>
                      </li>
                      <li className="flex items-center">
                        <HelpCircle className="h-4 w-4 text-brand-green mr-2" />
                        <span className="text-gray-600">Dúvidas de aplicação</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-brand-green">Agendar Visita Técnica</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Input placeholder="Seu nome" />
                      <Input placeholder="Localização da propriedade" />
                      <Textarea placeholder="Descreva sua necessidade..." rows={3} />
                      <Button className="w-full bg-brand-green hover:bg-brand-green-dark">
                        Solicitar Visita
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-green mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Encontre respostas para as dúvidas mais comuns
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  Como posso rastrear meu pedido?
                </AccordionTrigger>
                <AccordionContent>
                  Você pode rastrear seu pedido através do nosso SAC, informando o número do pedido. 
                  Também enviamos atualizações por e-mail e WhatsApp sobre o status da entrega.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  Qual o prazo de entrega dos produtos?
                </AccordionTrigger>
                <AccordionContent>
                  O prazo de entrega varia conforme a região e o produto. Geralmente, para produtos em estoque, 
                  o prazo é de 3 a 7 dias úteis. Produtos sob encomenda podem levar até 15 dias úteis.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  Como solicitar uma visita técnica?
                </AccordionTrigger>
                <AccordionContent>
                  Você pode solicitar uma visita técnica através do nosso SAC, WhatsApp ou preenchendo 
                  o formulário na aba "Técnico" acima. Nossa equipe entrará em contato para agendar 
                  a melhor data e horário.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  Quais são as formas de pagamento aceitas?
                </AccordionTrigger>
                <AccordionContent>
                  Aceitamos pagamento via boleto bancário, transferência bancária, PIX e cartão de crédito. 
                  Para clientes empresariais, oferecemos condições especiais de pagamento a prazo.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">
                  Como obter suporte técnico para aplicação dos produtos?
                </AccordionTrigger>
                <AccordionContent>
                  Nossa equipe técnica está disponível por telefone, WhatsApp e e-mail para esclarecer 
                  dúvidas sobre aplicação, dosagem e compatibilidade dos produtos. Também oferecemos 
                  visitas técnicas gratuitas para orientação in loco.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-brand-green text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Ainda Precisa de Ajuda?</h3>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Nossa equipe está sempre pronta para atendê-lo. Entre em contato através dos nossos canais de atendimento.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild variant="secondary" className="bg-white text-brand-green hover:bg-gray-100">
                <Link href="/contatos">Página de Contatos</Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-brand-green">
                <a href="https://wa.me/5517981863298" target="_blank" rel="noopener noreferrer">
                  Falar no WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
