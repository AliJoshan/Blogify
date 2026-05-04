import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const posts = [
  {
    title: "The Future of Web Development",
    description: "How modern tools like Next.js are changing everything.",
    slug: "future-web-development",
  },
  {
    title: "Building in Public",
    description: "Why sharing your journey matters more than perfection.",
    slug: "building-in-public",
  },
  {
    title: "From Zero to Developer",
    description: "A practical roadmap to become a software engineer.",
    slug: "zero-to-developer",
  },
];

export default function FeaturedPosts() {
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
          <Link key={post.slug} href={`/blogs/${post.slug}`}>
            <Card className="h-full transition hover:shadow-md">
              <CardHeader className="text-lg font-semibold">
                {post.title}
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {post.description}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
