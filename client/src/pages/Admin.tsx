import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Package, 
  FileText, 
  Bell, 
  Users, 
  MessageSquare, 
  Briefcase,
  Plus,
  Edit,
  Trash2,
  Eye,
  Save
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { apiRequest } from '@/lib/queryClient';
import type { Product, BlogPost, Notification, ContactMessage, JobApplication } from '@shared/schema';

export default function Admin() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('dashboard');
  const queryClient = useQueryClient();

  // Fetch data
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    queryFn: () => apiRequest('/api/products'),
  });

  const { data: blogPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
    queryFn: () => apiRequest('/api/blog'),
  });

  const { data: notifications = [] } = useQuery<Notification[]>({
    queryKey: ['/api/notifications'],
    queryFn: () => apiRequest('/api/notifications'),
  });

  const { data: contactMessages = [] } = useQuery<ContactMessage[]>({
    queryKey: ['/api/contact-messages'],
    queryFn: () => apiRequest('/api/contact-messages'),
  });

  const { data: jobApplications = [] } = useQuery<JobApplication[]>({
    queryKey: ['/api/job-applications'],
    queryFn: () => apiRequest('/api/job-applications'),
  });

  // Create notification mutation
  const createNotificationMutation = useMutation({
    mutationFn: (notification: any) => apiRequest('/api/notifications', {
      method: 'POST',
      body: JSON.stringify(notification),
      headers: { 'Content-Type': 'application/json' }
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/notifications'] });
    },
  });

  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'info',
    actionUrl: ''
  });

  const handleCreateNotification = () => {
    if (newNotification.title && newNotification.message) {
      createNotificationMutation.mutate(newNotification);
      setNewNotification({ title: '', message: '', type: 'info', actionUrl: '' });
    }
  };

  const statsCards = [
    {
      title: 'Produtos',
      value: products.length,
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      title: 'Posts do Blog',
      value: blogPosts.length,
      icon: FileText,
      color: 'bg-green-500'
    },
    {
      title: 'Notificações',
      value: notifications.length,
      icon: Bell,
      color: 'bg-yellow-500'
    },
    {
      title: 'Mensagens de Contato',
      value: contactMessages.length,
      icon: MessageSquare,
      color: 'bg-purple-500'
    },
    {
      title: 'Candidaturas',
      value: jobApplications.length,
      icon: Briefcase,
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
          <p className="text-gray-600 mt-2">Gerencie o conteúdo e configurações do site Solo Rico</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
            <TabsTrigger value="messages">Mensagens</TabsTrigger>
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

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-4">
                    {notifications.slice(0, 5).map((notification) => (
                      <div key={notification.id} className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <Bell className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                          <p className="text-xs text-gray-500">{notification.message}</p>
                        </div>
                        <Badge variant={notification.isRead ? 'secondary' : 'default'}>
                          {notification.isRead ? 'Lida' : 'Nova'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Produtos
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Produto
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-gray-600">{product.category}</p>
                          <p className="text-xs text-gray-500 mt-1">{product.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={product.isActive ? 'default' : 'secondary'}>
                            {product.isActive ? 'Ativo' : 'Inativo'}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Posts do Blog
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Post
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-4">
                    {blogPosts.map((post) => (
                      <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-medium">{post.title}</h3>
                          <p className="text-sm text-gray-600">{post.category}</p>
                          <p className="text-xs text-gray-500 mt-1">{post.excerpt}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={post.isPublished ? 'default' : 'secondary'}>
                            {post.isPublished ? 'Publicado' : 'Rascunho'}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            {/* Create Notification */}
            <Card>
              <CardHeader>
                <CardTitle>Criar Nova Notificação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      value={newNotification.title}
                      onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
                      placeholder="Título da notificação"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Tipo</Label>
                    <Select value={newNotification.type} onValueChange={(value) => setNewNotification({...newNotification, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="info">Informação</SelectItem>
                        <SelectItem value="success">Sucesso</SelectItem>
                        <SelectItem value="warning">Aviso</SelectItem>
                        <SelectItem value="error">Erro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    value={newNotification.message}
                    onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
                    placeholder="Conteúdo da notificação"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="actionUrl">URL de Ação (opcional)</Label>
                  <Input
                    id="actionUrl"
                    value={newNotification.actionUrl}
                    onChange={(e) => setNewNotification({...newNotification, actionUrl: e.target.value})}
                    placeholder="/produtos"
                  />
                </div>
                <Button onClick={handleCreateNotification} disabled={createNotificationMutation.isPending}>
                  <Save className="h-4 w-4 mr-2" />
                  {createNotificationMutation.isPending ? 'Criando...' : 'Criar Notificação'}
                </Button>
              </CardContent>
            </Card>

            {/* Existing Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>Notificações Existentes</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-medium">{notification.title}</h3>
                          <p className="text-sm text-gray-600">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(notification.createdAt).toLocaleString('pt-BR')}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={notification.isRead ? 'secondary' : 'default'}>
                            {notification.isRead ? 'Lida' : 'Nova'}
                          </Badge>
                          <Badge variant="outline">{notification.type}</Badge>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Contact Messages */}
              <Card>
                <CardHeader>
                  <CardTitle>Mensagens de Contato</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      {contactMessages.map((message) => (
                        <div key={message.id} className="p-4 border rounded-lg">
                          <h4 className="font-medium">{message.name}</h4>
                          <p className="text-sm text-gray-600">{message.email}</p>
                          <p className="text-xs text-gray-500 mt-2">{message.message}</p>
                          <p className="text-xs text-gray-400 mt-2">
                            {new Date(message.createdAt).toLocaleString('pt-BR')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Job Applications */}
              <Card>
                <CardHeader>
                  <CardTitle>Candidaturas</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      {jobApplications.map((application) => (
                        <div key={application.id} className="p-4 border rounded-lg">
                          <h4 className="font-medium">{application.fullName}</h4>
                          <p className="text-sm text-gray-600">{application.email}</p>
                          <p className="text-sm text-gray-600">{application.position}</p>
                          <p className="text-xs text-gray-500 mt-2">{application.coverLetter}</p>
                          <p className="text-xs text-gray-400 mt-2">
                            {new Date(application.createdAt).toLocaleString('pt-BR')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}