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
            <img 
              src="https://www.solorico.com.br/assets/img/logo-branco-solo-rico-topo.png" 
              alt="Solo Rico Logo" 
              className="h-12 w-auto max-w-[120px]"
            />
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

            <Link href="#" className="nav-link">LOJA</Link>
            
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="nav-link p-0 h-auto font-medium flex items-center">
                  <img src="https://flagcdn.com/w20/br.png" alt="Brasil" className="w-5 h-auto mr-2" />
                  Brasil
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <img src="https://flagcdn.com/w20/br.png" alt="Brasil" className="w-4 h-auto mr-2" />
                  Português
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <img src="https://flagcdn.com/w20/us.png" alt="English" className="w-4 h-auto mr-2" />
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t">
            <div className="flex flex-col space-y-4 mt-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`nav-link ${location === item.href ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="border-t pt-4">
                <p className="text-brand-green font-medium mb-2">ATENDIMENTO</p>
                {atendimentoItems.map((item) => (
                  <div key={item.name} className="ml-4">
                    {item.external ? (
                      <a 
                        href={item.href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="nav-link block py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link 
                        href={item.href} 
                        className="nav-link block py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
              
              <Link href="#" className="nav-link" onClick={() => setIsOpen(false)}>
                LOJA
              </Link>
              
              {/* Language selector for mobile */}
              <div className="border-t pt-4">
                <div className="flex items-center space-x-2 text-white py-2">
                  <img src="https://flagcdn.com/w20/br.png" alt="Brasil" className="w-5 h-auto" />
                  <span className="text-sm">Brasil</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
