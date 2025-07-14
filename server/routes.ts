import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendContactEmail, sendJobApplicationEmail } from "./services/emailService";
import { insertContactMessageSchema, insertJobApplicationSchema, insertNotificationSchema, loginSchema, insertBlogPostSchema, insertProductSchema, insertAdminSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Products routes
  app.get('/api/products', async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  });

  app.post('/api/products', async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedData);
      res.json(product);
    } catch (error) {
      console.error('Create product error:', error);
      res.status(400).json({ error: 'Invalid product data' });
    }
  });

  app.put('/api/products/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.updateProduct(id, validatedData);
      res.json(product);
    } catch (error) {
      console.error('Update product error:', error);
      res.status(400).json({ error: 'Invalid product data' });
    }
  });

  app.delete('/api/products/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteProduct(id);
      res.json({ success: true });
    } catch (error) {
      console.error('Delete product error:', error);
      res.status(500).json({ error: 'Failed to delete product' });
    }
  });

  app.get('/api/products/:slug', async (req, res) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  });

  app.get('/api/products/category/:category', async (req, res) => {
    try {
      const products = await storage.getProductsByCategory(req.params.category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products by category' });
    }
  });

  // Blog routes
  app.get('/api/blog', async (req, res) => {
    try {
      const { category, limit } = req.query;
      let posts = await storage.getBlogPosts();
      
      if (category) {
        posts = posts.filter(post => post.category === category);
      }
      
      if (limit) {
        posts = posts.slice(0, parseInt(limit as string));
      }
      
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
  });

  app.get('/api/blog/:slug', async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch blog post' });
    }
  });

  app.post('/api/blog', async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const blogPost = await storage.createBlogPost(validatedData);
      res.json(blogPost);
    } catch (error) {
      console.error('Create blog post error:', error);
      res.status(400).json({ error: 'Invalid blog post data' });
    }
  });

  app.put('/api/blog/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertBlogPostSchema.parse(req.body);
      const blogPost = await storage.updateBlogPost(id, validatedData);
      res.json(blogPost);
    } catch (error) {
      console.error('Update blog post error:', error);
      res.status(400).json({ error: 'Invalid blog post data' });
    }
  });

  app.delete('/api/blog/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteBlogPost(id);
      res.json({ success: true });
    } catch (error) {
      console.error('Delete blog post error:', error);
      res.status(500).json({ error: 'Failed to delete blog post' });
    }
  });

  app.get('/api/blog/:slug', async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ error: 'Blog post not found' });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch blog post' });
    }
  });

  app.get('/api/blog/category/:category', async (req, res) => {
    try {
      const posts = await storage.getBlogPostsByCategory(req.params.category);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch blog posts by category' });
    }
  });

  // Contact form route
  app.post('/api/contact', async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      
      // Send email
      await sendContactEmail(message);
      
      res.status(201).json({ message: 'Contact message sent successfully' });
    } catch (error) {
      console.error('Contact form error:', error);
      res.status(400).json({ error: 'Failed to send contact message' });
    }
  });

  // Job application route
  app.post('/api/job-application', async (req, res) => {
    try {
      const validatedData = insertJobApplicationSchema.parse(req.body);
      const application = await storage.createJobApplication(validatedData);
      
      // Send email
      await sendJobApplicationEmail(application);
      
      res.status(201).json({ message: 'Job application sent successfully' });
    } catch (error) {
      console.error('Job application error:', error);
      res.status(400).json({ error: 'Failed to send job application' });
    }
  });

  // Notification routes
  app.get('/api/notifications', async (req, res) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
      const notifications = await storage.getNotifications(userId);
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch notifications' });
    }
  });

  app.get('/api/notifications/:id', async (req, res) => {
    try {
      const notification = await storage.getNotificationById(parseInt(req.params.id));
      if (!notification) {
        return res.status(404).json({ error: 'Notification not found' });
      }
      res.json(notification);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch notification' });
    }
  });

  app.post('/api/notifications', async (req, res) => {
    try {
      const validatedData = insertNotificationSchema.parse(req.body);
      const notification = await storage.createNotification(validatedData);
      res.status(201).json(notification);
    } catch (error) {
      console.error('Create notification error:', error);
      res.status(400).json({ error: 'Failed to create notification' });
    }
  });

  app.patch('/api/notifications/:id/read', async (req, res) => {
    try {
      await storage.markNotificationAsRead(parseInt(req.params.id));
      res.json({ message: 'Notification marked as read' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to mark notification as read' });
    }
  });

  app.patch('/api/notifications/read-all', async (req, res) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
      await storage.markAllNotificationsAsRead(userId);
      res.json({ message: 'All notifications marked as read' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to mark all notifications as read' });
    }
  });

  app.delete('/api/notifications/:id', async (req, res) => {
    try {
      await storage.deleteNotification(parseInt(req.params.id));
      res.json({ message: 'Notification deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete notification' });
    }
  });

  // Admin user management routes
  app.get('/api/admin/users', async (req, res) => {
    try {
      const admins = await storage.getAdmins();
      res.json(admins);
    } catch (error) {
      console.error('Get admins error:', error);
      res.status(500).json({ error: 'Failed to fetch admins' });
    }
  });

  app.post('/api/admin/users', async (req, res) => {
    try {
      const validatedData = insertAdminSchema.parse(req.body);
      const admin = await storage.createAdmin(validatedData);
      res.json(admin);
    } catch (error) {
      console.error('Create admin error:', error);
      res.status(400).json({ error: 'Invalid admin data' });
    }
  });

  app.put('/api/admin/users/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertAdminSchema.parse(req.body);
      const admin = await storage.updateAdmin(id, validatedData);
      res.json(admin);
    } catch (error) {
      console.error('Update admin error:', error);
      res.status(400).json({ error: 'Invalid admin data' });
    }
  });

  app.delete('/api/admin/users/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteAdmin(id);
      res.json({ success: true });
    } catch (error) {
      console.error('Delete admin error:', error);
      res.status(500).json({ error: 'Failed to delete admin' });
    }
  });

  // Admin authentication routes
  app.post('/api/admin/login', async (req, res) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      const admin = await storage.verifyAdmin(validatedData.username, validatedData.password);
      
      if (!admin) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }
      
      // Em produção, usar JWT ou sessões seguras
      res.json({ 
        success: true, 
        admin: { 
          id: admin.id, 
          name: admin.name,
          role: admin.role,
          username: admin.username 
        } 
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(400).json({ error: 'Dados inválidos' });
    }
  });

  app.post('/api/admin/logout', async (req, res) => {
    try {
      // Em produção, limpar sessão/JWT
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao fazer logout' });
    }
  });



  const httpServer = createServer(app);
  return httpServer;
}
