"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";
export default function CreatePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content are required");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("posts").insert([
        {
          title,
          content,
        },
      ]);

      if (error) {
        console.log(error);
        alert("Failed to create post");
        return;
      }

      // success → go to blogs
      router.push("/blogs");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
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
          {/* TITLE */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your blog title..."
            />
          </div>

          {/* CONTENT */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Content</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog content..."
              className="min-h-[200px]"
            />
          </div>

          {/* BUTTON */}
          <Button onClick={handlePublish} disabled={loading} className="w-full">
            {loading ? "Publishing..." : "Publish Post"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
