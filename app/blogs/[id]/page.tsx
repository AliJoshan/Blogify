"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";

type Post = {
  id: string;
  title: string;
  content: string;
};

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedPosts: Post[] = JSON.parse(
      localStorage.getItem("posts") || "[]",
    );

    const foundPost = storedPosts.find((p) => p.id === id);

    setPost(foundPost || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      {/* TITLE SECTION */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {post.title}
        </h1>

        <p className="mt-3 text-sm text-muted-foreground">
          Written by Ali Anas Joshan
        </p>
      </div>

      {/* CONTENT */}
      <Card>
        <CardContent className="p-6">
          <p className="whitespace-pre-wrap text-base leading-7 text-foreground">
            {post.content}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
