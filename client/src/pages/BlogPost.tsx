import { useParams, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'wouter';
import type { BlogPost as BlogPostType } from '@shared/schema';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  // Fetch blog post by slug
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

  // Fetch related posts
  const { data: relatedPosts = [] } = useQuery<BlogPostType[]>({
    queryKey: ['/api/blog', 'related', post?.category],
    queryFn: async () => {
      const response = await fetch(`/api/blog?category=${post?.category}&limit=3`);
      if (!response.ok) return [];
      const posts = await response.json();
      return posts.filter((p: BlogPostType) => p.slug !== slug);
    },
    enabled: !!post?.category,
  });

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || '';
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  if (isLoading) {
    return (
      <Layout>
        <PageHeader
          title="Blog"
          subtitle={t('blog_subtitle')}
          backgroundImage="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=400&fit=crop"
        />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="h-64 bg-gray-200 rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <PageHeader
          title="Blog"
          subtitle={t('blog_subtitle')}
          backgroundImage="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=400&fit=crop"
        />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Post não encontrado</h1>
            <p className="text-gray-600 mb-8">O post que você está procurando não existe ou foi removido.</p>
            <Button onClick={() => setLocation('/blog')} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar ao Blog
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader
        title={post.title}
        subtitle={post.excerpt || ''}
        backgroundImage={post.imageUrl || "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=400&fit=crop"}
      />
      
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

          {/* Article Header */}
          <article className="mb-12">
            <div className="mb-6">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.createdAt).toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  Solo Rico
                </div>
                {post.category && (
                  <div className="flex items-center gap-1">
                    <Tag className="h-4 w-4" />
                    <Badge variant="secondary">{post.category}</Badge>
                  </div>
                )}
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
              
              {post.excerpt && (
                <p className="text-xl text-gray-600 leading-relaxed mb-8">{post.excerpt}</p>
              )}
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
            <div className="max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                {post.content}
              </div>
            </div>

            {/* Share Buttons */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Share2 className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-600 font-medium">Compartilhar:</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('facebook')}
                    className="flex items-center gap-2"
                  >
                    <Facebook className="h-4 w-4" />
                    Facebook
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('twitter')}
                    className="flex items-center gap-2"
                  >
                    <Twitter className="h-4 w-4" />
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('linkedin')}
                    className="flex items-center gap-2"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </Button>
                </div>
              </div>
            </div>
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Posts Relacionados</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                    <Link href={`/blog/${relatedPost.slug}`}>
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={relatedPost.imageUrl || "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=250&fit=crop"}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        {relatedPost.category && (
                          <Badge variant="secondary" className="text-xs">
                            {relatedPost.category}
                          </Badge>
                        )}
                        <span className="text-xs text-gray-500">
                          {new Date(relatedPost.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <Link href={`/blog/${relatedPost.slug}`}>
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
                          {relatedPost.title}
                        </h3>
                      </Link>
                      {relatedPost.excerpt && (
                        <p className="text-sm text-gray-600 mb-4" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
                          {relatedPost.excerpt}
                        </p>
                      )}
                      <Link href={`/blog/${relatedPost.slug}`}>
                        <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 p-0">
                          {t('read_more')} →
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
}