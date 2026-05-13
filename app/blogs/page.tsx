import BlogsClient from "./BlogsClient";
import { createClient } from "@/lib/supabaseServer";

export default async function BlogsPage() {
  const supabase = createClient();

  const { data: userData } = await supabase.auth.getUser();

  const userId = userData.user?.id;

  if (!userId) {
    return <BlogsClient posts={[]} />;
  }

  const { data, error } = await supabase
    .from("posts")
    .select("id, title, content, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return <BlogsClient posts={null} error="Failed to load posts." />;
  }

  return <BlogsClient posts={data || []} />;
}
