import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendContactEmail, sendJobApplicationEmail } from "./services/emailService";
import { insertContactMessageSchema, insertJobApplicationSchema, insertNotificationSchema } from "@shared/schema";

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
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch blog posts' });
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

  // Admin routes for contact messages and job applications
  app.get('/api/contact-messages', async (req, res) => {
    try {
      // In a real implementation, this would fetch from database
      // For now, return empty array since we don't store them persistently
      res.json([]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch contact messages' });
    }
  });

  app.get('/api/job-applications', async (req, res) => {
    try {
      // In a real implementation, this would fetch from database
      // For now, return empty array since we don't store them persistently
      res.json([]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch job applications' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
