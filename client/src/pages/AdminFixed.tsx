import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { insertProductSchema, insertBlogPostSchema, insertAdminSchema, type Product, type InsertProduct, type BlogPost, type InsertBlogPost, type Admin, type InsertAdmin } from '@shared/schema';

export default function AdminFixed() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const queryClient = useQueryClient();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);
  const [isBlogDialogOpen, setIsBlogDialogOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false);
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
      features: product.features || '',
      benefits: Array.isArray(product.benefits) ? product.benefits : [],
      usage: product.usage || '',
      composition: product.composition || '',
      technicalSpecs: product.technicalSpecs || '',
      category: product.category || '',
      imageUrl: product.imageUrl || '',
      gallery: Array.isArray(product.gallery) ? product.gallery : [],
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

    // Parse gallery if it's a string
    if (typeof data.gallery === 'string') {
      data.gallery = data.gallery.split(',').map(g => g.trim()).filter(Boolean);
    }

    if (editingProduct) {
      updateProductMutation.mutate({ id: editingProduct.id, product: data });
    } else {
      createProductMutation.mutate(data);
    }
  };

  const handleCreateBlogPost = () => {
    setEditingBlogPost(null);
    blogForm.reset();
    setIsBlogDialogOpen(true);
  };

  const handleEditBlogPost = (blogPost: BlogPost) => {
    setEditingBlogPost(blogPost);
    blogForm.reset({
      title: blogPost.title,
      slug: blogPost.slug,
      excerpt: blogPost.excerpt || '',
      content: blogPost.content || '',
      category: blogPost.category || '',
      imageUrl: blogPost.imageUrl || '',
      published: blogPost.published !== false,
    });
    setIsBlogDialogOpen(true);
  };

  const handleDeleteBlogPost = (id: number) => {
    if (confirm('Tem certeza que deseja deletar este post do blog?')) {
      deleteBlogPostMutation.mutate(id);
    }
  };

  const onSubmitBlogPost = (data: InsertBlogPost) => {
    // Generate slug from title if not provided
    if (!data.slug) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    if (editingBlogPost) {
      updateBlogPostMutation.mutate({ id: editingBlogPost.id, blogPost: data });
    } else {
      createBlogPostMutation.mutate(data);
    }
  };

  const handleCreateAdmin = () => {
    setEditingAdmin(null);
    adminForm.reset();
    setIsAdminDialogOpen(true);
  };

  const handleEditAdmin = (admin: Admin) => {
    setEditingAdmin(admin);
    adminForm.reset({
      name: admin.name,
      role: admin.role,
      username: admin.username,
      password: '', // Não carregar senha por segurança
      isActive: admin.isActive !== false,
    });
    setIsAdminDialogOpen(true);
  };

  const handleDeleteAdmin = (id: number) => {
    if (confirm('Tem certeza que deseja deletar este usuário?')) {
      deleteAdminMutation.mutate(id);
    }
  };

  const onSubmitAdmin = (data: InsertAdmin) => {
    if (editingAdmin) {
      updateAdminMutation.mutate({ id: editingAdmin.id, admin: data });
    } else {
      createAdminMutation.mutate(data);
    }
  };

  // Fetch products data
  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    enabled: isAuthenticated,
  });

  // Fetch blog posts data
  const { data: blogPosts = [], isLoading: blogPostsLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
    enabled: isAuthenticated,
  });

  // Fetch admin users data
  const { data: adminUsers = [], isLoading: adminUsersLoading } = useQuery<Admin[]>({
    queryKey: ['/api/admin/users'],
    enabled: isAuthenticated,
  });

  // Product form
  const productForm = useForm<InsertProduct>({
    resolver: zodResolver(insertProductSchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      features: '',
      benefits: [],
      usage: '',
      composition: '',
      technicalSpecs: '',
      category: '',
      imageUrl: '',
      gallery: [],
      active: true,
    },
  });

  // Blog post form
  const blogForm = useForm<InsertBlogPost>({
    resolver: zodResolver(insertBlogPostSchema),
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: '',
      imageUrl: '',
      published: true,
    },
  });

  // Admin user form
  const adminForm = useForm<InsertAdmin>({
    resolver: zodResolver(insertAdminSchema),
    defaultValues: {
      name: '',
      role: 'editor',
      username: '',
      password: '',
      isActive: true,
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

  // Create blog post mutation
  const createBlogPostMutation = useMutation({
    mutationFn: async (blogPost: InsertBlogPost) => {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogPost),
      });
      if (!response.ok) throw new Error('Erro ao criar post do blog');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
      toast({
        title: "Post criado",
        description: "O post do blog foi criado com sucesso.",
      });
      setIsBlogDialogOpen(false);
      blogForm.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Update blog post mutation
  const updateBlogPostMutation = useMutation({
    mutationFn: async ({ id, blogPost }: { id: number; blogPost: InsertBlogPost }) => {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogPost),
      });
      if (!response.ok) throw new Error('Erro ao atualizar post do blog');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
      toast({
        title: "Post atualizado",
        description: "O post do blog foi atualizado com sucesso.",
      });
      setIsBlogDialogOpen(false);
      setEditingBlogPost(null);
      blogForm.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete blog post mutation
  const deleteBlogPostMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao deletar post do blog');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
      toast({
        title: "Post deletado",
        description: "O post do blog foi deletado com sucesso.",
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

  // Create admin user mutation
  const createAdminMutation = useMutation({
    mutationFn: async (admin: InsertAdmin) => {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(admin),
      });
      if (!response.ok) throw new Error('Erro ao criar usuário');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      toast({
        title: "Usuário criado",
        description: "O usuário foi criado com sucesso.",
      });
      setIsAdminDialogOpen(false);
      adminForm.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Update admin user mutation
  const updateAdminMutation = useMutation({
    mutationFn: async ({ id, admin }: { id: number; admin: InsertAdmin }) => {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(admin),
      });
      if (!response.ok) throw new Error('Erro ao atualizar usuário');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      toast({
        title: "Usuário atualizado",
        description: "O usuário foi atualizado com sucesso.",
      });
      setIsAdminDialogOpen(false);
      setEditingAdmin(null);
      adminForm.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete admin user mutation
  const deleteAdminMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao deletar usuário');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      toast({
        title: "Usuário deletado",
        description: "O usuário foi deletado com sucesso.",
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

  // Stats data
  const stats = {
    products: products.length,
    blogPosts: blogPosts.length,
    adminUsers: adminUsers.length,
    notifications: 5
  };

  if (!isAuthenticated) {
    return null;
  }

  const statsCards = [
    {
      title: 'Produtos',
      value: stats.products,
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      title: 'Posts do Blog',
      value: stats.blogPosts,
      icon: FileText,
      color: 'bg-green-500'
    },
    {
      title: 'Usuários',
      value: stats.adminUsers,
      icon: Settings,
      color: 'bg-purple-500'
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>

          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                          <SelectItem value="Adjuvantes">Adjuvantes</SelectItem>
                          <SelectItem value="Protect">Protect</SelectItem>
                          <SelectItem value="Titanium Sollus">Titanium Sollus</SelectItem>
                          <SelectItem value="Fertilizantes">Fertilizantes</SelectItem>
                          <SelectItem value="Biofertilizantes">Biofertilizantes</SelectItem>
                          <SelectItem value="Defensivos">Defensivos</SelectItem>
                          <SelectItem value="Sementes">Sementes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="imageUrl">URL da Imagem Principal</Label>
                      <Input
                        id="imageUrl"
                        {...productForm.register('imageUrl')}
                        placeholder="https://exemplo.com/imagem.jpg"
                      />
                    </div>
                  </div>



                  <div>
                    <Label htmlFor="features">Características (separadas por vírgula)</Label>
                    <Textarea
                      id="features"
                      {...productForm.register('features')}
                      placeholder="pH neutro, Compatível com defensivos, Baixa espuma, Fácil aplicação"
                      rows={2}
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

                  <div>
                    <Label htmlFor="usage">Modo de Uso</Label>
                    <Textarea
                      id="usage"
                      {...productForm.register('usage')}
                      placeholder="Aplicar 50-100ml por 100 litros de água. Misturar bem antes da aplicação..."
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="composition">Composição</Label>
                    <Textarea
                      id="composition"
                      {...productForm.register('composition')}
                      placeholder="Surfactante não-iônico 25%, Acidificante 15%, Veículo q.s.p. 100%"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="technicalSpecs">Especificações Técnicas</Label>
                    <Textarea
                      id="technicalSpecs"
                      {...productForm.register('technicalSpecs')}
                      placeholder="pH: 6.5-7.5, Densidade: 1.02 g/cm³, Temperatura de armazenamento: 5-35°C"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="gallery">Galeria de Imagens (URLs separadas por vírgula)</Label>
                    <Textarea
                      id="gallery"
                      {...productForm.register('gallery')}
                      placeholder="https://exemplo.com/imagem1.jpg, https://exemplo.com/imagem2.jpg"
                      rows={2}
                    />
                  </div>

                  <div className="flex items-center gap-4">
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
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Gerenciamento do Blog</CardTitle>
                <Button onClick={handleCreateBlogPost} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Novo Post
                </Button>
              </CardHeader>
              <CardContent>
                {blogPostsLoading ? (
                  <div className="flex items-center justify-center p-8">
                    <div className="text-gray-500">Carregando posts do blog...</div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {blogPosts.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        Nenhum post cadastrado. Clique em "Novo Post" para adicionar.
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        {blogPosts.map((post) => (
                          <Card key={post.id} className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="font-semibold text-lg">{post.title}</h3>
                                  {!post.published && (
                                    <Badge variant="outline">Rascunho</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{post.excerpt}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                  <span>Categoria: {post.category}</span>
                                  <span>Data: {new Date(post.createdAt).toLocaleDateString('pt-BR')}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditBlogPost(post)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteBlogPost(post.id)}
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

            {/* Blog Post Dialog */}
            <Dialog open={isBlogDialogOpen} onOpenChange={setIsBlogDialogOpen}>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingBlogPost ? 'Editar Post do Blog' : 'Novo Post do Blog'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={blogForm.handleSubmit(onSubmitBlogPost)} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="title">Título do Post</Label>
                      <Input
                        id="title"
                        {...blogForm.register('title')}
                        placeholder="Ex: Novas Técnicas de Plantio"
                      />
                      {blogForm.formState.errors.title && (
                        <p className="text-sm text-red-600">{blogForm.formState.errors.title.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="slug">Slug (URL)</Label>
                      <Input
                        id="slug"
                        {...blogForm.register('slug')}
                        placeholder="novas-tecnicas-plantio"
                      />
                      {blogForm.formState.errors.slug && (
                        <p className="text-sm text-red-600">{blogForm.formState.errors.slug.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="excerpt">Resumo</Label>
                    <Textarea
                      id="excerpt"
                      {...blogForm.register('excerpt')}
                      placeholder="Resumo do post que aparecerá na listagem"
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Conteúdo</Label>
                    <Textarea
                      id="content"
                      {...blogForm.register('content')}
                      placeholder="Conteúdo completo do post"
                      rows={8}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="category">Categoria</Label>
                      <Select
                        value={blogForm.watch('category')}
                        onValueChange={(value) => blogForm.setValue('category', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="agronegocio">Agronegócio</SelectItem>
                          <SelectItem value="tecnologia">Tecnologia</SelectItem>
                          <SelectItem value="sustentabilidade">Sustentabilidade</SelectItem>
                          <SelectItem value="mercado">Mercado</SelectItem>
                          <SelectItem value="inovacao">Inovação</SelectItem>
                          <SelectItem value="dicas">Dicas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="imageUrl">URL da Imagem</Label>
                      <Input
                        id="imageUrl"
                        {...blogForm.register('imageUrl')}
                        placeholder="https://exemplo.com/imagem.jpg"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      id="published"
                      type="checkbox"
                      {...blogForm.register('published')}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="published">Publicar post</Label>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsBlogDialogOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      disabled={createBlogPostMutation.isPending || updateBlogPostMutation.isPending}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {editingBlogPost ? 'Atualizar' : 'Criar'} Post
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Usuários Administrativos</CardTitle>
                    <CardDescription>Gerencie usuários com acesso ao painel administrativo</CardDescription>
                  </div>
                  <Button onClick={handleCreateAdmin} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Novo Usuário
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {adminUsersLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {adminUsers.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        Nenhum usuário cadastrado. Clique em "Novo Usuário" para adicionar.
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        {adminUsers.map((user) => (
                          <Card key={user.id} className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="font-semibold text-lg">{user.name}</h3>
                                  <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                                    {user.role === 'admin' ? 'Administrador' : 'Editor'}
                                  </Badge>
                                  {!user.isActive && (
                                    <Badge variant="outline">Inativo</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mb-2">@{user.username}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                  <span>Criado em: {new Date(user.createdAt).toLocaleDateString('pt-BR')}</span>
                                  <span>Última atualização: {new Date(user.updatedAt).toLocaleDateString('pt-BR')}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditAdmin(user)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteAdmin(user.id)}
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

            {/* Admin User Dialog */}
            <Dialog open={isAdminDialogOpen} onOpenChange={setIsAdminDialogOpen}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingAdmin ? 'Editar Usuário' : 'Novo Usuário'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={adminForm.handleSubmit(onSubmitAdmin)} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      {...adminForm.register('name')}
                      placeholder="Ex: João Silva"
                    />
                    {adminForm.formState.errors.name && (
                      <p className="text-sm text-red-600">{adminForm.formState.errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="username">Nome de Usuário</Label>
                    <Input
                      id="username"
                      {...adminForm.register('username')}
                      placeholder="Ex: joao.silva"
                    />
                    {adminForm.formState.errors.username && (
                      <p className="text-sm text-red-600">{adminForm.formState.errors.username.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      {...adminForm.register('password')}
                      placeholder={editingAdmin ? "Deixe em branco para manter a senha atual" : "Digite uma senha segura"}
                    />
                    {adminForm.formState.errors.password && (
                      <p className="text-sm text-red-600">{adminForm.formState.errors.password.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="role">Nível de Acesso</Label>
                    <Select
                      value={adminForm.watch('role')}
                      onValueChange={(value) => adminForm.setValue('role', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o nível de acesso" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrador</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                      </SelectContent>
                    </Select>
                    {adminForm.formState.errors.role && (
                      <p className="text-sm text-red-600">{adminForm.formState.errors.role.message}</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      id="isActive"
                      type="checkbox"
                      {...adminForm.register('isActive')}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="isActive">Usuário ativo</Label>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAdminDialogOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit">
                      {editingAdmin ? 'Atualizar' : 'Criar'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
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


        </Tabs>
      </div>
    </div>
  );
}