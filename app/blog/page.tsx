import Link from "next/link";
import SafeImage from "@/components/SafeImage";
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
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <SafeImage
          src="/san-antonio-tx-1031-exchange-twilight-skyline.jpg"
          alt="San Antonio skyline"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <p className="text-white/60 text-xs tracking-[0.5em] uppercase mb-4">
              Resources & Insights
            </p>
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl tracking-[0.15em] font-light">
              BLOG
            </h1>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-6 pt-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
      </div>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[#1a1a1a]/70 text-lg leading-relaxed italic mb-12">
              Educational resources and insights about 1031 exchanges, replacement property identification, and commercial real estate investing.
            </p>

            {blogPosts.length === 0 ? (
              <div className="bg-[#f5f5f3] border border-[#e5e5e5] p-12">
                <p className="text-[#1a1a1a]/60 italic mb-8">
                  Blog posts coming soon. Check back for educational resources about 1031 exchanges.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-10 py-4 border border-[#1a1a1a] text-[#1a1a1a] text-xs tracking-[0.3em] uppercase hover:bg-[#1a1a1a] hover:text-white transition-all"
                >
                  Contact Us
                </Link>
              </div>
            ) : (
              <div className="space-y-8">
                {blogPosts.map((post) => (
                  <article key={post.slug} className="bg-[#f5f5f3] border border-[#e5e5e5] p-8 text-left">
                    <h2 className="text-xl tracking-[0.1em] text-[#1a1a1a] mb-3">
                      <Link href={`/blog/${post.slug}`} className="hover:text-[#1a1a1a]/70 transition-colors">
                        {post.title.toUpperCase()}
                      </Link>
                    </h2>
                    <p className="text-xs tracking-[0.2em] uppercase text-[#1a1a1a]/50 mb-4">
                      {new Date(post.publishedAt).toLocaleDateString()} by {post.author}
                    </p>
                    <p className="text-[#1a1a1a]/60 italic mb-4">{post.excerpt}</p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs tracking-[0.2em] uppercase text-[#1a1a1a] hover:text-[#1a1a1a]/60 transition-colors"
                    >
                      Read more
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
