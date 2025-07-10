import { createContext, useContext, useState, ReactNode } from "react";

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'pt',
  setLanguage: () => {},
  t: (key: string) => key
});

export const useLanguage = () => useContext(LanguageContext);

const translations = {
  pt: {
    // Navbar
    home: "HOME",
    company: "A EMPRESA", 
    forBusinesses: "PARA EMPRESAS",
    forYou: "PARA VOCÊ",
    comex: "COMEX",
    blog: "BLOG",
    customer_service: "ATENDIMENTO",
    franchise: "SEJA UM FRANQUEADO",
    careers: "TRABALHE CONOSCO",
    sac: "SAC",
    contact: "CONTATOS",
    
    // Home Page
    hero_title: "Cultivando soluções para uma agricultura de excelência",
    hero_subtitle: "Lado a lado com o produtor rural",
    cta_know_more: "Conheça",
    cta_learn_more: "Saiba Mais",
    cta_see_more: "Ver Mais",
    
    // About Section
    about_title: "Solo Rico",
    about_heading: "Cultivando soluções para uma agricultura de excelência",
    about_subtitle: "Solo Rico, a parceira do produtor rural",
    about_subtitle_highlight: "no Brasil e no mundo.",
    about_description: "Na Solo Rico, acreditamos que o campo é mais do que terra e cultivo — é vida, história e progresso. Desde 1989, nossa missão tem sido apoiar o produtor rural, com foco especial no pequeno e médio agricultor, que impulsiona a economia local e garante a alimentação de inúmeras famílias.",
    about_item1: "Fertilizantes foliares e via solo",
    about_item2: "Adjuvantes", 
    about_item3: "Respeito ao produtor rural",
    about_item4: "Cuidado com o solo e com as plantas",
    
    // Development Section
    development_title: "Há mais de 30 anos espalhando o verde pelo Brasil e agora também pelo mundo!",
    development_subtitle: "Transformamos o cuidado com o solo em alta produtividade. Confie em quem entende do campo.",
    
    // Product Lines
    product_lines_title: "Solo Rico",
    product_lines_heading: "Linhas de Produtos",
    
    // Blog
    blog_title: "Solo Rico",
    blog_heading: "News & Blogs",
    
    // For You Page
    for_you_title: "Para Você",
    for_you_subtitle: "Soluções especiais para pequenos produtores e uso doméstico",
    for_you_hero_title: "Cuidando do Seu Pequeno Plantio",
    for_you_hero_description: "Desenvolvemos produtos especiais para pequenos produtores, hortas domésticas e jardins, mantendo a mesma qualidade e eficiência dos nossos produtos profissionais.",
    for_you_cta_title: "Comece Hoje Mesmo!",
    for_you_cta_description: "Descubra como nossos produtos podem transformar sua horta ou jardim",
    
    // For Businesses Page
    for_businesses_title: "Para Empresas",
    for_businesses_subtitle: "Soluções completas para o agronegócio empresarial",
    for_businesses_hero_title: "Parceiro Estratégico do Seu Negócio",
    for_businesses_hero_description: "Há mais de 30 anos, a Solo Rico oferece soluções completas para empresas do agronegócio, combinando qualidade, inovação e suporte técnico especializado.",
    for_businesses_cta_title: "Pronto para Fazer Parte da Nossa Rede?",
    for_businesses_cta_description: "Entre em contato conosco e descubra como podemos ajudar sua empresa a crescer no agronegócio",
    
    // Comex Page
    comex_title: "Comércio Exterior",
    comex_subtitle: "Expandindo fronteiras, levando qualidade brasileira para o mundo",
    comex_hero_title: "Solo Rico Global",
    comex_hero_description: "Expandindo nossa presença internacional, levamos a qualidade e inovação dos fertilizantes Solo Rico para produtores rurais em diversos países, contribuindo para o desenvolvimento da agricultura mundial.",
    comex_stats_title: "Solo Rico no Mundo",
    comex_stats_description: "Números que demonstram nosso crescimento no mercado internacional",
    comex_cta_title: "Interessado em Nossos Produtos?",
    comex_cta_description: "Entre em contato conosco para conhecer nossas soluções de exportação e levar a qualidade Solo Rico para seu país",
    
    // Common
    contact_us: "Fale Conosco",
    whatsapp: "WhatsApp",
    see_details: "Ver Detalhes",
    our_products: "Nossos Produtos"
  },
  en: {
    // Navbar
    home: "HOME",
    company: "COMPANY",
    forBusinesses: "FOR BUSINESS", 
    forYou: "FOR YOU",
    comex: "COMEX",
    blog: "BLOG",
    customer_service: "CUSTOMER SERVICE",
    franchise: "BECOME A FRANCHISEE",
    careers: "WORK WITH US",
    sac: "CUSTOMER SERVICE",
    contact: "CONTACT",
    
    // Home Page
    hero_title: "Cultivating solutions for agricultural excellence",
    hero_subtitle: "Side by side with rural producers",
    cta_know_more: "Learn More",
    cta_learn_more: "Learn More",
    cta_see_more: "See More",
    
    // About Section
    about_title: "Solo Rico",
    about_heading: "Cultivating solutions for agricultural excellence",
    about_subtitle: "Solo Rico, partner of rural producers",
    about_subtitle_highlight: "in Brazil and worldwide.",
    about_description: "At Solo Rico, we believe that the field is more than land and cultivation — it's life, history and progress. Since 1989, our mission has been to support rural producers, with special focus on small and medium farmers, who drive the local economy and ensure food for countless families.",
    about_item1: "Foliar and soil fertilizers",
    about_item2: "Adjuvants",
    about_item3: "Respect for rural producers",
    about_item4: "Care for soil and plants",
    
    // Development Section
    development_title: "Over 30 years spreading green throughout Brazil and now also worldwide!",
    development_subtitle: "We transform soil care into high productivity. Trust those who understand the field.",
    
    // Product Lines
    product_lines_title: "Solo Rico",
    product_lines_heading: "Product Lines",
    
    // Blog
    blog_title: "Solo Rico",
    blog_heading: "News & Blogs",
    
    // For You Page
    for_you_title: "For You",
    for_you_subtitle: "Special solutions for small producers and home use",
    for_you_hero_title: "Caring for Your Small Planting",
    for_you_hero_description: "We develop special products for small producers, home gardens and gardens, maintaining the same quality and efficiency of our professional products.",
    for_you_cta_title: "Start Today!",
    for_you_cta_description: "Discover how our products can transform your garden or yard",
    
    // For Businesses Page
    for_businesses_title: "For Businesses",
    for_businesses_subtitle: "Complete solutions for business agribusiness",
    for_businesses_hero_title: "Strategic Partner of Your Business",
    for_businesses_hero_description: "For over 30 years, Solo Rico offers complete solutions for agribusiness companies, combining quality, innovation and specialized technical support.",
    for_businesses_cta_title: "Ready to Join Our Network?",
    for_businesses_cta_description: "Contact us and discover how we can help your company grow in agribusiness",
    
    // Comex Page
    comex_title: "Foreign Trade",
    comex_subtitle: "Expanding borders, bringing Brazilian quality to the world",
    comex_hero_title: "Solo Rico Global",
    comex_hero_description: "Expanding our international presence, we bring the quality and innovation of Solo Rico fertilizers to rural producers in several countries, contributing to the development of world agriculture.",
    comex_stats_title: "Solo Rico in the World",
    comex_stats_description: "Numbers that demonstrate our growth in the international market",
    comex_cta_title: "Interested in Our Products?",
    comex_cta_description: "Contact us to learn about our export solutions and bring Solo Rico quality to your country",
    
    // Common
    contact_us: "Contact Us",
    whatsapp: "WhatsApp",
    see_details: "See Details",
    our_products: "Our Products"
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState('pt');

  const t = (key: string) => {
    const translation = translations[language as keyof typeof translations];
    return translation[key as keyof typeof translation] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};