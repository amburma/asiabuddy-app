import { supabase } from '@/lib/supabase';
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | AsiaBuddy Thailand`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://asiabuddy.app/thailand/blog/${post.slug}`,
      siteName: "AsiaBuddy",
      images: post.cover_image ? [{ url: post.cover_image }] : [],
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", params.slug)
    .eq("published", true)
    .single();

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <a href="/thailand/blog" className="text-emerald-600 text-sm hover:underline">← Blog သို့ ပြန်သွားရန်</a>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <article className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {post.cover_image && (
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-64 object-cover"
            />
          )}
          <div className="p-8 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <span>{post.author}</span>
                <span>•</span>
                <span>
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
            <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
