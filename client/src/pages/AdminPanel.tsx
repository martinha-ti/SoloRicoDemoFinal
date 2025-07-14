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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Package, 
  FileText, 
  Settings,
  LogOut,
  Eye,
  Plus,
  Edit,
  Trash2,
  Save
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { insertProductSchema, insertBlogPostSchema, insertAdminSchema, type Product, type InsertProduct, type BlogPost, type InsertBlogPost, type Admin, type InsertAdmin } from '@shared/schema';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const queryClient = useQueryClient();
  
  // Dialog states
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);
  const [isBlogDialogOpen, setIsBlogDialogOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false);

  // SEO Settings
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

  // Fetch data
  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    enabled: isAuthenticated,
  });

  const { data: blogPosts = [], isLoading: blogPostsLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
    enabled: isAuthenticated,
  });

  const { data: admins = [], isLoading: adminsLoading } = useQuery<Admin[]>({
    queryKey: ['/api/admin/users'],
    enabled: isAuthenticated,
  });

  const { data: productLines = [], isLoading: productLinesLoading } = useQuery<Product[]>({
    queryKey: ['/api/admin/product-lines'],
    enabled: isAuthenticated,
  });

  // Forms
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

  const adminForm = useForm<InsertAdmin>({
    resolver: zodResolver(insertAdminSchema),
    defaultValues: {
      name: '',
      role: 'admin',
      username: '',
      password: '',
      isActive: true,
    },
  });

  // Product mutations
  const createProductMutation = useMutation({
    mutationFn: async (product: InsertProduct) => {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error('Failed to create product');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      setIsProductDialogOpen(false);
      productForm.reset();
      toast({ title: "Produto criado", description: "O produto foi criado com sucesso." });
    },
    onError: (error) => {
      toast({ title: "Erro ao criar produto", description: error.message, variant: "destructive" });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async ({ id, product }: { id: number; product: InsertProduct }) => {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error('Failed to update product');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      setIsProductDialogOpen(false);
      productForm.reset();
      toast({ title: "Produto atualizado", description: "O produto foi atualizado com sucesso." });
    },
    onError: (error) => {
      toast({ title: "Erro ao atualizar produto", description: error.message, variant: "destructive" });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete product');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({ title: "Produto deletado", description: "O produto foi deletado com sucesso." });
    },
    onError: (error) => {
      toast({ title: "Erro ao deletar produto", description: error.message, variant: "destructive" });
    },
  });

  // Blog mutations
  const createBlogPostMutation = useMutation({
    mutationFn: async (blogPost: InsertBlogPost) => {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogPost),
      });
      if (!response.ok) throw new Error('Failed to create blog post');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
      setIsBlogDialogOpen(false);
      blogForm.reset();
      toast({ title: "Post criado", description: "O post do blog foi criado com sucesso." });
    },
    onError: (error) => {
      toast({ title: "Erro ao criar post", description: error.message, variant: "destructive" });
    },
  });

  const updateBlogPostMutation = useMutation({
    mutationFn: async ({ id, blogPost }: { id: number; blogPost: InsertBlogPost }) => {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogPost),
      });
      if (!response.ok) throw new Error('Failed to update blog post');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
      setIsBlogDialogOpen(false);
      blogForm.reset();
      toast({ title: "Post atualizado", description: "O post do blog foi atualizado com sucesso." });
    },
    onError: (error) => {
      toast({ title: "Erro ao atualizar post", description: error.message, variant: "destructive" });
    },
  });

  const deleteBlogPostMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete blog post');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
      toast({ title: "Post deletado", description: "O post do blog foi deletado com sucesso." });
    },
    onError: (error) => {
      toast({ title: "Erro ao deletar post", description: error.message, variant: "destructive" });
    },
  });

  // Admin mutations
  const createAdminMutation = useMutation({
    mutationFn: async (admin: InsertAdmin) => {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(admin),
      });
      if (!response.ok) throw new Error('Failed to create admin');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      setIsAdminDialogOpen(false);
      adminForm.reset();
      toast({ title: "Usuário criado", description: "O usuário foi criado com sucesso." });
    },
    onError: (error) => {
      toast({ title: "Erro ao criar usuário", description: error.message, variant: "destructive" });
    },
  });

  const updateAdminMutation = useMutation({
    mutationFn: async ({ id, admin }: { id: number; admin: InsertAdmin }) => {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(admin),
      });
      if (!response.ok) throw new Error('Failed to update admin');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      setIsAdminDialogOpen(false);
      adminForm.reset();
      toast({ title: "Usuário atualizado", description: "O usuário foi atualizado com sucesso." });
    },
    onError: (error) => {
      toast({ title: "Erro ao atualizar usuário", description: error.message, variant: "destructive" });
    },
  });

  const deleteAdminMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete admin');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      toast({ title: "Usuário deletado", description: "O usuário foi deletado com sucesso." });
    },
    onError: (error) => {
      toast({ title: "Erro ao deletar usuário", description: error.message, variant: "destructive" });
    },
  });

  // Event handlers
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
    toast({ title: "Logout realizado", description: "Você foi desconectado com sucesso." });
    setLocation("/admin-login");
  };

  const handleSeoSave = () => {
    toast({ title: "Configurações SEO salvas", description: "As configurações de SEO foram atualizadas com sucesso." });
  };

  // Product handlers
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

  // Blog handlers
  const handleCreateBlogPost = () => {
    setEditingBlogPost(null);
    blogForm.reset();
    setIsBlogDialogOpen(true);
  };

  const handleEditBlogPost = (blogPost: BlogPost) => {
    setEditingBlogPost(blogPost);
    
    // Format date for datetime-local input
    const publishedDate = new Date(blogPost.publishedAt);
    const formattedDate = publishedDate.toISOString().slice(0, 16);
    
    blogForm.reset({
      title: blogPost.title,
      slug: blogPost.slug,
      excerpt: blogPost.excerpt || '',
      content: blogPost.content || '',
      category: blogPost.category || '',
      imageUrl: blogPost.imageUrl || '',
      publishedAt: formattedDate,
      isActive: blogPost.isActive !== false,
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

    // Convert publishedAt string to ISO format for database
    if (data.publishedAt) {
      data.publishedAt = new Date(data.publishedAt).toISOString();
    }

    if (editingBlogPost) {
      updateBlogPostMutation.mutate({ id: editingBlogPost.id, blogPost: data });
    } else {
      createBlogPostMutation.mutate(data);
    }
  };

  // Admin handlers
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

  // Stats calculation
  const stats = {
    totalProducts: products.length,
    activeProducts: products.filter(p => p.active).length,
    totalBlogPosts: blogPosts.length,
    publishedBlogPosts: blogPosts.filter(p => p.published).length,
    adminUsers: admins.length,
    activeAdmins: admins.filter(a => a.isActive).length,
  };

  const statsCards = [
    {
      title: 'Total de Produtos',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      title: 'Posts do Blog',
      value: stats.totalBlogPosts,
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

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo - Solo Rico</h1>
            <p className="text-gray-600 mt-2">Gerencie o conteúdo e configurações do site</p>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => window.open('/', '_blank')}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              Ver Site
            </Button>
            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="product-lines">Linhas</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
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
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog" className="space-y-6">
            {/* Blog Categories Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {(() => {
                const categories = blogPosts.reduce((acc, post) => {
                  acc[post.category] = (acc[post.category] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>);
                
                return Object.entries(categories).map(([category, count]) => (
                  <Card key={category}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">{category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{count}</div>
                      <p className="text-xs text-gray-500">posts</p>
                    </CardContent>
                  </Card>
                ));
              })()}
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Gerenciamento de Blog</CardTitle>
                <Button onClick={handleCreateBlogPost} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Novo Post
                </Button>
              </CardHeader>
              <CardContent>
                {blogPostsLoading ? (
                  <div className="flex items-center justify-center p-8">
                    <div className="text-gray-500">Carregando posts...</div>
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
                                    <Badge variant="destructive">Rascunho</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{post.excerpt}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                  <span>Categoria: {post.category}</span>
                                  <span>Publicado: {new Date(post.publishedAt).toLocaleDateString()}</span>
                                  {!post.isActive && (
                                    <Badge variant="secondary">Inativo</Badge>
                                  )}
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
          </TabsContent>

          {/* Product Lines Tab */}
          <TabsContent value="product-lines" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Linhas de Produtos</CardTitle>
                <CardDescription>
                  Configure as 5 linhas principais de produtos e seus sub-produtos relacionados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {productLinesLoading ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Carregando linhas de produtos...</p>
                    </div>
                  ) : (
                    <>
                      {/* Linhas principais */}
                      {productLines.map((line) => (
                        <div key={line.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-lg">{line.name}</h3>
                            <div className="flex items-center gap-2">
                              <Badge variant="default">{line.category}</Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditProduct(line)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-4">
                            {line.description}
                          </p>
                          
                          {/* Sub-produtos da linha */}
                          <div className="ml-4 space-y-2">
                            <h4 className="font-medium text-sm text-gray-700 mb-2">Sub-produtos:</h4>
                            
                            {/* Lista sub-produtos usando parentId */}
                            {products?.filter(p => p.parentId === line.id).map((subProduct) => (
                              <div key={subProduct.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                <div>
                                  <span className="font-medium">{subProduct.name}</span>
                                  <p className="text-sm text-gray-600">{subProduct.description}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="secondary">Sub-produto</Badge>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleEditProduct(subProduct)}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                            
                            {/* Mensagem se não houver sub-produtos */}
                            {(!products || products.filter(p => p.parentId === line.id).length === 0) && (
                              <div className="p-3 bg-gray-100 rounded-lg text-center">
                                <p className="text-sm text-gray-600">
                                  Nenhum sub-produto encontrado para esta linha.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      
                      {/* Informações adicionais */}
                      <div className="border rounded-lg p-4 bg-gray-50">
                        <h4 className="font-medium text-sm text-gray-700 mb-2">Informações:</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>• Para adicionar sub-produtos, edite a linha principal na aba "Produtos"</p>
                          <p>• Sub-produtos são automaticamente vinculados à linha principal pelo parentId</p>
                          <p>• Edite qualquer produto clicando no ícone de edição</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Gerenciamento de Usuários</CardTitle>
                <Button onClick={handleCreateAdmin} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Novo Usuário
                </Button>
              </CardHeader>
              <CardContent>
                {adminsLoading ? (
                  <div className="flex items-center justify-center p-8">
                    <div className="text-gray-500">Carregando usuários...</div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {admins.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        Nenhum usuário cadastrado. Clique em "Novo Usuário" para adicionar.
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        {admins.map((admin) => (
                          <Card key={admin.id} className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="font-semibold text-lg">{admin.name}</h3>
                                  <Badge variant="secondary">{admin.role}</Badge>
                                  {!admin.isActive && (
                                    <Badge variant="destructive">Inativo</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mb-2">@{admin.username}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                  <span>Criado: {new Date(admin.createdAt).toLocaleDateString()}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditAdmin(admin)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteAdmin(admin.id)}
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
          </TabsContent>

          {/* SEO Tab */}
          <TabsContent value="seo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de SEO</CardTitle>
                <CardDescription>
                  Configure as meta tags e dados estruturados do site
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="siteTitle">Título do Site</Label>
                    <Input
                      id="siteTitle"
                      value={seoSettings.siteTitle}
                      onChange={(e) => setSeoSettings({...seoSettings, siteTitle: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="siteDescription">Descrição do Site</Label>
                    <Textarea
                      id="siteDescription"
                      value={seoSettings.siteDescription}
                      onChange={(e) => setSeoSettings({...seoSettings, siteDescription: e.target.value})}
                      rows={3}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="keywords">Palavras-chave</Label>
                    <Input
                      id="keywords"
                      value={seoSettings.keywords}
                      onChange={(e) => setSeoSettings({...seoSettings, keywords: e.target.value})}
                      placeholder="palavra1, palavra2, palavra3"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="schemaOrg">Schema.org (JSON-LD)</Label>
                    <Textarea
                      id="schemaOrg"
                      value={seoSettings.schemaOrg}
                      onChange={(e) => setSeoSettings({...seoSettings, schemaOrg: e.target.value})}
                      rows={10}
                      className="font-mono text-sm"
                    />
                  </div>
                </div>
                <Button onClick={handleSeoSave} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Salvar Configurações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

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
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  {...productForm.register('description')}
                  rows={3}
                  placeholder="Descrição detalhada do produto"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Select value={productForm.watch('category')} onValueChange={(value) => productForm.setValue('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fertilizantes">Fertilizantes</SelectItem>
                      <SelectItem value="adjuvantes">Adjuvantes</SelectItem>
                      <SelectItem value="corretivos">Corretivos</SelectItem>
                      <SelectItem value="inoculantes">Inoculantes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="imageUrl">URL da Imagem</Label>
                  <Input
                    id="imageUrl"
                    {...productForm.register('imageUrl')}
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="features">Características</Label>
                <Textarea
                  id="features"
                  {...productForm.register('features')}
                  rows={3}
                  placeholder="Principais características do produto"
                />
              </div>

              <div>
                <Label htmlFor="benefits">Benefícios (separados por vírgula)</Label>
                <Textarea
                  id="benefits"
                  {...productForm.register('benefits')}
                  rows={3}
                  placeholder="Benefício 1, Benefício 2, Benefício 3"
                />
              </div>

              <div>
                <Label htmlFor="usage">Modo de Uso</Label>
                <Textarea
                  id="usage"
                  {...productForm.register('usage')}
                  rows={3}
                  placeholder="Como usar o produto"
                />
              </div>

              <div>
                <Label htmlFor="composition">Composição</Label>
                <Textarea
                  id="composition"
                  {...productForm.register('composition')}
                  rows={3}
                  placeholder="Composição química do produto"
                />
              </div>

              <div>
                <Label htmlFor="technicalSpecs">Especificações Técnicas</Label>
                <Textarea
                  id="technicalSpecs"
                  {...productForm.register('technicalSpecs')}
                  rows={3}
                  placeholder="Especificações técnicas detalhadas"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="active"
                  {...productForm.register('active')}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="active">Produto ativo</Label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsProductDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={createProductMutation.isPending || updateProductMutation.isPending}>
                  {createProductMutation.isPending || updateProductMutation.isPending ? 'Salvando...' : 'Salvar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Blog Dialog */}
        <Dialog open={isBlogDialogOpen} onOpenChange={setIsBlogDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingBlogPost ? 'Editar Post' : 'Novo Post'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={blogForm.handleSubmit(onSubmitBlogPost)} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    {...blogForm.register('title')}
                    placeholder="Título do post"
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
                    placeholder="titulo-do-post"
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
                  rows={3}
                  placeholder="Resumo do post"
                />
              </div>

              <div>
                <Label htmlFor="content">Conteúdo</Label>
                <Textarea
                  id="content"
                  {...blogForm.register('content')}
                  rows={8}
                  placeholder="Conteúdo completo do post"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Select value={blogForm.watch('category')} onValueChange={(value) => blogForm.setValue('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Agronegócio">Agronegócio</SelectItem>
                      <SelectItem value="Tecnologia Agrícola">Tecnologia Agrícola</SelectItem>
                      <SelectItem value="Sustentabilidade">Sustentabilidade</SelectItem>
                      <SelectItem value="Mercado">Mercado</SelectItem>
                      <SelectItem value="Nutrição de Plantas">Nutrição de Plantas</SelectItem>
                      <SelectItem value="Pragas e Doenças">Pragas e Doenças</SelectItem>
                      <SelectItem value="Novidades">Novidades</SelectItem>
                      <SelectItem value="Dicas">Dicas</SelectItem>
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

              <div>
                <Label htmlFor="publishedAt">Data de Publicação</Label>
                <Input
                  id="publishedAt"
                  type="datetime-local"
                  {...blogForm.register('publishedAt')}
                  placeholder="Data e hora da publicação"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  {...blogForm.register('isActive')}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="isActive">Post ativo</Label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsBlogDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={createBlogPostMutation.isPending || updateBlogPostMutation.isPending}>
                  {createBlogPostMutation.isPending || updateBlogPostMutation.isPending ? 'Salvando...' : 'Salvar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Admin Dialog */}
        <Dialog open={isAdminDialogOpen} onOpenChange={setIsAdminDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingAdmin ? 'Editar Usuário' : 'Novo Usuário'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={adminForm.handleSubmit(onSubmitAdmin)} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  {...adminForm.register('name')}
                  placeholder="Nome completo"
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
                  placeholder="nome.usuario"
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
                  placeholder="Digite a senha"
                />
                {adminForm.formState.errors.password && (
                  <p className="text-sm text-red-600">{adminForm.formState.errors.password.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="role">Função</Label>
                <Select value={adminForm.watch('role')} onValueChange={(value) => adminForm.setValue('role', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a função" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="moderator">Moderador</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  {...adminForm.register('isActive')}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="isActive">Usuário ativo</Label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsAdminDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={createAdminMutation.isPending || updateAdminMutation.isPending}>
                  {createAdminMutation.isPending || updateAdminMutation.isPending ? 'Salvando...' : 'Salvar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}