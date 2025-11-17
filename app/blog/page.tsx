import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata = {
  title: "Blog | 1031 Exchange Resources and Insights",
  description: "Educational resources and insights about 1031 exchanges, replacement property identification, and commercial real estate investing.",
};

// This would typically fetch from Sanity
// For now, using placeholder structure
const blogPosts: Array<{
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  author: string;
}> = [];

export default function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  // Pagination would be implemented here
  // For now, showing empty state
  
  return (
    <main className="min-h-screen bg-paper">
      <div className="container mx-auto px-4 py-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-heading mb-6">
            Blog
          </h1>
          <p className="text-lg text-ink/80 mb-12">
            Educational resources and insights about 1031 exchanges, replacement property identification, and commercial real estate investing.
          </p>

          {blogPosts.length === 0 ? (
            <div className="bg-panel border border-outline rounded-lg p-12 text-center">
              <p className="text-ink/80 mb-6">
                Blog posts coming soon. Check back for educational resources about 1031 exchanges.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primaryfg rounded-full hover:opacity-90 transition-opacity font-medium"
              >
                Contact Us
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {blogPosts.map((post) => (
                <article key={post.slug} className="bg-panel border border-outline rounded-lg p-8">
                  <h2 className="text-2xl font-semibold text-heading mb-3">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-ink/70 mb-4">
                    {new Date(post.publishedAt).toLocaleDateString()} by {post.author}
                  </p>
                  <p className="text-ink/80 mb-4">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-primary hover:underline font-medium"
                  >
                    Read more →
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

