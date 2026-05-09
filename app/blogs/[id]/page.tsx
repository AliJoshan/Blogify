"use client";

import { useEffect, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";
import DOMPurify from "dompurify";

type Post = {
  id: string;
  title: string;
  content: string;
  user_id: string;
};

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // get user
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setCurrentUserId(data.user?.id || null);
    };

    getUser();
  }, []);

  // fetch post
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

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    router.push("/blogs");
  };

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
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {post.title}
        </h1>
      </div>

      {/* ACTIONS (EDIT / DELETE) */}
      {currentUserId === post.user_id && (
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => router.push(`/blogs/edit/${post.id}`)}
            className="px-3 py-1 text-sm border rounded-md"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="px-3 py-1 text-sm border rounded-md text-red-500"
          >
            Delete
          </button>
        </div>
      )}

      {/* CONTENT */}
      <Card>
        <CardContent className="p-6">
          <div
            className="prose max-w-none text-base leading-7 text-foreground"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.content),
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
