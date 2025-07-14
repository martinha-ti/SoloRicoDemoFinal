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
  getProductById(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProductWithSubProducts(slug: string): Promise<Product & { subProducts?: Product[] } | undefined>;
  getSubProductsByParent(parentId: number): Promise<Product[]>;
  getMainProductLines(): Promise<Product[]>;
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
  getAdmins(): Promise<Admin[]>;
  getAdminByUsername(username: string): Promise<Admin | undefined>;
  createAdmin(admin: InsertAdmin): Promise<Admin>;
  updateAdmin(id: number, admin: InsertAdmin): Promise<Admin>;
  deleteAdmin(id: number): Promise<void>;
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
    // Seed products - 5 linhas principais conforme as imagens
    const sampleProducts: InsertProduct[] = [
      // 1. TITANIUM FOLIAR - Linha principal
      {
        name: "TITANIUM FOLIAR",
        slug: "titanium-foliar",
        category: "Fertilizantes",
        description: "Linha completa de fertilizantes foliares com tecnologia avançada para nutrição rápida e eficiente.",
        features: "Absorção rápida, Nutrição foliar, Tecnologia de ponta",
        benefits: ["Nutrição rápida", "Maior eficiência", "Aumento da produtividade"],
        usage: "Aplicar via foliar conforme recomendação técnica",
        composition: "Macro e micronutrientes balanceados",
        technicalSpecs: "pH: 5.5-6.5, Densidade: 1.2g/cm³",
        imageUrl: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop",
        gallery: ["https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=600&fit=crop"],
        active: true,
        isProductLine: true
      },
      // 2. TITANIUM SOLLUS - Linha principal
      {
        name: "TITANIUM SOLLUS",
        slug: "titanium-sollus",
        category: "Fertilizantes",
        description: "Linha especializada em condicionadores e melhoradores de solo com tecnologia inovadora.",
        features: "Melhoria do solo, Condicionamento, Tecnologia avançada",
        benefits: ["Estrutura do solo", "Retenção de água", "Melhor CTC"],
        usage: "Aplicar no solo antes do plantio",
        composition: "Condicionadores orgânicos e minerais",
        technicalSpecs: "Granulometria: 0.3-2mm, pH: 6.0-7.0",
        imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop",
        gallery: ["https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=600&fit=crop"],
        active: true,
        isProductLine: true
      },
      // 3. PROTECT - Linha principal
      {
        name: "PROTECT",
        slug: "protect",
        category: "Defensivos",
        description: "Linha completa de produtos para proteção de cultivos com tecnologia de ponta.",
        features: "Proteção eficiente, Tecnologia avançada, Controle específico",
        benefits: ["Proteção das culturas", "Controle de pragas", "Maior segurança"],
        usage: "Aplicar conforme bula e recomendação técnica",
        composition: "Ingredientes ativos específicos para cada praga",
        technicalSpecs: "Concentração variável conforme produto",
        imageUrl: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop",
        gallery: ["https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&h=600&fit=crop"],
        active: true,
        isProductLine: true
      },
      // 4. ADJUVANTES - Linha principal
      {
        name: "ADJUVANTES",
        slug: "adjuvantes",
        category: "Adjuvantes",
        description: "Linha completa de adjuvantes para potencializar a eficiência dos tratamentos.",
        features: "Potencialização, Eficiência, Tecnologia de aplicação",
        benefits: ["Maior eficiência", "Melhor cobertura", "Redução de deriva"],
        usage: "Adicionar ao tanque conforme recomendação",
        composition: "Surfactantes e espalhantes adesivos",
        technicalSpecs: "Concentração: 0.1-0.5% v/v",
        imageUrl: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=300&fit=crop",
        gallery: ["https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&h=600&fit=crop"],
        active: true,
        isProductLine: true
      },
      // 5. VIGOR - Linha principal
      {
        name: "VIGOR",
        slug: "vigor",
        category: "Bioestimulantes",
        description: "Linha de bioestimulantes para promover vigor e resistência das plantas.",
        features: "Bioestimulação, Vigor vegetal, Resistência",
        benefits: ["Maior vigor", "Resistência a estresses", "Melhor desenvolvimento"],
        usage: "Aplicar via solo ou foliar",
        composition: "Extratos vegetais e aminoácidos",
        technicalSpecs: "Concentração de aminoácidos: 15%",
        imageUrl: "https://images.unsplash.com/photo-1592428122012-32c8ae8ff73e?w=400&h=300&fit=crop",
        gallery: ["https://images.unsplash.com/photo-1592428122012-32c8ae8ff73e?w=600&h=600&fit=crop"],
        active: true,
        isProductLine: true
      },
      
      // Sub-produtos do TITANIUM FOLIAR (3 sub-produtos)
      {
        name: "TITANIUM FOLIAR NPK",
        slug: "titanium-foliar-npk",
        category: "Fertilizantes",
        description: "Fertilizante foliar balanceado NPK com micronutrientes para nutrição completa.",
        features: "NPK balanceado, Micronutrientes, Absorção rápida",
        benefits: ["Nutrição completa", "Desenvolvimento equilibrado", "Produtividade"],
        usage: "Aplicar 2-3 L/ha via foliar",
        composition: "NPK 20-10-20 + micronutrientes",
        technicalSpecs: "pH: 5.5-6.5, Densidade: 1.2g/cm³",
        imageUrl: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop",
        gallery: ["https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=600&fit=crop"],
        active: true,
        isProductLine: false,
        parentId: 1, // Referência ao TITANIUM FOLIAR
        lineOrder: 1
      },
      {
        name: "TITANIUM FOLIAR MICRO",
        slug: "titanium-foliar-micro",
        category: "Fertilizantes",
        description: "Fertilizante foliar rico em micronutrientes para correção de deficiências.",
        features: "Micronutrientes quelados, Correção rápida, Alta disponibilidade",
        benefits: ["Correção de deficiências", "Melhor qualidade", "Resistência a doenças"],
        usage: "Aplicar 1-2 L/ha conforme necessidade",
        composition: "Zn, Mn, B, Cu, Fe, Mo quelados",
        technicalSpecs: "pH: 6.0-7.0, Solubilidade: 100%",
        imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop",
        gallery: ["https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=600&fit=crop"],
        active: true,
        isProductLine: false,
        parentId: 1, // Referência ao TITANIUM FOLIAR
        lineOrder: 2
      },
      {
        name: "TITANIUM FOLIAR BLOOM",
        slug: "titanium-foliar-bloom",
        category: "Fertilizantes",
        description: "Fertilizante foliar especial para floração e frutificação.",
        features: "Rico em P e K, Floração intensa, Frutificação abundante",
        benefits: ["Melhor floração", "Maior frutificação", "Qualidade dos frutos"],
        usage: "Aplicar 2-3 L/ha durante floração",
        composition: "NPK 05-25-30 + aminoácidos",
        technicalSpecs: "pH: 5.0-6.0, Densidade: 1.3g/cm³",
        imageUrl: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop",
        gallery: ["https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&h=600&fit=crop"],
        active: true,
        isProductLine: false,
        parentId: 1, // Referência ao TITANIUM FOLIAR
        lineOrder: 3
      },
      
      // Sub-produtos conforme segunda imagem
      // 1. TOP LIME PRO - Sub-produto da linha ADJUVANTES
      {
        name: "TOP LIME PRO",
        slug: "top-lime-pro",
        category: "Adjuvantes",
        description: "Corretivo de solo líquido com tecnologia avançada para correção rápida de pH.",
        features: "Correção rápida, pH balanceado, Tecnologia líquida",
        benefits: ["Correção eficiente", "Aplicação fácil", "Ação rápida"],
        usage: "Aplicar 2-3 L/ha via pulverização",
        composition: "Óxido de cálcio solúvel 15%",
        technicalSpecs: "pH: 12.5, Densidade: 1.3g/cm³",
        imageUrl: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop",
        gallery: ["https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=600&fit=crop"],
        active: true,
        isProductLine: false,
        parentId: 4, // Referência ao ADJUVANTES
        lineOrder: 1
      },
      // 2. REVOLUTION - Sub-produto da linha PROTECT
      {
        name: "REVOLUTION",
        slug: "revolution",
        category: "Defensivos",
        description: "Fungicida sistêmico revolucionário para controle preventivo e curativo de doenças.",
        features: "Ação sistêmica, Controle preventivo, Tecnologia avançada",
        benefits: ["Controle eficaz", "Proteção duradoura", "Menor número de aplicações"],
        usage: "Aplicar 1-2 L/ha conforme pressão da doença",
        composition: "Ingrediente ativo: Tebuconazol 200g/L",
        technicalSpecs: "Concentração: 200g/L, pH: 6.0-7.0",
        imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop",
        gallery: ["https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=600&fit=crop"],
        active: true,
        isProductLine: false,
        parentId: 3, // Referência ao PROTECT
        lineOrder: 2
      },
      
      // Sub-produtos adicionais para completar as 5 linhas
      // Sub-produto da linha TITANIUM SOLLUS
      {
        name: "TITANIUM SOLLUS PREMIUM",
        slug: "titanium-sollus-premium",
        category: "Fertilizantes",
        description: "Condicionador de solo premium com tecnologia avançada de liberação controlada.",
        features: "Liberação controlada, Melhoria estrutural, Retenção hídrica",
        benefits: ["Estrutura do solo", "Economia de água", "Melhor CTC"],
        usage: "Aplicar 100-200 kg/ha antes do plantio",
        composition: "Condicionadores orgânicos + zeólita",
        technicalSpecs: "Granulometria: 0.5-3mm, pH: 6.5-7.5",
        imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop",
        gallery: ["https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=600&fit=crop"],
        active: true,
        isProductLine: false,
        parentId: 2, // Referência ao TITANIUM SOLLUS
        lineOrder: 2
      },
      // Sub-produto da linha VIGOR
      {
        name: "VIGOR PLUS",
        slug: "vigor-plus",
        category: "Bioestimulantes",
        description: "Bioestimulante avançado com aminoácidos e extratos vegetais para máximo vigor.",
        features: "Aminoácidos livres, Extratos vegetais, Bioestimulação",
        benefits: ["Vigor excepcional", "Resistência a estresses", "Desenvolvimento acelerado"],
        usage: "Aplicar 1-2 L/ha via foliar ou fertirrigação",
        composition: "Aminoácidos 20% + extratos vegetais",
        technicalSpecs: "pH: 4.5-5.5, Densidade: 1.1g/cm³",
        imageUrl: "https://images.unsplash.com/photo-1592428122012-32c8ae8ff73e?w=400&h=300&fit=crop",
        gallery: ["https://images.unsplash.com/photo-1592428122012-32c8ae8ff73e?w=600&h=600&fit=crop"],
        active: true,
        isProductLine: false,
        parentId: 5, // Referência ao VIGOR
        lineOrder: 1
      },
      // 3. GEL DE PLANTIO - Sub-produto da linha TITANIUM SOLLUS
      {
        name: "GEL DE PLANTIO",
        slug: "gel-de-plantio",
        category: "Fertilizantes",
        description: "Gel nutritivo para plantio com tecnologia de liberação controlada de nutrientes.",
        features: "Liberação controlada, Hidratação, Nutrição inicial",
        benefits: ["Melhor pegamento", "Nutrição inicial", "Economia de água"],
        usage: "Aplicar 50-100g por muda no plantio",
        composition: "NPK 10-10-10 + gel hidratante",
        technicalSpecs: "Capacidade de absorção: 300x seu peso",
        imageUrl: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop",
        gallery: ["https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&h=600&fit=crop"],
        active: true,
        isProductLine: false,
        parentId: 2, // Referência ao TITANIUM SOLLUS
        lineOrder: 1
      },
      // 4. PROTETOR E700 - Sub-produto da linha PROTECT
      {
        name: "PROTETOR E700",
        slug: "protetor-e700",
        category: "Defensivos",
        description: "Protetor avançado E700 para controle de pragas e doenças com tecnologia de ponta.",
        features: "Controle múltiplo, Tecnologia E700, Proteção ampla",
        benefits: ["Controle eficaz", "Amplo espectro", "Longa duração"],
        usage: "Aplicar 0.5-1 L/ha conforme praga alvo",
        composition: "Multiativos com tecnologia E700",
        technicalSpecs: "Concentração variável, pH: 5.5-6.5",
        imageUrl: "https://images.unsplash.com/photo-1592428122012-32c8ae8ff73e?w=400&h=300&fit=crop",
        gallery: ["https://images.unsplash.com/photo-1592428122012-32c8ae8ff73e?w=600&h=600&fit=crop"],
        active: true,
        isProductLine: false,
        parentId: 3, // Referência ao PROTECT
        lineOrder: 2
      },
      {
        name: "Sub Produto Top Lime 3",
        slug: "sub-produto-top-lime-3",
        category: "Fertilizantes",
        description: "Terceira variação da linha Top Lime Pro para aplicação em culturas específicas.",
        features: "Fórmula concentrada, Aplicação foliar, Ação sistêmica",
        benefits: ["Absorção rápida", "Correção localizada", "Compatível com defensivos"],
        usage: "Aplicar 100kg/ha via foliar, diluir em 300L de água",
        composition: "Óxido de cálcio (CaO): 55%, Óxido de magnésio (MgO): 18%",
        technicalSpecs: "PRNT: 88%, Granulometria: 0,1mm (90%)",
        imageUrl: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop",
        gallery: ["https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=600&fit=crop"],
        active: true,
        isProductLine: false,
        parentId: 1, // Referência ao Top Lime Pro
        lineOrder: 3
      },
      // Linha Adjuvantes
      {
        name: "Acidificante Plus",
        slug: "acidificante-plus",
        category: "Adjuvantes",
        description: "Acidificante de alta performance para otimizar pH das soluções",
        features: "Ação rápida, Estabilizador de pH, Compatível com herbicidas, Não corrosivo",
        benefits: ["Correção de pH", "Melhora eficácia", "Compatibilidade total"],
        usage: "Aplicar 20-50ml por 100 litros de água. Adicionar primeiro à solução antes dos defensivos.",
        composition: "Ácido fosfórico 30%, Ácido cítrico 20%, Antioxidante 5%, Veículo q.s.p. 100%",
        technicalSpecs: "pH: 2.0-3.0, Densidade: 1.15 g/cm³, Validade: 24 meses",
        imageUrl: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop",
        gallery: ["https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=600&fit=crop"],
        active: true
      },
      {
        name: "Acidificante Plus",
        slug: "acidificante-plus",
        category: "Adjuvantes",
        description: "Acidificante de alta performance para otimizar pH das soluções",
        features: "Ação rápida, Estabilizador de pH, Compatível com herbicidas, Não corrosivo",
        benefits: ["Correção de pH", "Melhora eficácia", "Compatibilidade total"],
        usage: "Aplicar 20-50ml por 100 litros de água. Adicionar primeiro à solução antes dos defensivos.",
        composition: "Ácido fosfórico 30%, Ácido cítrico 20%, Antioxidante 5%, Veículo q.s.p. 100%",
        technicalSpecs: "pH: 2.0-3.0, Densidade: 1.15 g/cm³, Validade: 24 meses",
        imageUrl: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop",
        gallery: ["https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=600&fit=crop"],
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
        publishedAt: new Date().toISOString(),
        isActive: true
      },
      {
        title: "Tendências da Volatilidade dos Preços das Commodities Agrícolas em 2024",
        slug: "volatilidade-precos-commodities-2024",
        excerpt: "Entenda os fatores econômicos e climáticos que impactam os preços das commodities.",
        content: "A volatilidade dos preços das commodities agrícolas é um fenômeno complexo...",
        category: "Mercado",
        imageUrl: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=250&fit=crop",
        publishedAt: new Date().toISOString(),
        isActive: true
      },
      {
        title: "Novos Mercados: Abrindo Portas para Pequenos e Médios Produtores Brasileiros",
        slug: "novos-mercados-pequenos-medios-produtores",
        excerpt: "Como a Solo Rico está ajudando produtores a alcançar novos mercados com inovação e apoio técnico.",
        content: "O acesso a novos mercados é fundamental para o crescimento sustentável...",
        category: "Inovação",
        imageUrl: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=250&fit=crop",
        publishedAt: new Date().toISOString(),
        isActive: true
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

    // Seed admin users
    const defaultAdmins: InsertAdmin[] = [
      {
        name: "Administrador Principal",
        role: "admin",
        username: "admin",
        password: "admin123", // Em produção, usar hash bcrypt
        isActive: true
      },
      {
        name: "Editor de Conteúdo",
        role: "editor",
        username: "editor",
        password: "editor123",
        isActive: true
      },
      {
        name: "Visualizador",
        role: "viewer",
        username: "viewer",
        password: "viewer123",
        isActive: true
      }
    ];

    defaultAdmins.forEach(admin => {
      this.createAdmin(admin);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
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

  async getProductWithSubProducts(slug: string): Promise<Product & { subProducts?: Product[] } | undefined> {
    const product = await this.getProductBySlug(slug);
    if (!product) return undefined;
    
    // Se for uma linha de produto, busca os sub-produtos
    if (product.isProductLine) {
      const subProducts = await this.getSubProductsByParent(product.id);
      return { ...product, subProducts };
    }
    
    return product;
  }

  async getProductLineProducts(): Promise<Product[]> {
    // Retorna produtos que são linhas principais (isProductLine = true)
    return Array.from(this.products.values()).filter(p => 
      p.isProductLine === true && p.active !== false
    );
  }

  async getSubProductsForLine(lineSlug: string): Promise<Product[]> {
    // Busca a linha de produto pelo slug
    const parentProduct = Array.from(this.products.values()).find(p => p.slug === lineSlug && p.isProductLine === true);
    if (!parentProduct) return [];
    
    // Retorna sub-produtos da linha específica usando parentId
    return Array.from(this.products.values()).filter(p => 
      p.parentId === parentProduct.id && p.active !== false
    ).sort((a, b) => (a.lineOrder || 0) - (b.lineOrder || 0));
  }

  async markProductAsSubProduct(productId: number, parentLineSlug: string): Promise<void> {
    // Marca um produto como sub-produto de uma linha específica
    const product = this.products.get(productId);
    if (product && parentLineSlug === 'top-lime-pro') {
      // Por enquanto, apenas produtos com slugs específicos são considerados sub-produtos
      // Em futuras versões, poderia usar um campo parentId
      console.log(`Produto ${product.name} marcado como sub-produto da linha ${parentLineSlug}`);
    }
  }

  async getSubProductsByParent(parentId: number): Promise<Product[]> {
    return Array.from(this.products.values())
      .filter(p => p.parentId === parentId && p.active !== false)
      .sort((a, b) => (a.lineOrder || 0) - (b.lineOrder || 0));
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

  async getMainProductLines(): Promise<Product[]> {
    const products = Array.from(this.products.values());
    return products.filter(p => p.isProductLine === true);
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).filter(p => p.isActive !== false);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(p => p.slug === slug && p.isActive !== false);
  }

  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).filter(p => p.category === category && p.isActive !== false);
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const blogPost: BlogPost = { 
      ...insertBlogPost, 
      id, 
      publishedAt: typeof insertBlogPost.publishedAt === 'string' 
        ? new Date(insertBlogPost.publishedAt) 
        : insertBlogPost.publishedAt || new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: insertBlogPost.imageUrl ?? null,
      isActive: insertBlogPost.isActive ?? true
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
      publishedAt: typeof insertBlogPost.publishedAt === 'string' 
        ? new Date(insertBlogPost.publishedAt) 
        : insertBlogPost.publishedAt || existingPost.publishedAt,
      updatedAt: new Date(),
      isActive: insertBlogPost.isActive ?? existingPost.isActive ?? true
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
  async getAdmins(): Promise<Admin[]> {
    return Array.from(this.admins.values()).filter(admin => admin.isActive !== false);
  }

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
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: insertAdmin.isActive ?? true
    };
    this.admins.set(id, admin);
    return admin;
  }

  async updateAdmin(id: number, insertAdmin: InsertAdmin): Promise<Admin> {
    const existingAdmin = this.admins.get(id);
    if (!existingAdmin) {
      throw new Error('Admin not found');
    }
    
    const admin: Admin = { 
      ...existingAdmin,
      ...insertAdmin, 
      id,
      updatedAt: new Date(),
      isActive: insertAdmin.isActive ?? true
    };
    this.admins.set(id, admin);
    return admin;
  }

  async deleteAdmin(id: number): Promise<void> {
    if (!this.admins.has(id)) {
      throw new Error('Admin not found');
    }
    this.admins.delete(id);
  }

  async verifyAdmin(username: string, password: string): Promise<Admin | null> {
    const admin = await this.getAdminByUsername(username);
    if (!admin) {
      return null;
    }
    
    // Em produção, usar bcrypt para comparar hash
    if (admin.password === password && admin.isActive) {
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
