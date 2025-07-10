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
                className="relative h-96 lg:h-[500px] bg-cover bg-center flex items-center justify-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1920&h=800&fit=crop')`
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
                className="relative h-96 lg:h-[500px] bg-cover bg-center flex items-center justify-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&h=800&fit=crop')`
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
                className="relative h-96 lg:h-[500px] bg-cover bg-center flex items-center justify-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&h=800&fit=crop')`
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

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop" 
                alt="Solo Rico Facility" 
                className="rounded-lg shadow-lg w-full"
              />
              <img 
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop" 
                alt="Plant Detail" 
                className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="text-brand-yellow font-semibold text-lg mb-2">Solo Rico</h4>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-green mb-4">
                  Cultivando soluções para uma agricultura de excelência
                </h2>
                <p className="text-lg text-brand-green font-semibold mb-4">
                  Solo Rico, a parceira do produtor rural no Brasil e no mundo.
                </p>
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                Na Solo Rico, acreditamos que o campo é mais do que terra e cultivo — é vida, história e 
                progresso. Desde 1989, nossa missão tem sido apoiar o produtor rural, com foco especial no 
                pequeno e médio agricultor, que impulsiona a economia local e garante a alimentação de inúmeras 
                famílias.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <Sprout className="text-brand-green h-5 w-5 mr-3" />
                  <span className="text-gray-700">Fertilizantes foliares e via solo</span>
                </div>
                <div className="flex items-center">
                  <FlaskConical className="text-brand-green h-5 w-5 mr-3" />
                  <span className="text-gray-700">Adjuvantes</span>
                </div>
                <div className="flex items-center">
                  <Handshake className="text-brand-green h-5 w-5 mr-3" />
                  <span className="text-gray-700">Respeito ao produtor rural</span>
                </div>
                <div className="flex items-center">
                  <Leaf className="text-brand-green h-5 w-5 mr-3" />
                  <span className="text-gray-700">Cuidado com o solo e com as plantas</span>
                </div>
              </div>
              
              <Button asChild className="bg-brand-green hover:bg-brand-green-dark text-white px-8 py-3">
                <Link href="/empresa">Saiba Mais</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-green mb-4">
              Produtos em Destaque
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Há mais de 30 anos espalhando o verde pelo Brasil e agora também pelo mundo.
              Transformamos o cuidado com o solo em alta produtividade. Confie em quem entende do campo.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product) => (
              <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.imageUrl || 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=300&h=200&fit=crop'} 
                    alt={product.name} 
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                      <p className="text-sm opacity-90">{product.category}</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-brand-green mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{product.category}</p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/produto/${product.slug}`}>Ver Produto</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Lines */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h4 className="text-brand-yellow font-semibold text-lg mb-2">Solo Rico</h4>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-green">Linhas de Produtos</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                name: "TITANIUM FOLIAR",
                image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=300&h=300&fit=crop"
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
                image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=300&h=300&fit=crop"
              },
              {
                name: "VIGOR",
                image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=300&h=300&fit=crop"
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
