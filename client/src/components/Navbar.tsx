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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { name: "HOME", href: "/" },
    { name: "A EMPRESA", href: "/empresa" },
    { name: "PARA EMPRESAS", href: "/para-empresas" },
    { name: "PARA VOCÊ", href: "/para-voce" },
    { name: "COMEX", href: "/comex" },
    { name: "BLOG", href: "/blog" },
  ];

  const atendimentoItems = [
    { name: "SEJA UM FRANQUEADO", href: "https://franquias.gruposolorico.com.br/", external: true },
    { name: "TRABALHE CONOSCO", href: "/trabalhe-conosco" },
    { name: "SAC", href: "/sac" },
    { name: "CONTATOS", href: "/contatos" },
  ];

  return (
    <nav className="navbar">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-xl font-bold text-white">Solo Rico</div>
          </Link>

          {/* Seletor de Idioma */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-1 text-white hover:text-brand-green-light transition-colors">
                <span>🇧🇷</span>
                <span className="text-sm">PT</span>
              </button>
              <span className="text-gray-300">|</span>
              <button className="flex items-center space-x-1 text-white hover:text-brand-green-light transition-colors">
                <span>🇺🇸</span>
                <span className="text-sm">EN</span>
              </button>
            </div>
          </div>

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
                  ATENDIMENTO
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
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}