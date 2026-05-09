"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabaseClient";

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

  // fetch post
  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from("posts")
        .select("title, content, user_id")
        .eq("id", id)
        .single();

      if (!data) return;

      setPost(data);
      setTitle(data.title);
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    if (editor && post?.content) {
      editor.commands.setContent(post.content);
    }
  }, [editor, post]);

  const handleUpdate = async () => {
    const html = editor?.getHTML() || "";

    const { error } = await supabase
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

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-4">
      <Input value={title} onChange={(e) => setTitle(e.target.value)} />

      <EditorContent editor={editor} />

      <Button onClick={handleUpdate}>Update Post</Button>
    </div>
  );
}
