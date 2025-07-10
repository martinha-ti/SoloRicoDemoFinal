import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { useLanguage } from "@/contexts/LanguageContext";
import { Droplets, Shield, Sprout, Snowflake } from "lucide-react";

export default function Home() {
  const { t } = useLanguage();
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

      {/* 1. Banner Carousel - Automático 5 segundos */}
      <div className="relative">
        <Carousel 
          className="w-full"
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
        >
          <CarouselContent>
            <CarouselItem>
              <div 
                className="carousel-item"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1920&h=1080&fit=crop')`
                }}
              >
                <div className="carousel-overlay"></div>
                <div className="carousel-content">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white text-shadow">
                    {t('hero_title')}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-white text-shadow">
                    {t('hero_subtitle')}
                  </p>
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                    {t('cta_know_more')}
                  </Button>
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
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                    {t('cta_learn_more')}
                  </Button>
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
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                    {t('cta_see_more')}
                  </Button>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>

      {/* 2. Seção Sobre a Empresa com Imagens Redondas */}
      <section className="agriculture-section">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Imagens Redondas (Esquerda) */}
            <div className="text-center lg:text-left">
              <div className="image-container">
                <img 
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop" 
                  alt="Agriculture" 
                  className="main-image w-full rounded-full"
                />
                <img 
                  src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop" 
                  alt="Products" 
                  className="small-image rounded-full"
                />
              </div>
            </div>

            {/* Texto (Direita) */}
            <div>
              <h4 className="section-title">{t('about_title')}</h4>
              <h2 className="section-heading">{t('about_heading')}</h2>
              <p className="section-subtitle">
                {t('about_subtitle')} <span className="highlight">{t('about_subtitle_highlight')}</span>
              </p>
              <p className="section-description">
                {t('about_description')}
              </p>
              <div className="icons-list">
                <div className="icon-item">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>{t('about_item1')}</span>
                </div>
                <div className="icon-item">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>{t('about_item2')}</span>
                </div>
                <div className="icon-item">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>{t('about_item3')}</span>
                </div>
                <div className="icon-item">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>{t('about_item4')}</span>
                </div>
              </div>
              <Button asChild className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 mt-6">
                <Link href="/empresa">{t('cta_learn_more')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Primeira Seção de Linhas de Produtos */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "TOP LIME PRO",
                subtitle: "LINHA DE ADJUVANTES",
                image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop",
                icon: Droplets
              },
              {
                name: "REVOLUTION",
                subtitle: "LINHA PROTECT",
                image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
                icon: Shield
              },
              {
                name: "GEL DE PLANTIO",
                subtitle: "LINHA TITANIUM SOLLUS",
                image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop",
                icon: Sprout
              },
              {
                name: "PROTETOR E700",
                subtitle: "LINHA PROTECT",
                image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop",
                icon: Snowflake
              }
            ].map((product) => {
              const IconComponent = product.icon;
              return (
                <div key={product.name} className="group cursor-pointer">
                  <div className="image-wrapper rounded-lg overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
                      <IconComponent className="w-12 h-12 mb-2 text-yellow-400" />
                      <h3 className="text-lg font-bold text-center">{product.name}</h3>
                      <p className="text-sm text-center">{product.subtitle}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Seção com Imagem de Fundo e Texto */}
      <section 
        className="py-20 text-center text-white relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&h=600&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-400">
            {t('development_title')}
          </h2>
          <p className="text-xl md:text-2xl leading-relaxed">
            {t('development_subtitle')}
          </p>
        </div>
      </section>

      {/* 5. Segunda Seção de Linhas de Produtos */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h4 className="section-title">{t('product_lines_title')}</h4>
            <h2 className="section-heading text-gray-800">{t('product_lines_heading')}</h2>
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
                    <h3 className="text-sm font-bold">{line.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Seção Blog */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h4 className="section-title">{t('blog_title')}</h4>
            <h2 className="section-heading">{t('blog_heading')}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <article className="blog-card cursor-pointer hover:shadow-lg transition-shadow">
                  <img 
                    src={post.imageUrl || 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=250&fit=crop'} 
                    alt={post.title}
                    className="w-full h-48 object-cover"
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
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}