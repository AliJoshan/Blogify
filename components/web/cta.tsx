import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-20 text-center">
      <h2 className="text-3xl font-bold md:text-4xl">
        Start writing your first post
      </h2>

      <p className="mt-4 text-muted-foreground">
        Share your ideas with the world in minutes.
      </p>

      <div className="mt-8">
        <Button size="lg" asChild>
          <Link href="/create">Create a Post</Link>
        </Button>
      </div>
    </section>
  );
}
