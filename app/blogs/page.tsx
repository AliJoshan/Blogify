"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";
import { BlogCardSkeleton } from "@/components/web/blog-card-skeleton";
import { EmptyState } from "@/components/web/empty-state";
import { ErrorState } from "@/components/web/error-state";

type Post = {
  id: string;
  title: string;
  content: string;
};

export default function BlogsPage() {
  const [error, setError] = useState<string | null>(null);
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

      if (error) {
        console.error(error);
        setError("Failed to load posts.");
      } else {
        setPosts(data || []);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16">
        {/* HEADER SKELETON */}
        <div className="mb-10 space-y-3">
          <div className="h-10 w-40 rounded-md bg-muted animate-pulse" />

          <div className="h-4 w-72 rounded-md bg-muted animate-pulse" />
        </div>

        {/* POSTS SKELETON */}
        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16">
        <ErrorState
          title="Unable to load posts"
          description="There was a problem fetching blog posts. Please try again later."
          retry={() => window.location.reload()}
        />
      </div>
    );
  }

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "");
  };

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
        <EmptyState
          title="No posts yet"
          description="Be the first to create something meaningful."
          buttonText="Create a post →"
          href="/create"
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.id} href={`/blogs/${post.id}`}>
              <Card className="h-full transition hover:shadow-md">
                <CardHeader className="text-lg font-semibold">
                  {post.title}
                </CardHeader>

                <CardContent className="text-sm text-muted-foreground">
                  {stripHtml(post.content).length > 120
                    ? stripHtml(post.content).slice(0, 120) + "..."
                    : stripHtml(post.content)}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
