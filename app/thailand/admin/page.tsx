"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [country, setCountry] = useState("thailand");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/thailand/clogin");
      } else {
        setUser(session.user);
        setLoading(false);
      }
    });
  }, [router]);

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + Date.now();
  };

  const handlePublish = async () => {
    if (!title || !content) {
      setError("Title နှင့် Content ထည့်ပါ။");
      return;
    }
    setPublishing(true);
    setError("");
    setSuccess("");

    let coverImageUrl = "";

    if (coverImage) {
      const fileExt = coverImage.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(fileName, coverImage);
      if (!uploadError) {
        const { data } = supabase.storage.from("blog-images").getPublicUrl(fileName);
        coverImageUrl = data.publicUrl;
      }
    }

    const slug = generateSlug(title);
    const excerpt = content.slice(0, 150) + "...";

    const { error: insertError } = await supabase.from("posts").insert({
      title,
      content,
      excerpt,
      country,
      cover_image: coverImageUrl,
      slug,
      published: true,
      author: user?.email,
    });

    if (insertError) {
      setError("Post တင်ရာတွင် အမှားရှိနေပါသည်။");
    } else {
      setSuccess("Post အောင်မြင်စွာ တင်ပြီးပါပြီ။ ✅");
      setTitle("");
      setContent("");
      setCoverImage(null);
    }
    setPublishing(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/thailand/clogin");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">AsiaBuddy Admin</h1>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
        <div className="flex gap-3">
          <a href="/thailand/blog" className="text-sm text-emerald-600 hover:underline">Blog ကြည့်ရန်</a>
          <button onClick={handleLogout} className="text-sm text-red-500 hover:underline">Logout</button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <h2 className="text-lg font-bold text-gray-700">Blog Post အသစ် ဖန်တီးရန်</h2>

        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <option value="thailand">Thailand</option>
              <option value="singapore">Singapore</option>
              <option value="myanmar">Myanmar</option>
              <option value="japan">Japan</option>
              <option value="korea">Korea</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="Blog post title..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
              placeholder="Content ကို ဒီနေရာမှာ paste လုပ်ပါ..."
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-emerald-600 text-sm font-medium">{success}</p>}

          <button
            onClick={handlePublish}
            disabled={publishing}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
          >
            {publishing ? "Publishing..." : "Publish Post"}
          </button>
        </div>
      </div>
    </div>
  );
}
