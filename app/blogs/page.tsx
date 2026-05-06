"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";

type Post = {
  id: string;
  title: string;
  content: string;
};

export default function BlogsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data: userData } = await supabase.auth.getUser();

      const userId = userData.user?.id;

      if (!userId) {
        setPosts([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("posts")
        .select("id, title, content")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) console.error(error);
      else setPosts(data || []);

      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16">
        <p className="text-muted-foreground">Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Blogs</h1>

        <p className="mt-2 text-muted-foreground">
          Explore ideas, stories, and insights from the community.
        </p>
      </div>

      {/* EMPTY STATE */}
      {posts.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <h2 className="text-lg font-semibold">No posts yet</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Be the first to create something meaningful.
          </p>

          <Link
            href="/create"
            className="mt-4 inline-block text-sm font-medium text-primary underline"
          >
            Create a post →
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.id} href={`/blogs/${post.id}`}>
              <Card className="h-full transition hover:shadow-md">
                <CardHeader className="text-lg font-semibold">
                  {post.title}
                </CardHeader>

                <CardContent className="text-sm text-muted-foreground">
                  {post.content.length > 120
                    ? post.content.slice(0, 120) + "..."
                    : post.content}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
