import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CheckCircle, Phone, Mail, MessageCircle, Star, Leaf } from "lucide-react";
import { Link } from "wouter";

const contactSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().optional(),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ProductDetail() {
  const { slug } = useParams();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['/api/products', slug],
    queryFn: () => api.getProduct(slug as string),
    enabled: !!slug,
  });

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: (data: ContactFormData) => api.sendContact({
      ...data,
      subject: `Interesse no produto: ${product?.name}`,
      productId: product?.id,
    }),
    onSuccess: () => {
      toast({
        title: "Solicitação enviada com sucesso!",
        description: "Entraremos em contato em breve com mais informações.",
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao enviar solicitação",
        description: "Tente novamente ou entre em contato por telefone.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: ContactFormData) => {
    setIsSubmitting(true);
    contactMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-64 bg-gray-300"></div>
              <div className="p-8">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-6"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Produto não encontrado</h1>
            <p className="text-gray-600 mb-6">
              O produto que você está procurando não foi encontrado ou não está mais disponível.
            </p>
            <Button asChild>
              <Link href="/">Voltar ao início</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Button asChild variant="ghost" className="text-brand-green hover:text-brand-green-dark">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>
        </div>
      </div>

      {/* Product Detail */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Product Header */}
          <div className="relative">
            <img 
              src={product.imageUrl || 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=400&fit=crop'} 
              alt={product.name} 
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
              <div className="absolute bottom-6 left-6">
                <Badge className="bg-brand-green text-white mb-4">
                  {product.category}
                </Badge>
                <h1 className="text-white text-3xl md:text-4xl font-bold">{product.name}</h1>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-brand-green mb-4 flex items-center">
                    <Leaf className="h-6 w-6 mr-2" />
                    Descrição do Produto
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {product.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-brand-green mb-4">Principais Benefícios</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-brand-green mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product Features */}
                <div>
                  <h3 className="text-xl font-bold text-brand-green mb-4">Características</h3>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Categoria</h4>
                        <p className="text-gray-600">{product.category}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Aplicação</h4>
                        <p className="text-gray-600">Foliar e via solo</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Formulação</h4>
                        <p className="text-gray-600">Líquida concentrada</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Embalagem</h4>
                        <p className="text-gray-600">1L, 5L, 20L</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Reviews */}
                <div>
                  <h3 className="text-xl font-bold text-brand-green mb-4">Avaliações dos Clientes</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="flex mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-brand-yellow fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">João Silva - Produtor Rural</span>
                      </div>
                      <p className="text-gray-700 text-sm">
                        "Excelente produto! Notei melhora significativa na produtividade da minha lavoura."
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="flex mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-brand-yellow fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">Maria Santos - Agrônoma</span>
                      </div>
                      <p className="text-gray-700 text-sm">
                        "Produto de alta qualidade, fácil aplicação e resultados consistentes."
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <div className="sticky top-8">
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl text-brand-green">Solicite Mais Informações</CardTitle>
                      <p className="text-gray-600">
                        Preencha o formulário abaixo e nossa equipe técnica entrará em contato com você.
                      </p>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nome Completo *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Seu nome completo" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>E-mail *</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="seu@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Telefone</FormLabel>
                                <FormControl>
                                  <Input placeholder="(11) 99999-9999" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Mensagem *</FormLabel>
                                <FormControl>
                                  <Textarea
                                    rows={4}
                                    placeholder="Conte-nos sobre seu interesse no produto, tamanho da propriedade, cultura, etc..."
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button 
                            type="submit" 
                            className="w-full bg-brand-green hover:bg-brand-green-dark text-white"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <div className="loading mr-2"></div>
                                Enviando Solicitação...
                              </>
                            ) : (
                              "Enviar Solicitação"
                            )}
                          </Button>
                        </form>
                      </Form>

                      {/* Quick Contact Options */}
                      <div className="mt-6 pt-6 border-t">
                        <p className="text-sm text-gray-600 mb-4">Ou entre em contato diretamente:</p>
                        <div className="space-y-3">
                          <a 
                            href="https://wa.me/5517981863298" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                          >
                            <MessageCircle className="h-5 w-5 mr-3" />
                            <span className="font-medium">WhatsApp: (17) 98186-3298</span>
                          </a>
                          <a 
                            href="tel:+551732316000"
                            className="flex items-center p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                          >
                            <Phone className="h-5 w-5 mr-3" />
                            <span className="font-medium">Telefone: (17) 3231-6000</span>
                          </a>
                          <a 
                            href="mailto:contato@solorico.com.br"
                            className="flex items-center p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <Mail className="h-5 w-5 mr-3" />
                            <span className="font-medium">contato@solorico.com.br</span>
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-green mb-4">
              Produtos Relacionados
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Conheça outros produtos da linha {product.category}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* This would be populated with related products from the same category */}
            {[1, 2, 3].map((item) => (
              <Card key={item} className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=200&fit=crop" 
                    alt="Produto Relacionado" 
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge className="bg-brand-green text-white mb-2">{product.category}</Badge>
                  <h3 className="font-bold text-brand-green mb-2">Produto Relacionado {item}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Descrição do produto relacionado na mesma categoria.
                  </p>
                  <Button variant="outline" className="w-full border-brand-green text-brand-green hover:bg-brand-green hover:text-white">
                    Ver Produto
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
