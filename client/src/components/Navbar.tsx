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

            {/* Seletor de Idioma - Último elemento */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="nav-link p-0 h-auto font-medium flex items-center">
                  <div className="w-6 h-4 mr-2 flex items-center justify-center text-xs font-bold bg-white text-gray-800 rounded border">
                    {language === 'pt' ? 'BR' : 'US'}
                  </div>
                  {language.toUpperCase()}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLanguage('pt')}>
                  <div className="w-6 h-4 mr-2 flex items-center justify-center text-xs font-bold bg-green-600 text-white rounded">
                    BR
                  </div>
                  Português
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  <div className="w-6 h-4 mr-2 flex items-center justify-center text-xs font-bold bg-blue-600 text-white rounded">
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
                  <span className="mr-2">🇧🇷</span> Português
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className="flex items-center w-full px-3 py-2 text-white hover:text-brand-green transition-colors"
                >
                  <span className="mr-2">🇺🇸</span> English
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}