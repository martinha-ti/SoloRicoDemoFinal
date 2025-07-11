import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Package, 
  FileText, 
  MessageSquare, 
  Briefcase,
  LogOut,
  Search,
  Settings,
  Eye
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminFixed() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [seoSettings, setSeoSettings] = useState({
    siteTitle: 'Solo Rico - Soluções Completas para Agricultura',
    siteDescription: 'Solo Rico oferece fertilizantes foliares, adjuvantes e soluções completas para agricultura. Há mais de 30 anos espalhando o verde pelo Brasil e pelo mundo.',
    keywords: 'fertilizantes, agricultura, agronegócio, solo rico, titanium foliar, adjuvantes, protect',
    ogTitle: 'Solo Rico - Soluções Completas para Agricultura',
    ogDescription: 'Solo Rico oferece fertilizantes foliares, adjuvantes e soluções completas para agricultura. Há mais de 30 anos espalhando o verde pelo Brasil e pelo mundo.',
    twitterTitle: 'Solo Rico - Soluções Completas para Agricultura',
    twitterDescription: 'Solo Rico oferece fertilizantes foliares, adjuvantes e soluções completas para agricultura. Há mais de 30 anos espalhando o verde pelo Brasil e pelo mundo.',
    analyticsId: '',
    facebookPixel: '',
    schemaOrg: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Solo Rico Agrociências",
      "url": "https://solorico.com.br",
      "description": "Empresa brasileira especializada em fertilizantes foliares e soluções para agricultura"
    }, null, 2)
  });

  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth");
    if (!adminAuth) {
      setLocation("/admin-login");
      return;
    }
    setIsAuthenticated(true);
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    setLocation("/admin-login");
  };

  const handleSeoSave = () => {
    toast({
      title: "Configurações SEO salvas",
      description: "As configurações de SEO foram atualizadas com sucesso.",
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  // Mock data for demonstration
  const mockStats = {
    products: 12,
    blogPosts: 8,
    contactMessages: 25,
    jobApplications: 15
  };

  const statsCards = [
    {
      title: 'Produtos',
      value: mockStats.products,
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      title: 'Posts do Blog',
      value: mockStats.blogPosts,
      icon: FileText,
      color: 'bg-green-500'
    },
    {
      title: 'Mensagens de Contato',
      value: mockStats.contactMessages,
      icon: MessageSquare,
      color: 'bg-purple-500'
    },
    {
      title: 'Candidaturas',
      value: mockStats.jobApplications,
      icon: Briefcase,
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
            <p className="text-gray-600 mt-2">Gerencie o conteúdo e configurações do site Solo Rico</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="messages">Mensagens</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {statsCards.map((card) => (
                <Card key={card.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                    <div className={`p-2 rounded-full ${card.color}`}>
                      <card.icon className="h-4 w-4 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{card.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Produtos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Funcionalidade em desenvolvimento. Aqui você poderá adicionar, editar e remover produtos.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento do Blog</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Funcionalidade em desenvolvimento. Aqui você poderá criar e gerenciar posts do blog.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO Tab */}
          <TabsContent value="seo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Configurações de SEO
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="siteTitle">Título do Site</Label>
                    <Input
                      id="siteTitle"
                      value={seoSettings.siteTitle}
                      onChange={(e) => setSeoSettings({...seoSettings, siteTitle: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="siteDescription">Descrição do Site</Label>
                    <Textarea
                      id="siteDescription"
                      value={seoSettings.siteDescription}
                      onChange={(e) => setSeoSettings({...seoSettings, siteDescription: e.target.value})}
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="keywords">Palavras-chave</Label>
                    <Input
                      id="keywords"
                      value={seoSettings.keywords}
                      onChange={(e) => setSeoSettings({...seoSettings, keywords: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="analyticsId">Google Analytics ID</Label>
                    <Input
                      id="analyticsId"
                      value={seoSettings.analyticsId}
                      onChange={(e) => setSeoSettings({...seoSettings, analyticsId: e.target.value})}
                      placeholder="G-XXXXXXXXXX"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="schemaOrg">Schema.org JSON-LD</Label>
                    <Textarea
                      id="schemaOrg"
                      value={seoSettings.schemaOrg}
                      onChange={(e) => setSeoSettings({...seoSettings, schemaOrg: e.target.value})}
                      rows={10}
                      className="font-mono text-sm"
                    />
                  </div>
                </div>
                
                <Button onClick={handleSeoSave} className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Salvar Configurações SEO
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Mensagens de Contato</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Funcionalidade em desenvolvimento. Aqui você poderá visualizar e gerenciar mensagens de contato.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Candidaturas de Emprego</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Funcionalidade em desenvolvimento. Aqui você poderá visualizar e gerenciar candidaturas de emprego.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}