import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendContactEmail, sendJobApplicationEmail } from "./services/emailService";
import { insertContactMessageSchema, insertJobApplicationSchema } from "@shared/schema";

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

  const httpServer = createServer(app);
  return httpServer;
}
