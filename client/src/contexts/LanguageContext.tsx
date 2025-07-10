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
    blog_heading: "News & Blogs"
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
    blog_heading: "News & Blogs"
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