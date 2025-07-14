import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight, 
  Leaf, 
  Shield, 
  Droplets, 
  Zap, 
  CheckCircle, 
  Download,
  Phone,
  MessageCircle
} from "lucide-react";
import type { Product } from "@shared/schema";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  
  const { data: product, isLoading, error } = useQuery<Product & { subProducts?: Product[] }>({
    queryKey: ['/api/products', slug],
    queryFn: async () => {
      // Para produtos específicos que têm sub-produtos, usa a rota especial
      const isProductLine = slug === 'top-lime-pro';
      const endpoint = isProductLine ? 
        `/api/products/${slug}/with-subproducts` : 
        `/api/products/${slug}`;
      
      const response = await fetch(endpoint);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Produto não encontrado');
        }
        throw new Error('Erro ao carregar produto');
      }
      return response.json();
    },
    retry: false,
    enabled: !!slug,
  });

  // Buscar produto pai se este for um sub-produto
  const { data: parentProduct } = useQuery<Product>({
    queryKey: ['/api/products/id', product?.parentId],
    queryFn: async () => {
      const response = await fetch(`/api/products/id/${product?.parentId}`);
      if (!response.ok) throw new Error('Produto pai não encontrado');
      return response.json();
    },
    enabled: !!product?.parentId && product?.parentId > 0,
  });

  if (isLoading) {
    return (
      <div>
        <PageHeader
          title="Carregando produto..."
          subtitle="Aguarde enquanto carregamos as informações"
        />
        <div className="container mx-auto px-4 py-20">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-gray-300 h-96 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <PageHeader
          title="Produto não encontrado"
          subtitle="O produto que você está procurando não foi encontrado"
        />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto">
            <p className="text-gray-600 mb-8">
              Verifique se o link está correto ou navegue pelos nossos produtos disponíveis.
            </p>
            <Link href="/">
              <Button className="bg-brand-green hover:bg-brand-green-dark text-white">
                Voltar ao Início
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <PageHeader
          title="Produto não encontrado"
          subtitle="O produto que você está procurando não foi encontrado"
        />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto">
            <p className="text-gray-600 mb-8">
              Verifique se o link está correto ou navegue pelos nossos produtos disponíveis.
            </p>
            <Link href="/">
              <Button className="bg-brand-green hover:bg-brand-green-dark text-white">
                Voltar ao Início
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <PageHeader
          title="Produto não encontrado"
          subtitle="O produto que você está procurando não foi encontrado"
        />
        <div className="container mx-auto px-4 py-20 text-center">
          <Leaf className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Produto não encontrado
          </h3>
          <p className="text-gray-500 mb-6">
            O produto que você está procurando não existe ou foi removido.
          </p>
          <Link href="/products">
            <Button className="bg-brand-green hover:bg-brand-green-dark text-white">
              Ver todos os produtos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const features = product.features ? product.features.split(',').map(f => f.trim()) : [];
  const benefits = Array.isArray(product.benefits) ? product.benefits : [];
  const gallery = Array.isArray(product.gallery) ? product.gallery : [];

  return (
    <div>
      <PageHeader
        title={product.name}
        subtitle={product.category}
        backgroundImage={product.imageUrl || 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=400&fit=crop'}
      />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-brand-green">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/produtos" className="hover:text-brand-green">
              Produtos
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/produtos/${product.category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-brand-green">
              {product.category}
            </Link>
            <ChevronRight className="h-4 w-4" />
            {parentProduct && (
              <>
                <Link href={`/produtos/${parentProduct.slug}`} className="hover:text-brand-green">
                  {parentProduct.name}
                </Link>
                <ChevronRight className="h-4 w-4" />
              </>
            )}
            <span className="text-brand-green font-medium">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image & Gallery */}
            <div className="space-y-6">
              <div className="relative">
                <img 
                  src={product.imageUrl || 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=600&fit=crop'} 
                  alt={product.name} 
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 backdrop-blur-sm text-brand-green px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                </div>
              </div>
              
              {/* Gallery */}
              {gallery.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {gallery.map((image, index) => (
                    <img 
                      key={index}
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-xl text-brand-green font-semibold">
                  {product.category}
                </p>
              </div>

              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link href="/contatos">
                  <Button className="bg-brand-green hover:bg-brand-green-dark text-white">
                    <Phone className="mr-2 h-4 w-4" />
                    Entrar em contato
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
                  onClick={() => window.open('https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20produto:%20' + product.name, '_blank')}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    // Simular download de PDF
                    const link = document.createElement('a');
                    link.href = '#';
                    link.download = `${product.name.replace(/\s+/g, '_')}_datasheet.pdf`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features & Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Features */}
            {features.length > 0 && (
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Zap className="h-6 w-6 text-brand-green mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      Características
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-brand-green mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Benefits */}
            {benefits.length > 0 && (
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Shield className="h-6 w-6 text-brand-green mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      Benefícios
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-brand-green mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Detailed Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Usage Instructions */}
            {product.usage && (
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Droplets className="h-6 w-6 text-brand-green mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      Modo de Uso
                    </h3>
                  </div>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {product.usage}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Composition */}
            {product.composition && (
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Shield className="h-6 w-6 text-brand-green mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      Composição
                    </h3>
                  </div>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {product.composition}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Technical Specifications */}
            {product.technicalSpecs && (
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Zap className="h-6 w-6 text-brand-green mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      Especificações Técnicas
                    </h3>
                  </div>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {product.technicalSpecs}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Product Line Sub-Products */}
      {product.subProducts && product.subProducts.length > 0 ? (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Produtos da Linha {product.name}
              </h3>
              <p className="text-gray-600">
                Conheça todos os produtos disponíveis na linha {product.name} 
                e escolha o que melhor atende às suas necessidades.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {product.subProducts.map((subProduct) => (
                <Card key={subProduct.id} className="h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img 
                      src={subProduct.imageUrl || "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop"} 
                      alt={subProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {subProduct.name}
                    </h4>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {subProduct.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-brand-green font-medium">
                        {subProduct.category}
                      </span>
                      <Link href={`/produtos/${subProduct.slug}`}>
                        <Button variant="outline" size="sm" className="text-brand-green border-brand-green hover:bg-brand-green hover:text-white">
                          Ver Detalhes
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Link para categoria */}
            <div className="text-center">
              <Link href={`/produtos/categoria/${product.category.toLowerCase().replace(/\s+/g, '-')}`}>
                <Button 
                  variant="outline" 
                  className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
                >
                  Ver todos os produtos da categoria
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Variações do Produto
              </h3>
              <p className="text-gray-600">
                Explore as diferentes opções disponíveis
              </p>
            </div>
            
            {/* Sub-produtos (simulados baseados no produto principal) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                { suffix: '1L', description: 'Embalagem de 1 litro - Ideal para pequenas propriedades' },
                { suffix: '5L', description: 'Embalagem de 5 litros - Melhor custo-benefício' },
                { suffix: '20L', description: 'Embalagem de 20 litros - Para grandes aplicações' },
              ].map((variant) => (
                <Card key={variant.suffix} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center text-white font-bold mr-4">
                        {variant.suffix}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">
                          {product.name} {variant.suffix}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {variant.description}
                        </p>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-brand-green hover:bg-brand-green-dark text-white"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Solicitar Orçamento
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Link para categoria */}
            <div className="text-center">
              <Link href={`/produtos/categoria/${product.category.toLowerCase().replace(/\s+/g, '-')}`}>
                <Button 
                  variant="outline" 
                  className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
                >
                  Ver todos os produtos da categoria
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}