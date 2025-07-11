import { 
  users, 
  products, 
  blogPosts, 
  contactMessages, 
  jobApplications,
  notifications,
  admins,
  type User, 
  type InsertUser, 
  type Product, 
  type InsertProduct,
  type BlogPost,
  type InsertBlogPost,
  type ContactMessage,
  type InsertContactMessage,
  type JobApplication,
  type InsertJobApplication,
  type Notification,
  type InsertNotification,
  type Admin,
  type InsertAdmin,
  type LoginCredentials
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProducts(): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: InsertProduct): Promise<Product>;
  deleteProduct(id: number): Promise<void>;
  
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogPostsByCategory(category: string): Promise<BlogPost[]>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: InsertBlogPost): Promise<BlogPost>;
  deleteBlogPost(id: number): Promise<void>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  createJobApplication(application: InsertJobApplication): Promise<JobApplication>;
  
  getNotifications(userId?: number): Promise<Notification[]>;
  getNotificationById(id: number): Promise<Notification | undefined>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  markNotificationAsRead(id: number): Promise<void>;
  markAllNotificationsAsRead(userId?: number): Promise<void>;
  deleteNotification(id: number): Promise<void>;
  
  // Admin methods
  getAdminByUsername(username: string): Promise<Admin | undefined>;
  createAdmin(admin: InsertAdmin): Promise<Admin>;
  verifyAdmin(username: string, password: string): Promise<Admin | null>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private blogPosts: Map<number, BlogPost>;
  private contactMessages: Map<number, ContactMessage>;
  private jobApplications: Map<number, JobApplication>;
  private notifications: Map<number, Notification>;
  private admins: Map<number, Admin>;
  
  private currentUserId: number;
  private currentProductId: number;
  private currentBlogPostId: number;
  private currentContactMessageId: number;
  private currentJobApplicationId: number;
  private currentNotificationId: number;
  private currentAdminId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.blogPosts = new Map();
    this.contactMessages = new Map();
    this.jobApplications = new Map();
    this.notifications = new Map();
    this.admins = new Map();
    
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.currentBlogPostId = 1;
    this.currentContactMessageId = 1;
    this.currentJobApplicationId = 1;
    this.currentNotificationId = 1;
    this.currentAdminId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed products
    const sampleProducts: InsertProduct[] = [
      // Linha Adjuvantes
      {
        name: "Top Lime Pro",
        slug: "top-lime-pro",
        category: "Adjuvantes",
        description: "Adjuvante premium para maximizar a eficácia de aplicações foliares",
        benefits: ["Melhora a absorção", "Reduz tensão superficial", "Aumenta eficácia"],
        imageUrl: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop",
        active: true
      },
      {
        name: "Acidificante Plus",
        slug: "acidificante-plus",
        category: "Adjuvantes",
        description: "Acidificante de alta performance para otimizar pH das soluções",
        benefits: ["Correção de pH", "Melhora eficácia", "Compatibilidade total"],
        imageUrl: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop",
        active: true
      },
      {
        name: "Espalhante Adesivo",
        slug: "espalhante-adesivo",
        category: "Adjuvantes",
        description: "Espalhante adesivo de alta tecnologia para aplicações foliares",
        benefits: ["Maior cobertura", "Reduz deriva", "Aumenta aderência"],
        imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop",
        active: true
      },
      // Linha Protect
      {
        name: "Revolution",
        slug: "revolution",
        category: "Protect",
        description: "Linha protect para proteção avançada das culturas",
        benefits: ["Proteção superior", "Longa duração", "Resistência a pragas"],
        imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop",
        active: true
      },
      {
        name: "Protetor E700",
        slug: "protetor-e700",
        category: "Protect",
        description: "Protetor avançado para culturas sensíveis",
        benefits: ["Proteção completa", "Fácil aplicação", "Resultados rápidos"],
        imageUrl: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop",
        active: true
      },
      {
        name: "Shield Guard",
        slug: "shield-guard",
        category: "Protect",
        description: "Proteção avançada contra estresses ambientais",
        benefits: ["Resistência ao frio", "Proteção UV", "Fortalece plantas"],
        imageUrl: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop",
        active: true
      },
      // Linha Titanium Sollus
      {
        name: "Gel de Plantio",
        slug: "gel-de-plantio",
        category: "Titanium Sollus",
        description: "Gel especial para plantio que melhora o estabelecimento das mudas",
        benefits: ["Melhor enraizamento", "Reduz estresse", "Acelera crescimento"],
        imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
        active: true
      },
      {
        name: "Titanium Raiz",
        slug: "titanium-raiz",
        category: "Titanium Sollus",
        description: "Estimulante de raízes com tecnologia avançada",
        benefits: ["Desenvolvimento radicular", "Maior absorção", "Resistência a doenças"],
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
        active: true
      },
      {
        name: "Sollus Sementes",
        slug: "sollus-sementes",
        category: "Titanium Sollus",
        description: "Tratamento de sementes para melhor germinação",
        benefits: ["Germinação uniforme", "Proteção inicial", "Vigor das plântulas"],
        imageUrl: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop",
        active: true
      }
    ];

    sampleProducts.forEach(product => {
      this.createProduct(product);
    });

    // Seed blog posts
    const sampleBlogPosts: InsertBlogPost[] = [
      {
        title: "Agronegócio Brasileiro: Descubra o que irá Impulsionar o Crescimento em 2024",
        slug: "agronegocio-brasileiro-crescimento-2024",
        excerpt: "Análise do cenário atual e as principais forças que vão moldar o futuro do agronegócio brasileiro.",
        content: "O agronegócio brasileiro continua sendo um dos pilares da economia nacional...",
        category: "Agronegócio",
        imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=250&fit=crop",
        published: true
      },
      {
        title: "Tendências da Volatilidade dos Preços das Commodities Agrícolas em 2024",
        slug: "volatilidade-precos-commodities-2024",
        excerpt: "Entenda os fatores econômicos e climáticos que impactam os preços das commodities.",
        content: "A volatilidade dos preços das commodities agrícolas é um fenômeno complexo...",
        category: "Mercado",
        imageUrl: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=250&fit=crop",
        published: true
      },
      {
        title: "Novos Mercados: Abrindo Portas para Pequenos e Médios Produtores Brasileiros",
        slug: "novos-mercados-pequenos-medios-produtores",
        excerpt: "Como a Solo Rico está ajudando produtores a alcançar novos mercados com inovação e apoio técnico.",
        content: "O acesso a novos mercados é fundamental para o crescimento sustentável...",
        category: "Inovação",
        imageUrl: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=250&fit=crop",
        published: true
      }
    ];

    sampleBlogPosts.forEach(post => {
      this.createBlogPost(post);
    });

    // Seed notifications
    const sampleNotifications: InsertNotification[] = [
      {
        userId: null,
        title: "Bem-vindo à Solo Rico!",
        message: "Explore nossos produtos e soluções para aumentar sua produtividade.",
        type: "info",
        actionUrl: "/produtos",
        isRead: false
      },
      {
        userId: null,
        title: "Novos Produtos Disponíveis",
        message: "Confira nossa nova linha de adjuvantes para maximizar sua aplicação.",
        type: "success",
        actionUrl: "/para-voce",
        isRead: false
      },
      {
        userId: null,
        title: "Dicas de Aplicação",
        message: "Veja nosso blog para dicas sobre como aplicar corretamente nossos produtos.",
        type: "info",
        actionUrl: "/blog",
        isRead: false
      }
    ];

    sampleNotifications.forEach(notification => {
      this.createNotification(notification);
    });

    // Seed admin user
    const defaultAdmin: InsertAdmin = {
      username: "admin",
      password: "admin123" // Em produção, usar hash bcrypt
    };

    this.createAdmin(defaultAdmin);
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.active !== false);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(p => p.slug === slug && p.active !== false);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.category === category && p.active !== false);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { 
      ...insertProduct, 
      id, 
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: insertProduct.imageUrl ?? null,
      active: insertProduct.active ?? true
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: number, insertProduct: InsertProduct): Promise<Product> {
    const existingProduct = this.products.get(id);
    if (!existingProduct) {
      throw new Error('Product not found');
    }
    
    const product: Product = { 
      ...existingProduct,
      ...insertProduct, 
      id,
      updatedAt: new Date(),
      active: insertProduct.active ?? true
    };
    this.products.set(id, product);
    return product;
  }

  async deleteProduct(id: number): Promise<void> {
    if (!this.products.has(id)) {
      throw new Error('Product not found');
    }
    this.products.delete(id);
  }

  async deleteProduct(id: number): Promise<void> {
    if (!this.products.has(id)) {
      throw new Error('Product not found');
    }
    this.products.delete(id);
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).filter(p => p.published !== false);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(p => p.slug === slug && p.published !== false);
  }

  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).filter(p => p.category === category && p.published !== false);
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const blogPost: BlogPost = { 
      ...insertBlogPost, 
      id, 
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: insertBlogPost.imageUrl ?? null,
      published: insertBlogPost.published ?? true
    };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }

  async updateBlogPost(id: number, insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const existingPost = this.blogPosts.get(id);
    if (!existingPost) {
      throw new Error('Blog post not found');
    }
    
    const blogPost: BlogPost = { 
      ...existingPost,
      ...insertBlogPost, 
      id,
      updatedAt: new Date(),
      published: insertBlogPost.published ?? true
    };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }

  async deleteBlogPost(id: number): Promise<void> {
    if (!this.blogPosts.has(id)) {
      throw new Error('Blog post not found');
    }
    this.blogPosts.delete(id);
  }

  async createContactMessage(insertContactMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentContactMessageId++;
    const contactMessage: ContactMessage = { 
      ...insertContactMessage, 
      id, 
      createdAt: new Date(),
      phone: insertContactMessage.phone ?? null,
      subject: insertContactMessage.subject ?? null,
      productId: insertContactMessage.productId ?? null
    };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }

  async createJobApplication(insertJobApplication: InsertJobApplication): Promise<JobApplication> {
    const id = this.currentJobApplicationId++;
    const jobApplication: JobApplication = { 
      ...insertJobApplication, 
      id, 
      createdAt: new Date(),
      message: insertJobApplication.message ?? null,
      resumeUrl: insertJobApplication.resumeUrl ?? null
    };
    this.jobApplications.set(id, jobApplication);
    return jobApplication;
  }

  async getNotifications(userId?: number): Promise<Notification[]> {
    const allNotifications = Array.from(this.notifications.values());
    if (userId) {
      return allNotifications.filter(n => n.userId === userId || n.userId === null);
    }
    return allNotifications.filter(n => n.userId === null);
  }

  async getNotificationById(id: number): Promise<Notification | undefined> {
    return this.notifications.get(id);
  }

  async createNotification(insertNotification: InsertNotification): Promise<Notification> {
    const id = this.currentNotificationId++;
    const notification: Notification = { 
      ...insertNotification, 
      id, 
      createdAt: new Date(),
      userId: insertNotification.userId ?? null,
      actionUrl: insertNotification.actionUrl ?? null,
      isRead: insertNotification.isRead ?? false
    };
    this.notifications.set(id, notification);
    return notification;
  }

  async markNotificationAsRead(id: number): Promise<void> {
    const notification = this.notifications.get(id);
    if (notification) {
      notification.isRead = true;
      this.notifications.set(id, notification);
    }
  }

  async markAllNotificationsAsRead(userId?: number): Promise<void> {
    const notifications = await this.getNotifications(userId);
    notifications.forEach(notification => {
      if (!notification.isRead) {
        notification.isRead = true;
        this.notifications.set(notification.id, notification);
      }
    });
  }

  async deleteNotification(id: number): Promise<void> {
    this.notifications.delete(id);
  }

  // Admin methods
  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    return Array.from(this.admins.values()).find(
      (admin) => admin.username === username,
    );
  }

  async createAdmin(insertAdmin: InsertAdmin): Promise<Admin> {
    const id = this.currentAdminId++;
    const admin: Admin = { 
      ...insertAdmin, 
      id, 
      createdAt: new Date()
    };
    this.admins.set(id, admin);
    return admin;
  }

  async verifyAdmin(username: string, password: string): Promise<Admin | null> {
    const admin = await this.getAdminByUsername(username);
    if (!admin) {
      return null;
    }
    
    // Em produção, usar bcrypt para comparar hash
    if (admin.password === password) {
      return admin;
    }
    
    return null;
  }
}

// rewrite MemStorage to DatabaseStorage
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const { db } = await import('./db');
    const { users } = await import('@shared/schema');
    const { eq } = await import('drizzle-orm');
    
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const { db } = await import('./db');
    const { users } = await import('@shared/schema');
    const { eq } = await import('drizzle-orm');
    
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const { db } = await import('./db');
    const { users } = await import('@shared/schema');
    
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getProducts(): Promise<Product[]> {
    const { db } = await import('./db');
    const { products } = await import('@shared/schema');
    
    return await db.select().from(products);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    const { db } = await import('./db');
    const { products } = await import('@shared/schema');
    const { eq } = await import('drizzle-orm');
    
    const [product] = await db.select().from(products).where(eq(products.slug, slug));
    return product || undefined;
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    const { db } = await import('./db');
    const { products } = await import('@shared/schema');
    const { eq } = await import('drizzle-orm');
    
    return await db.select().from(products).where(eq(products.category, category));
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const { db } = await import('./db');
    const { products } = await import('@shared/schema');
    
    const [product] = await db
      .insert(products)
      .values(insertProduct)
      .returning();
    return product;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    const { db } = await import('./db');
    const { blogPosts } = await import('@shared/schema');
    
    return await db.select().from(blogPosts);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const { db } = await import('./db');
    const { blogPosts } = await import('@shared/schema');
    const { eq } = await import('drizzle-orm');
    
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    const { db } = await import('./db');
    const { blogPosts } = await import('@shared/schema');
    const { eq } = await import('drizzle-orm');
    
    return await db.select().from(blogPosts).where(eq(blogPosts.category, category));
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const { db } = await import('./db');
    const { blogPosts } = await import('@shared/schema');
    
    const [post] = await db
      .insert(blogPosts)
      .values(insertBlogPost)
      .returning();
    return post;
  }

  async createContactMessage(insertContactMessage: InsertContactMessage): Promise<ContactMessage> {
    const { db } = await import('./db');
    const { contactMessages } = await import('@shared/schema');
    
    const [message] = await db
      .insert(contactMessages)
      .values(insertContactMessage)
      .returning();
    return message;
  }

  async createJobApplication(insertJobApplication: InsertJobApplication): Promise<JobApplication> {
    const { db } = await import('./db');
    const { jobApplications } = await import('@shared/schema');
    
    const [application] = await db
      .insert(jobApplications)
      .values(insertJobApplication)
      .returning();
    return application;
  }

  async getNotifications(userId?: number): Promise<Notification[]> {
    const { db } = await import('./db');
    const { notifications } = await import('@shared/schema');
    const { eq, or, isNull } = await import('drizzle-orm');
    
    if (userId) {
      return await db.select()
        .from(notifications)
        .where(or(eq(notifications.userId, userId), isNull(notifications.userId)));
    }
    return await db.select()
      .from(notifications)
      .where(isNull(notifications.userId));
  }

  async getNotificationById(id: number): Promise<Notification | undefined> {
    const { db } = await import('./db');
    const { notifications } = await import('@shared/schema');
    const { eq } = await import('drizzle-orm');
    
    const [notification] = await db.select()
      .from(notifications)
      .where(eq(notifications.id, id));
    return notification || undefined;
  }

  async createNotification(insertNotification: InsertNotification): Promise<Notification> {
    const { db } = await import('./db');
    const { notifications } = await import('@shared/schema');
    
    const [notification] = await db
      .insert(notifications)
      .values(insertNotification)
      .returning();
    return notification;
  }

  async markNotificationAsRead(id: number): Promise<void> {
    const { db } = await import('./db');
    const { notifications } = await import('@shared/schema');
    const { eq } = await import('drizzle-orm');
    
    await db
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.id, id));
  }

  async markAllNotificationsAsRead(userId?: number): Promise<void> {
    const { db } = await import('./db');
    const { notifications } = await import('@shared/schema');
    const { eq, or, isNull } = await import('drizzle-orm');
    
    if (userId) {
      await db
        .update(notifications)
        .set({ isRead: true })
        .where(or(eq(notifications.userId, userId), isNull(notifications.userId)));
    } else {
      await db
        .update(notifications)
        .set({ isRead: true })
        .where(isNull(notifications.userId));
    }
  }

  async deleteNotification(id: number): Promise<void> {
    const { db } = await import('./db');
    const { notifications } = await import('@shared/schema');
    const { eq } = await import('drizzle-orm');
    
    await db
      .delete(notifications)
      .where(eq(notifications.id, id));
  }

  // Admin methods
  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    const { db } = await import('./db');
    const { admins } = await import('@shared/schema');
    const { eq } = await import('drizzle-orm');
    
    const [admin] = await db.select().from(admins).where(eq(admins.username, username));
    return admin || undefined;
  }

  async createAdmin(insertAdmin: InsertAdmin): Promise<Admin> {
    const { db } = await import('./db');
    const { admins } = await import('@shared/schema');
    
    const [admin] = await db
      .insert(admins)
      .values(insertAdmin)
      .returning();
    return admin;
  }

  async verifyAdmin(username: string, password: string): Promise<Admin | null> {
    const admin = await this.getAdminByUsername(username);
    if (!admin) {
      return null;
    }
    
    // Em produção, usar bcrypt para comparar hash
    if (admin.password === password) {
      return admin;
    }
    
    return null;
  }
}

export const storage = new MemStorage();
