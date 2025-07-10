import { apiRequest } from "./queryClient";
import type { 
  Product, 
  BlogPost, 
  InsertContactMessage, 
  InsertJobApplication 
} from "@shared/schema";

export const api = {
  // Products
  getProducts: async (): Promise<Product[]> => {
    const response = await apiRequest('GET', '/api/products');
    return response.json();
  },

  getProduct: async (slug: string): Promise<Product> => {
    const response = await apiRequest('GET', `/api/products/${slug}`);
    return response.json();
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const response = await apiRequest('GET', `/api/products/category/${category}`);
    return response.json();
  },

  // Blog
  getBlogPosts: async (): Promise<BlogPost[]> => {
    const response = await apiRequest('GET', '/api/blog');
    return response.json();
  },

  getBlogPost: async (slug: string): Promise<BlogPost> => {
    const response = await apiRequest('GET', `/api/blog/${slug}`);
    return response.json();
  },

  getBlogPostsByCategory: async (category: string): Promise<BlogPost[]> => {
    const response = await apiRequest('GET', `/api/blog/category/${category}`);
    return response.json();
  },

  // Contact
  sendContact: async (data: InsertContactMessage): Promise<void> => {
    await apiRequest('POST', '/api/contact', data);
  },

  // Job Application
  sendJobApplication: async (data: InsertJobApplication): Promise<void> => {
    await apiRequest('POST', '/api/job-application', data);
  },
};
