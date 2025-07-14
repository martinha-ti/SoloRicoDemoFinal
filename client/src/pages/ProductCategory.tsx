import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, ChevronRight } from "lucide-react";
import type { Product } from "@shared/schema";

export default function ProductCategory() {
  const { category } = useParams<{ category: string }>();
  const { t } = useLanguage();
  
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/category', category],
    queryFn: async () => {
      // Converte categoria da URL para o formato do backend
      const categoryMap: Record<string, string> = {
        'adjuvantes': 'Adjuvantes',
        'protect': 'Protect',
        'titanium-sollus': 'Titanium Sollus',
        'fertilizantes-foliares': 'Fertilizantes Foliares',
        'fertilizantes': 'Fertilizantes',
        'defensivos': 'Defensivos',
        'nutricao-especial': 'Nutrição Especial',
      };
      
      const backendCategory = categoryMap[category || ''] || category;
      const response = await fetch(`/api/products/category/${backendCategory}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    },
  });

  const categoryNames: Record<string, { pt: string; en: string }> = {
    'adjuvantes': { pt: 'Adjuvantes', en: 'Adjuvants' },
    'protect': { pt: 'Linha Protect', en: 'Protect Line' },
    'titanium-sollus': { pt: 'Titanium Sollus', en: 'Titanium Sollus' },
    'fertilizantes-foliares': { pt: 'Fertilizantes Foliares', en: 'Foliar Fertilizers' },
    'fertilizantes': { pt: 'Fertilizantes', en: 'Fertilizers' },
    'defensivos': { pt: 'Defensivos', en: 'Defensives' },
    'nutricao-especial': { pt: 'Nutrição Especial', en: 'Special Nutrition' },
  };

  const getCategoryName = (cat: string) => {
    const names = categoryNames[cat] || { pt: cat, en: cat };
    return names.pt;
  };

  if (isLoading) {
    return (
      <div>
        <PageHeader
          title={getCategoryName(category || '')}
          subtitle="Produtos especializados para sua lavoura"
        />
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 h-64 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-10 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={getCategoryName(category || '')}
        subtitle="Produtos especializados para sua lavoura"
        backgroundImage="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=400&fit=crop"
      />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-brand-green">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/products" className="hover:text-brand-green">
              Produtos
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-brand-green font-medium">
              {getCategoryName(category || '')}
            </span>
          </nav>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <Leaf className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Nenhum produto encontrado
              </h3>
              <p className="text-gray-500">
                Não há produtos disponíveis nesta categoria no momento.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {getCategoryName(category || '')}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Explore nossa linha completa de produtos especializados, 
                  desenvolvidos para atender às necessidades específicas da sua lavoura.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative overflow-hidden">
                      <img 
                        src={product.imageUrl || 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=250&fit=crop'} 
                        alt={product.name} 
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-white/90 backdrop-blur-sm text-brand-green px-3 py-1 rounded-full text-sm font-medium">
                          {product.category}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-green transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">
                            {product.features?.split(',').length || 0} características
                          </span>
                        </div>
                        <Link href={`/produto/${product.slug}`}>
                          <Button 
                            variant="outline" 
                            className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
                          >
                            Ver detalhes
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}