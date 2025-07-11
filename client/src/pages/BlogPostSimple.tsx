import { useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Link } from 'wouter';
import type { BlogPost as BlogPostType } from '@shared/schema';

export default function BlogPostSimple() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();

  const { data: post, isLoading, error } = useQuery<BlogPostType>({
    queryKey: ['/api/blog', slug],
    queryFn: async () => {
      const response = await fetch(`/api/blog/${slug}`);
      if (!response.ok) {
        throw new Error('Post não encontrado');
      }
      return response.json();
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="h-64 bg-gray-200 rounded mb-8"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Post não encontrado</h1>
            <p className="text-gray-600 mb-8">O post que você está procurando não existe ou foi removido.</p>
            <Link href="/blog">
              <Button className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar ao Blog
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/blog">
              <Button variant="ghost" className="flex items-center gap-2 text-green-600 hover:text-green-700">
                <ArrowLeft className="h-4 w-4" />
                Voltar ao Blog
              </Button>
            </Link>
          </div>

          {/* Article */}
          <article className="mb-12">
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
              
              {post.excerpt && (
                <p className="text-xl text-gray-600 mb-8">{post.excerpt}</p>
              )}
              
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  Solo Rico
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {post.imageUrl && (
              <div className="mb-8">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
              {post.content}
            </div>
          </article>
        </div>
      </div>
    </Layout>
  );
}