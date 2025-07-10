import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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
      {/* Barra Superior */}
      <div className="top-bar"></div>

      {/* Banner Slider */}
      <div id="bannerCarousel" className="carousel slide" data-bs-ride="carousel">
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem>
              <div 
                className="carousel-item active"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1920&h=1080&fit=crop')`
                }}
              >
                <div className="carousel-overlay"></div>
                <div className="carousel-content">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white text-shadow">
                    Cultivando soluções para uma agricultura de excelência
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-white text-shadow">
                    Lado a lado com o produtor rural
                  </p>
                  <a 
                    href="https://wa.me/551732316000" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded font-semibold transition-colors"
                  >
                    Conheça
                  </a>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div 
                className="carousel-item"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&h=1080&fit=crop')`
                }}
              >
                <div className="carousel-overlay"></div>
                <div className="carousel-content">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white text-shadow">
                    Transforme Seu Negócio
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-white text-shadow">
                    Descubra nossas soluções para o agro.
                  </p>
                  <a 
                    href="https://wa.me/551732316000" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded font-semibold transition-colors"
                  >
                    Saiba Mais
                  </a>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div 
                className="carousel-item"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&h=1080&fit=crop')`
                }}
              >
                <div className="carousel-overlay"></div>
                <div className="carousel-content">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white text-shadow">
                    Inovação no Campo
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-white text-shadow">
                    Conheça nossa tecnologia de ponta.
                  </p>
                  <a 
                    href="https://wa.me/551732316000" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded font-semibold transition-colors"
                  >
                    Ver Mais
                  </a>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>

      {/* Agricultura & Produtos */}
      <section className="agriculture-section py-5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Imagens (Esquerda) */}
            <div className="text-center lg:text-left">
              <div className="image-container">
                <img 
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop" 
                  alt="Agriculture" 
                  className="main-image rounded-full w-full"
                />
                <img 
                  src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop" 
                  alt="Products" 
                  className="small-image"
                />
              </div>
            </div>

            {/* Texto (Direita) */}
            <div>
              <h4 className="section-title">Solo Rico</h4>
              <h2 className="section-heading">Cultivando soluções para uma agricultura de excelência</h2>
              <p className="section-subtitle">
                Solo Rico, a parceira do produtor rural <span className="highlight">no Brasil e no mundo.</span>
              </p>
              <p className="section-description">
                Na Solo Rico, acreditamos que o campo é mais do que terra e cultivo — é vida, história e
                progresso. Desde 1989, nossa missão tem sido apoiar o produtor rural, com foco especial no
                pequeno e médio agricultor, que impulsiona a economia local e garante a alimentação de inúmeras
                famílias.
              </p>
              <div className="icons-list">
                <div className="icon-item">
                  <i className="fas fa-seedling text-green-600 mr-2"></i>
                  <span>Fertilizantes foliares e via solo</span>
                </div>
                <div className="icon-item">
                  <i className="fas fa-seedling text-green-600 mr-2"></i>
                  <span>Adjuvantes</span>
                </div>
                <div className="icon-item">
                  <i className="fas fa-seedling text-green-600 mr-2"></i>
                  <span>Respeito ao produtor rural</span>
                </div>
                <div className="icon-item">
                  <i className="fas fa-seedling text-green-600 mr-2"></i>
                  <span>Cuidado com o solo e com as plantas</span>
                </div>
              </div>
              <Button asChild className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                <Link href="/empresa">Saiba Mais</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Desenvolvimento */}
      <section className="development-section">
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-heading">
            Há mais de 30 anos espalhando o verde pelo Brasil e agora também pelo mundo!
          </h2>
          <p className="development-text">
            Transformamos o cuidado com o solo em alta produtividade. Confie em quem entende do campo.
          </p>
        </div>
      </section>

      {/* Linhas de Produtos */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h4 className="section-title">Solo Rico</h4>
            <h2 className="section-heading text-gray-800">Linhas de Produtos</h2>
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
                <div className="image-wrapper">
                  <img 
                    src={line.image} 
                    alt={line.name} 
                    className="product-image"
                  />
                  <div className="product-title-overlay">
                    <h3>{line.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News & Blogs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h4 className="section-title">Solo Rico</h4>
            <h2 className="section-heading">News & Blogs</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post) => (
              <article key={post.id} className="blog-card">
                <img 
                  src={post.imageUrl || 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=250&fit=crop'} 
                  alt={post.title}
                />
                <div className="blog-body">
                  <span className="blog-badge">
                    {post.category}
                  </span>
                  <h3 className="blog-title">
                    {post.title}
                  </h3>
                  <p className="blog-description">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}