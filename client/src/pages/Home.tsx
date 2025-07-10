import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { CheckCircle, Leaf, FlaskConical, Handshake, Sprout } from "lucide-react";

export default function Home() {
  const { data: products = [] } = useQuery({
    queryKey: ['/api/products'],
    queryFn: () => api.getProducts(),
  });

  const { data: blogPosts = [] } = useQuery({
    queryKey: ['/api/blog'],
    queryFn: () => api.getBlogPosts(),
  });

  return (
    <div>
      {/* Hero Carousel */}
      <section className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem>
              <div 
                className="relative h-[95vh] bg-cover bg-center flex items-center justify-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1920&h=1080&fit=crop')`
                }}
              >
                <div className="text-center text-white px-4">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 text-shadow">
                    Cultivando soluções para uma agricultura de excelência
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-shadow">
                    Lado a lado com o produtor rural
                  </p>
                  <Button asChild className="bg-brand-green hover:bg-brand-green-dark text-white px-8 py-3 text-lg">
                    <a href="https://wa.me/551732316000" target="_blank" rel="noopener noreferrer">
                      Conheça
                    </a>
                  </Button>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div 
                className="relative h-[95vh] bg-cover bg-center flex items-center justify-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&h=1080&fit=crop')`
                }}
              >
                <div className="text-center text-white px-4">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 text-shadow">
                    Transforme Seu Negócio
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-shadow">
                    Descubra nossas soluções para o agro
                  </p>
                  <Button asChild className="bg-brand-green hover:bg-brand-green-dark text-white px-8 py-3 text-lg">
                    <a href="https://wa.me/551732316000" target="_blank" rel="noopener noreferrer">
                      Saiba Mais
                    </a>
                  </Button>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div 
                className="relative h-[95vh] bg-cover bg-center flex items-center justify-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&h=1080&fit=crop')`
                }}
              >
                <div className="text-center text-white px-4">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 text-shadow">
                    Inovação no Campo
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-shadow">
                    Conheça nossa tecnologia de ponta
                  </p>
                  <Button asChild className="bg-brand-green hover:bg-brand-green-dark text-white px-8 py-3 text-lg">
                    <a href="https://wa.me/551732316000" target="_blank" rel="noopener noreferrer">
                      Ver Mais
                    </a>
                  </Button>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      {/* Featured Products Section with proper image backgrounds */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h4 className="text-brand-yellow font-semibold text-lg mb-2">Solo Rico</h4>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-green mb-4">
              Produtos em Destaque
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Há mais de 30 anos espalhando o verde pelo Brasil e agora também pelo mundo.
              Transformamos o cuidado com o solo em alta produtividade. Confie em quem entende do campo.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "TOP LIME PRO",
                category: "LINHA DE ADJUVANTES",
                image: "https://images.unsplash.com/photo-1580910051230-5dd7dcad19d4?w=400&h=300&fit=crop"
              },
              {
                name: "REVOLUTION",
                category: "LINHA PROTECT",
                image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop"
              },
              {
                name: "GEL DE PLANTIO",
                category: "LINHA TITANIUM SOLLUS",
                image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop"
              },
              {
                name: "PROTETOR E700",
                category: "LINHA PROTECT",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
              }
            ].map((product, index) => (
              <Card key={index} className="group cursor-pointer overflow-hidden hover:shadow-lg transition-shadow">
                <div 
                  className="relative h-64 bg-cover bg-center"
                  style={{ backgroundImage: `url('${product.image}')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                    <p className="text-sm text-brand-green bg-white px-2 py-1 rounded inline-block">
                      {product.category}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Rain Section */}
      <section 
        className="relative py-32 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&h=600&fit=crop')`
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-brand-yellow">
            Há mais de 30 anos espalhando o verde pelo Brasil e agora também pelo mundo!
          </h2>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
            Transformamos o cuidado com o solo em alta produtividade. Confie em quem entende do campo.
          </p>
        </div>
      </section>

      {/* Product Lines Section - Exactly like your design */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h4 className="text-brand-yellow font-semibold text-lg mb-2">Solo Rico</h4>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Linhas de Produtos</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                name: "TITANIUM FOLIAR",
                image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=300&h=300&fit=crop"
              },
              {
                name: "TITANIUM SOLLUS",
                image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop"
              },
              {
                name: "PROTECT",
                image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=300&h=300&fit=crop"
              },
              {
                name: "ADJUVANTES",
                image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=300&h=300&fit=crop"
              },
              {
                name: "VIGOR",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"
              }
            ].map((line) => (
              <div key={line.name} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105">
                  <img 
                    src={line.image} 
                    alt={line.name} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-lg">{line.name}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h4 className="text-brand-yellow font-semibold text-lg mb-2">Solo Rico</h4>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-green">News & Blogs</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={post.imageUrl || 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=250&fit=crop'} 
                    alt={post.title} 
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-3">
                    <span className="blog-tag">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="text-gray-500 text-sm">
                    {new Date(post.publishedAt || '').toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
