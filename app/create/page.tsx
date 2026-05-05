"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";

export default function CreatePage() {
  const router = useRouter();

  const { user, loading: authLoading } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("You must be logged in to create a post");
      router.push("/login");
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Checking authentication...</p>
      </div>
    );
  }

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("posts").insert([
        {
          title,
          content,
          user_id: user?.id,
        },
      ]);

      if (error) {
        console.log(error);
        toast.error("Failed to create post");
        return;
      }

      toast.success("Post created successfully");

      router.push("/blogs");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">Create a new post</h1>
          <p className="text-sm text-muted-foreground">
            Share your thoughts with the world.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your blog title..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Content</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog content..."
              className="min-h-[200px]"
            />
          </div>

          <Button
            onClick={handlePublish}
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Publishing..." : "Publish Post"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
