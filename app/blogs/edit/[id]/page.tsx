"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabaseClient";
import EditPostSkeleton from "@/components/web/EditPostSkeleton";

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<any>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
  });

  useEffect(() => {
    if (!editor || !post?.content) return;

    editor.commands.setContent(post.content);
  }, [editor, post]);

  // fetch post
  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await createClient()
        .from("posts")
        .select("title, content, user_id")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      if (!data) {
        setLoading(false);
        return;
      }

      setPost(data);
      setTitle(data.title);
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async () => {
    const html = editor?.getHTML() || "";

    const { error } = await createClient()
      .from("posts")
      .update({
        title,
        content: html,
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    router.push(`/blogs/${id}`);
  };

  if (loading) return <EditPostSkeleton />;

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-4">
      <Input value={title} onChange={(e) => setTitle(e.target.value)} />

      <EditorContent editor={editor} />

      <Button onClick={handleUpdate}>Update Post</Button>
    </div>
  );
}
