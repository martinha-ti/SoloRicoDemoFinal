import { 
  users, 
  products, 
  blogPosts, 
  contactMessages, 
  jobApplications,
  type User, 
  type InsertUser, 
  type Product, 
  type InsertProduct,
  type BlogPost,
  type InsertBlogPost,
  type ContactMessage,
  type InsertContactMessage,
  type JobApplication,
  type InsertJobApplication
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProducts(): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogPostsByCategory(category: string): Promise<BlogPost[]>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  createJobApplication(application: InsertJobApplication): Promise<JobApplication>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private blogPosts: Map<number, BlogPost>;
  private contactMessages: Map<number, ContactMessage>;
  private jobApplications: Map<number, JobApplication>;
  
  private currentUserId: number;
  private currentProductId: number;
  private currentBlogPostId: number;
  private currentContactMessageId: number;
  private currentJobApplicationId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.blogPosts = new Map();
    this.contactMessages = new Map();
    this.jobApplications = new Map();
    
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.currentBlogPostId = 1;
    this.currentContactMessageId = 1;
    this.currentJobApplicationId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed products
    const sampleProducts: InsertProduct[] = [
      {
        name: "Top Lime Pro",
        slug: "top-lime-pro",
        category: "Adjuvantes",
        description: "Adjuvante premium para maximizar a eficácia de aplicações foliares",
        benefits: ["Melhora a absorção", "Reduz tensão superficial", "Aumenta eficácia"],
        imageUrl: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop",
        isActive: true
      },
      {
        name: "Revolution",
        slug: "revolution",
        category: "Protect",
        description: "Linha protect para proteção avançada das culturas",
        benefits: ["Proteção superior", "Longa duração", "Resistência a pragas"],
        imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop",
        isActive: true
      },
      {
        name: "Gel de Plantio",
        slug: "gel-de-plantio",
        category: "Titanium Sollus",
        description: "Gel especial para plantio que melhora o estabelecimento das mudas",
        benefits: ["Melhor enraizamento", "Reduz estresse", "Acelera crescimento"],
        imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
        isActive: true
      },
      {
        name: "Protetor E700",
        slug: "protetor-e700",
        category: "Protect",
        description: "Protetor avançado para culturas sensíveis",
        benefits: ["Proteção completa", "Fácil aplicação", "Resultados rápidos"],
        imageUrl: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop",
        isActive: true
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
        isActive: true
      },
      {
        title: "Tendências da Volatilidade dos Preços das Commodities Agrícolas em 2024",
        slug: "volatilidade-precos-commodities-2024",
        excerpt: "Entenda os fatores econômicos e climáticos que impactam os preços das commodities.",
        content: "A volatilidade dos preços das commodities agrícolas é um fenômeno complexo...",
        category: "Mercado",
        imageUrl: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=250&fit=crop",
        isActive: true
      },
      {
        title: "Novos Mercados: Abrindo Portas para Pequenos e Médios Produtores Brasileiros",
        slug: "novos-mercados-pequenos-medios-produtores",
        excerpt: "Como a Solo Rico está ajudando produtores a alcançar novos mercados com inovação e apoio técnico.",
        content: "O acesso a novos mercados é fundamental para o crescimento sustentável...",
        category: "Inovação",
        imageUrl: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=250&fit=crop",
        isActive: true
      }
    ];

    sampleBlogPosts.forEach(post => {
      this.createBlogPost(post);
    });
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
    return Array.from(this.products.values()).filter(p => p.isActive);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(p => p.slug === slug && p.isActive);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.category === category && p.isActive);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { 
      ...insertProduct, 
      id, 
      createdAt: new Date(),
      imageUrl: insertProduct.imageUrl ?? null,
      isActive: insertProduct.isActive ?? true
    };
    this.products.set(id, product);
    return product;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).filter(p => p.isActive);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(p => p.slug === slug && p.isActive);
  }

  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).filter(p => p.category === category && p.isActive);
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const blogPost: BlogPost = { 
      ...insertBlogPost, 
      id, 
      publishedAt: new Date(),
      imageUrl: insertBlogPost.imageUrl ?? null,
      isActive: insertBlogPost.isActive ?? true
    };
    this.blogPosts.set(id, blogPost);
    return blogPost;
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
}

export const storage = new DatabaseStorage();
