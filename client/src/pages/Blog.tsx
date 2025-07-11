import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Blog() {
  const { t } = useLanguage();
  const { data: blogPosts = [], isLoading } = useQuery({
    queryKey: ['/api/blog'],
    queryFn: () => api.getBlogPosts(),
  });

  if (isLoading) {
    return (
      <div>
        <PageHeader
          title={t('blog')}
          subtitle={t('blog_subtitle')}
        />
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const featuredPost = blogPosts[0];
  const regularPosts = blogPosts.slice(1);

  return (
    <div>
      <PageHeader
        title={t('blog')}
        subtitle={t('blog_subtitle')}
      />

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="relative">
                  <img 
                    src={featuredPost.imageUrl || 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop'} 
                    alt={featuredPost.title} 
                    className="w-full h-64 lg:h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-brand-green text-white">
                      {t('featured')}
                    </Badge>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="mb-4">
                    <Badge variant="outline" className="border-brand-green text-brand-green mb-2">
                      {featuredPost.category}
                    </Badge>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-brand-green mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(featuredPost.publishedAt || '').toLocaleDateString('pt-BR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <Button className="bg-brand-green hover:bg-brand-green-dark text-white w-fit">
                      Ler artigo completo
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-brand-green mb-4">Categorias</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['Todos', 'Agronegócio', 'Mercado', 'Inovação', 'Sustentabilidade', 'Técnico'].map((category) => (
                <Button
                  key={category}
                  variant={category === 'Todos' ? 'default' : 'outline'}
                  className={category === 'Todos' ? 'bg-brand-green hover:bg-brand-green-dark' : 'border-brand-green text-brand-green hover:bg-brand-green hover:text-white'}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-green mb-4">
              Últimos Artigos
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Fique por dentro das últimas tendências e novidades do agronegócio
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
                <div className="relative overflow-hidden">
                  <img 
                    src={post.imageUrl || 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=250&fit=crop'} 
                    alt={post.title} 
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-brand-green text-white text-xs">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-lg font-bold text-brand-green mb-3 line-clamp-2 group-hover:text-brand-green-dark transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(post.publishedAt || '').toLocaleDateString('pt-BR')}
                    </div>
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      Solo Rico
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="ghost" className="text-brand-green hover:text-brand-green-dark p-0 h-auto font-medium">
                        Ler mais
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button variant="outline" className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white">
              Carregar mais artigos
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-brand-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Receba Nossas Novidades
          </h2>
          <p className="text-green-100 max-w-3xl mx-auto mb-8 text-lg">
            Inscreva-se em nossa newsletter e receba artigos exclusivos sobre agronegócio direto em seu e-mail
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Seu e-mail"
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
            />
            <Button className="bg-brand-yellow hover:bg-brand-yellow-light text-gray-800 px-6">
              Inscrever
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
