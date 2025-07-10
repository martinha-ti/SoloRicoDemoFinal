import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { api } from "@/lib/api";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, Mail, Phone, MapPin, Users, Heart, Target } from "lucide-react";

const jobApplicationSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  areaOfInterest: z.string().min(1, "Área de interesse é obrigatória"),
  message: z.string().optional(),
});

type JobApplicationFormData = z.infer<typeof jobApplicationSchema>;

export default function WorkWithUs() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<JobApplicationFormData>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: {
      name: "",
      email: "",
      areaOfInterest: "",
      message: "",
    },
  });

  const jobApplicationMutation = useMutation({
    mutationFn: api.sendJobApplication,
    onSuccess: () => {
      toast({
        title: "Currículo enviado com sucesso!",
        description: "Entraremos em contato caso seu perfil seja selecionado.",
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao enviar currículo",
        description: "Tente novamente ou entre em contato por e-mail.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: JobApplicationFormData) => {
    setIsSubmitting(true);
    jobApplicationMutation.mutate(data);
  };

  return (
    <div>
      <PageHeader
        title="Trabalhe Conosco"
        subtitle="Quer fazer parte do nosso time? Veja as perguntas frequentes e envie seu currículo."
      />

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-green mb-4">
              Trabalhe Conosco
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Confira as perguntas mais frequentes sobre oportunidades de carreira na Solo Rico
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  Como posso me candidatar a uma vaga?
                </AccordionTrigger>
                <AccordionContent>
                  Basta preencher o formulário abaixo e anexar seu currículo. Você também pode acompanhar as vagas abertas na seção "Vagas" do nosso site.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  Preciso ter experiência para me candidatar?
                </AccordionTrigger>
                <AccordionContent>
                  Algumas vagas exigem experiência, mas também oferecemos oportunidades para iniciantes e programas de estágio.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  Como saberei se fui selecionado?
                </AccordionTrigger>
                <AccordionContent>
                  Entraremos em contato por e-mail ou telefone caso seu perfil seja selecionado para a próxima etapa do processo seletivo.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  Que tipo de benefícios a Solo Rico oferece?
                </AccordionTrigger>
                <AccordionContent>
                  Oferecemos um pacote completo de benefícios incluindo plano de saúde, vale-alimentação, vale-transporte, participação nos lucros e resultados, além de oportunidades de desenvolvimento profissional.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">
                  A Solo Rico oferece home office ou trabalho híbrido?
                </AccordionTrigger>
                <AccordionContent>
                  Sim, dependendo da área e função, oferecemos modalidades de trabalho flexíveis, incluindo home office e trabalho híbrido, sempre buscando o equilíbrio entre produtividade e qualidade de vida.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-green mb-4">
              Por que Trabalhar na Solo Rico?
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Conheça nossa cultura organizacional e os valores que nos guiam
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-brand-green mb-4">Ambiente Familiar</h3>
                <p className="text-gray-600">
                  Valorizamos o relacionamento humano e mantemos um ambiente de trabalho colaborativo e acolhedor, onde cada pessoa é respeitada e valorizada.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-brand-green mb-4">Desenvolvimento</h3>
                <p className="text-gray-600">
                  Investimos no crescimento profissional de nossos colaboradores através de treinamentos, capacitações e oportunidades de carreira.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-brand-green mb-4">Propósito</h3>
                <p className="text-gray-600">
                  Trabalhe com propósito, contribuindo para o desenvolvimento da agricultura brasileira e ajudando produtores rurais a alcançar melhores resultados.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-brand-green flex items-center">
                  <FileText className="h-6 w-6 mr-2" />
                  Envie seu Currículo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome completo *</FormLabel>
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
                          <FormLabel>E-mail para contato *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="seu@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="areaOfInterest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Área de interesse *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Ex: Atendimento, Marketing, Tecnologia, Vendas, Logística" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Currículo (PDF ou DOC) *
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-brand-green transition-colors">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          Clique para selecionar ou arraste seu currículo aqui
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Formatos aceitos: PDF, DOC, DOCX (máx. 5MB)
                        </p>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          id="resume-upload"
                        />
                        <label
                          htmlFor="resume-upload"
                          className="inline-block mt-2 px-4 py-2 bg-brand-green text-white rounded cursor-pointer hover:bg-brand-green-dark transition-colors"
                        >
                          Selecionar Arquivo
                        </label>
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensagem (opcional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Fale um pouco sobre você, sua experiência e porque quer trabalhar na Solo Rico..."
                              rows={4}
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
                          Enviando Currículo...
                        </>
                      ) : (
                        <>
                          <Mail className="h-4 w-4 mr-2" />
                          Enviar Currículo
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-green mb-4">
              Benefícios e Vantagens
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Oferecemos um pacote completo de benefícios para nossos colaboradores
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Plano de Saúde",
              "Plano Odontológico",
              "Vale Alimentação",
              "Vale Transporte",
              "Participação nos Lucros",
              "Auxílio Creche",
              "Seguro de Vida",
              "Programa de Desenvolvimento",
              "Home Office",
              "Horário Flexível",
              "Desconto em Produtos",
              "Programa de Indicação"
            ].map((benefit, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow text-center">
                <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-sm font-medium text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-brand-green text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Dúvidas sobre Oportunidades?</h3>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Entre em contato conosco para saber mais sobre as oportunidades de carreira na Solo Rico
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center sm:justify-start">
                <Phone className="h-5 w-5 mr-2" />
                <span>(17) 3231-6000</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start">
                <Mail className="h-5 w-5 mr-2" />
                <span>rh@gruposolorico.com.br</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start">
                <MapPin className="h-5 w-5 mr-2" />
                <span>São José do Rio Preto - SP</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
