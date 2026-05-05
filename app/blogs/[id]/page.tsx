"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";

type Post = {
  id: string;
  title: string;
  content: string;
  user_id: string;
};

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, content, user_id")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setPost(data);
      }

      setLoading(false);
    };

    fetchPost();
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
      {/* TITLE */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {post.title}
        </h1>

        <p className="mt-3 text-sm text-muted-foreground">
          Author ID: {post.user_id}
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
