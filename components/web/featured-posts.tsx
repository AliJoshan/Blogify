"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";

type Post = {
  id: string;
  title: string;
  content: string;
  created_at: string;
};

export default function FeaturedPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, content, created_at")
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) {
        console.error(error);
        setError(true);
      } else {
        setPosts(data || []);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "");
  };

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="space-y-3">
          <div className="h-8 w-52 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-72 animate-pulse rounded-md bg-muted" />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="animate-pulse">
              <CardHeader>
                <div className="h-6 w-3/4 rounded-md bg-muted" />
              </CardHeader>

              <CardContent className="space-y-2">
                <div className="h-4 w-full rounded-md bg-muted" />
                <div className="h-4 w-5/6 rounded-md bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  if (error || posts.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
        Featured Posts
      </h2>

      <p className="mt-2 text-muted-foreground">
        Handpicked articles to inspire and help you grow.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.id} href={`/blogs/${post.id}`}>
            <Card className="h-full transition hover:shadow-md">
              <CardHeader className="text-lg font-semibold">
                {post.title}
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {stripHtml(post.content).length > 100
                  ? stripHtml(post.content).slice(0, 100) + "..."
                  : stripHtml(post.content)}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
