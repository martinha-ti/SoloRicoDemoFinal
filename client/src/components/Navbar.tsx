import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { name: t("home"), href: "/" },
    { name: t("company"), href: "/empresa" },
    { name: t("forBusinesses"), href: "/para-empresas" },
    { name: t("forYou"), href: "/para-voce" },
    { name: t("comex"), href: "/comex" },
    { name: t("blog"), href: "/blog" },
  ];

  const atendimentoItems = [
    { name: t("franchise"), href: "https://franquias.gruposolorico.com.br/", external: true },
    { name: t("careers"), href: "/trabalhe-conosco" },
    { name: t("sac"), href: "/sac" },
    { name: t("contact"), href: "/contatos" },
  ];

  return (
    <nav className="navbar">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-xl font-bold text-white">Solo Rico</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-link ${location === item.href ? 'active' : ''}`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Atendimento Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="nav-link p-0 h-auto font-medium">
                  {t("customer_service")}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {atendimentoItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    {item.external ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer">
                        {item.name}
                      </a>
                    ) : (
                      <Link href={item.href}>
                        {item.name}
                      </Link>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Admin Panel Link (hidden by default) */}
            <Link href="/admin" className="nav-link hidden sm:block text-xs opacity-50 hover:opacity-100">
              Admin
            </Link>
            
            {/* Seletor de Idioma - Último elemento */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="nav-link p-0 h-auto font-medium flex items-center">
                  <div className="w-6 h-4 mr-2 flex items-center justify-center text-xs font-bold rounded border" style={{
                    backgroundImage: language === 'pt' ? 
                      'linear-gradient(to bottom, #00a859 0%, #00a859 33%, #fff 33%, #fff 66%, #ffdf00 66%, #ffdf00 100%)' :
                      'linear-gradient(to bottom, #b22234 0%, #b22234 7%, #fff 7%, #fff 14%, #b22234 14%, #b22234 21%, #fff 21%, #fff 28%, #b22234 28%, #b22234 35%, #fff 35%, #fff 42%, #b22234 42%, #b22234 49%, #fff 49%, #fff 56%, #b22234 56%, #b22234 63%, #fff 63%, #fff 70%, #b22234 70%, #b22234 77%, #fff 77%, #fff 84%, #b22234 84%, #b22234 91%, #fff 91%, #fff 100%)',
                    position: 'relative'
                  }}>
                    {language === 'pt' ? 'BR' : 'US'}
                    {language === 'en' && (
                      <div className="absolute top-0 left-0 w-2 h-2 bg-blue-900" style={{
                        background: 'linear-gradient(135deg, #002868 0%, #002868 100%)'
                      }} />
                    )}
                  </div>
                  {language === 'pt' ? 'PT' : 'EN'}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLanguage('pt')}>
                  <div className="w-6 h-4 mr-2 flex items-center justify-center text-xs font-bold rounded border" style={{
                    backgroundImage: 'linear-gradient(to bottom, #00a859 0%, #00a859 33%, #fff 33%, #fff 66%, #ffdf00 66%, #ffdf00 100%)'
                  }}>
                    BR
                  </div>
                  Português
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  <div className="w-6 h-4 mr-2 flex items-center justify-center text-xs font-bold rounded border relative" style={{
                    backgroundImage: 'linear-gradient(to bottom, #b22234 0%, #b22234 7%, #fff 7%, #fff 14%, #b22234 14%, #b22234 21%, #fff 21%, #fff 28%, #b22234 28%, #b22234 35%, #fff 35%, #fff 42%, #b22234 42%, #b22234 49%, #fff 49%, #fff 56%, #b22234 56%, #b22234 63%, #fff 63%, #fff 70%, #b22234 70%, #b22234 77%, #fff 77%, #fff 84%, #b22234 84%, #b22234 91%, #fff 91%, #fff 100%)'
                  }}>
                    <div className="absolute top-0 left-0 w-2 h-2 bg-blue-900" style={{
                      background: 'linear-gradient(135deg, #002868 0%, #002868 100%)'
                    }} />
                    US
                  </div>
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-black bg-opacity-80 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 text-white hover:text-brand-green transition-colors ${
                    location === item.href ? 'text-brand-green font-semibold' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Atendimento Items */}
              <div className="border-t border-gray-600 pt-2">
                {atendimentoItems.map((item) => (
                  item.external ? (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-3 py-2 text-white hover:text-brand-green transition-colors"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 text-white hover:text-brand-green transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                ))}
              </div>

              {/* Mobile Language Selector */}
              <div className="border-t border-gray-600 pt-2">
                <button
                  onClick={() => setLanguage('pt')}
                  className="flex items-center w-full px-3 py-2 text-white hover:text-brand-green transition-colors"
                >
                  <div className="w-6 h-4 mr-2 flex items-center justify-center text-xs font-bold rounded border" style={{
                    backgroundImage: 'linear-gradient(to bottom, #00a859 0%, #00a859 33%, #fff 33%, #fff 66%, #ffdf00 66%, #ffdf00 100%)'
                  }}>
                    BR
                  </div>
                  Português
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className="flex items-center w-full px-3 py-2 text-white hover:text-brand-green transition-colors"
                >
                  <div className="w-6 h-4 mr-2 flex items-center justify-center text-xs font-bold rounded border relative" style={{
                    backgroundImage: 'linear-gradient(to bottom, #b22234 0%, #b22234 7%, #fff 7%, #fff 14%, #b22234 14%, #b22234 21%, #fff 21%, #fff 28%, #b22234 28%, #b22234 35%, #fff 35%, #fff 42%, #b22234 42%, #b22234 49%, #fff 49%, #fff 56%, #b22234 56%, #b22234 63%, #fff 63%, #fff 70%, #b22234 70%, #b22234 77%, #fff 77%, #fff 84%, #b22234 84%, #b22234 91%, #fff 91%, #fff 100%)'
                  }}>
                    <div className="absolute top-0 left-0 w-2 h-2 bg-blue-900" style={{
                      background: 'linear-gradient(135deg, #002868 0%, #002868 100%)'
                    }} />
                    US
                  </div>
                  English
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}