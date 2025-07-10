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
import Contact from "@/pages/Contact";
import Sac from "@/pages/Sac";
import WorkWithUs from "@/pages/WorkWithUs";
import ProductDetail from "@/pages/ProductDetail";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/empresa" component={Company} />
        <Route path="/para-empresas" component={ForBusinesses} />
        <Route path="/para-voce" component={ForYou} />
        <Route path="/comex" component={Comex} />
        <Route path="/blog" component={Blog} />
        <Route path="/contatos" component={Contact} />
        <Route path="/sac" component={Sac} />
        <Route path="/trabalhe-conosco" component={WorkWithUs} />
        <Route path="/produto/:slug" component={ProductDetail} />
        <Route path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
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
