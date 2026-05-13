"use client";

import Link from "next/link";
import { useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSearch } from "../context/search-context";

import { BlogCardSkeleton } from "@/components/web/blog-card-skeleton";
import { EmptyState } from "@/components/web/empty-state";
import { ErrorState } from "@/components/web/error-state";

import { formatDate, timeAgo } from "@/lib/time";

type Post = {
  id: string;
  title: string;
  content: string;
  created_at: string;
};

export default function BlogsClient({
  posts,
  error,
}: {
  posts: Post[] | null;
  error?: string;
}) {
  const { search } = useSearch();

  const [loading] = useState(false); // server already handled loading

  const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "");

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error || !posts) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16">
        <ErrorState
          title="Unable to load posts"
          description={error || "Something went wrong"}
          retry={() => window.location.reload()}
        />
      </div>
    );
  }

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      stripHtml(post.content).toLowerCase().includes(search.toLowerCase()),
  );

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
      {filteredPosts.length === 0 ? (
        <EmptyState
          title="No posts yet"
          description="Be the first to create something meaningful."
          buttonText="Create a post →"
          href="/create"
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredPosts.map((post) => (
            <Link key={post.id} href={`/blogs/${post.id}`}>
              <Card className="h-full transition hover:shadow-md">
                <CardHeader className="space-y-1">
                  <div className="text-lg font-semibold">{post.title}</div>

                  <div className="text-xs text-muted-foreground">
                    {formatDate(post.created_at)} · {timeAgo(post.created_at)}
                  </div>
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
