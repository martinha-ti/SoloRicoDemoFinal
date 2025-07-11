import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Package, 
  FileText, 
  MessageSquare, 
  Briefcase,
  LogOut,
  Search,
  Settings,
  Eye,
  Plus,
  Edit,
  Trash2,
  Save
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertProductSchema, type Product, type InsertProduct } from '@shared/schema';

export default function AdminFixed() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const queryClient = useQueryClient();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
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

  const handleCreateProduct = () => {
    setEditingProduct(null);
    productForm.reset();
    setIsProductDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    productForm.reset({
      name: product.name,
      slug: product.slug,
      description: product.description || '',
      shortDescription: product.shortDescription || '',
      price: product.price || 0,
      category: product.category || '',
      benefits: product.benefits || [],
      imageUrl: product.imageUrl || '',
      featured: product.featured || false,
      active: product.active !== false,
    });
    setIsProductDialogOpen(true);
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('Tem certeza que deseja deletar este produto?')) {
      deleteProductMutation.mutate(id);
    }
  };

  const onSubmitProduct = (data: InsertProduct) => {
    // Generate slug from name if not provided
    if (!data.slug) {
      data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    
    // Parse benefits if it's a string
    if (typeof data.benefits === 'string') {
      data.benefits = data.benefits.split(',').map(b => b.trim()).filter(Boolean);
    }

    if (editingProduct) {
      updateProductMutation.mutate({ id: editingProduct.id, product: data });
    } else {
      createProductMutation.mutate(data);
    }
  };

  // Fetch products data
  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    enabled: isAuthenticated,
  });

  // Product form
  const productForm = useForm<InsertProduct>({
    resolver: zodResolver(insertProductSchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      shortDescription: '',
      price: 0,
      category: '',
      benefits: [],
      imageUrl: '',
      featured: false,
      active: true,
    },
  });

  // Create product mutation
  const createProductMutation = useMutation({
    mutationFn: async (product: InsertProduct) => {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error('Erro ao criar produto');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({
        title: "Produto criado",
        description: "O produto foi criado com sucesso.",
      });
      setIsProductDialogOpen(false);
      productForm.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Update product mutation
  const updateProductMutation = useMutation({
    mutationFn: async ({ id, product }: { id: number; product: InsertProduct }) => {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error('Erro ao atualizar produto');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({
        title: "Produto atualizado",
        description: "O produto foi atualizado com sucesso.",
      });
      setIsProductDialogOpen(false);
      setEditingProduct(null);
      productForm.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao deletar produto');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({
        title: "Produto deletado",
        description: "O produto foi deletado com sucesso.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (!isAuthenticated) {
    return null;
  }

  // Mock data for demonstration
  const mockStats = {
    products: products.length,
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
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Gerenciamento de Produtos</CardTitle>
                <Button onClick={handleCreateProduct} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Novo Produto
                </Button>
              </CardHeader>
              <CardContent>
                {productsLoading ? (
                  <div className="flex items-center justify-center p-8">
                    <div className="text-gray-500">Carregando produtos...</div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {products.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        Nenhum produto cadastrado. Clique em "Novo Produto" para adicionar.
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        {products.map((product) => (
                          <Card key={product.id} className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="font-semibold text-lg">{product.name}</h3>
                                  {product.featured && (
                                    <Badge variant="secondary">Destaque</Badge>
                                  )}
                                  {!product.active && (
                                    <Badge variant="destructive">Inativo</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{product.shortDescription}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                  <span>Categoria: {product.category}</span>
                                  {product.price && <span>R$ {product.price.toFixed(2)}</span>}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditProduct(product)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Product Dialog */}
            <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingProduct ? 'Editar Produto' : 'Novo Produto'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={productForm.handleSubmit(onSubmitProduct)} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Nome do Produto</Label>
                      <Input
                        id="name"
                        {...productForm.register('name')}
                        placeholder="Ex: Fertilizante Foliar Premium"
                      />
                      {productForm.formState.errors.name && (
                        <p className="text-sm text-red-600">{productForm.formState.errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="slug">Slug (URL)</Label>
                      <Input
                        id="slug"
                        {...productForm.register('slug')}
                        placeholder="fertilizante-foliar-premium"
                      />
                      {productForm.formState.errors.slug && (
                        <p className="text-sm text-red-600">{productForm.formState.errors.slug.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="shortDescription">Descrição Curta</Label>
                    <Textarea
                      id="shortDescription"
                      {...productForm.register('shortDescription')}
                      placeholder="Descrição resumida do produto"
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Descrição Completa</Label>
                    <Textarea
                      id="description"
                      {...productForm.register('description')}
                      placeholder="Descrição detalhada do produto"
                      rows={4}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="category">Categoria</Label>
                      <Select
                        value={productForm.watch('category')}
                        onValueChange={(value) => productForm.setValue('category', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fertilizantes">Fertilizantes</SelectItem>
                          <SelectItem value="adjuvantes">Adjuvantes</SelectItem>
                          <SelectItem value="biofertilizantes">Biofertilizantes</SelectItem>
                          <SelectItem value="defensivos">Defensivos</SelectItem>
                          <SelectItem value="sementes">Sementes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="price">Preço (R$)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        {...productForm.register('price', { valueAsNumber: true })}
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="imageUrl">URL da Imagem</Label>
                    <Input
                      id="imageUrl"
                      {...productForm.register('imageUrl')}
                      placeholder="https://exemplo.com/imagem.jpg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="benefits">Benefícios (separados por vírgula)</Label>
                    <Textarea
                      id="benefits"
                      {...productForm.register('benefits')}
                      placeholder="Aumento da produtividade, Melhora da qualidade, Resistência a doenças"
                      rows={3}
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        id="featured"
                        type="checkbox"
                        {...productForm.register('featured')}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor="featured">Produto em destaque</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        id="active"
                        type="checkbox"
                        {...productForm.register('active')}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor="active">Produto ativo</Label>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsProductDialogOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      disabled={createProductMutation.isPending || updateProductMutation.isPending}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {editingProduct ? 'Atualizar' : 'Criar'} Produto
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
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