import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Company from "@/pages/Company";
import ForBusinesses from "@/pages/ForBusinesses";
import ForYou from "@/pages/ForYou";
import Comex from "@/pages/Comex";
import Blog from "@/pages/Blog";
import BlogPostSimple from "@/pages/BlogPostSimple";
import Contact from "@/pages/Contact";
import Sac from "@/pages/Sac";
import WorkWithUs from "@/pages/WorkWithUs";
import ProductDetail from "@/pages/ProductDetail";
import ProductCategory from "@/pages/ProductCategory";
import AdminFixed from "@/pages/AdminFixed";
import AdminPanel from "@/pages/AdminPanel";
import AdminLogin from "@/pages/AdminLogin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      {/* Admin routes without layout */}
      <Route path="/admin-login" component={AdminLogin} />
      <Route path="/admin-panel" component={AdminPanel} />
      
      {/* Main site routes */}
      <Route path="/" component={Home} />
      <Route path="/empresa" component={Company} />
      <Route path="/para-empresas" component={ForBusinesses} />
      <Route path="/para-voce" component={ForYou} />
      <Route path="/comex" component={Comex} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPostSimple} />
      <Route path="/contatos" component={Contact} />
      <Route path="/sac" component={Sac} />
      <Route path="/trabalhe-conosco" component={WorkWithUs} />
      <Route path="/produtos/:category" component={ProductCategory} />
      <Route path="/produto/:slug" component={ProductDetail} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
