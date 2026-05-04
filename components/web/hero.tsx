"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden py-24 md:py-32">
      {/* subtle background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-75 w-75 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl md:h-[500px] md:w-[500px]" />
      </div>

      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center">
        {/* badge */}
        <div className="mb-6 rounded-full border px-4 py-1 text-xs text-muted-foreground">
          ✨ A modern space to write and share ideas
        </div>

        {/* main heading */}
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          Write. Share. Inspire.
        </h1>

        {/* subtitle */}
        <p className="mt-6 text-base text-muted-foreground md:text-lg">
          A clean and minimal blogging platform where ideas turn into stories.
          Build, publish, and explore content that matters.
        </p>

        {/* buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/blogs">Explore Blogs</Link>
          </Button>

          <Button variant="outline" size="lg" asChild>
            <Link href="/create">Start Writing</Link>
          </Button>
        </div>

        {/* small hint */}
        <p className="mt-6 text-xs text-muted-foreground">
          No clutter. No noise. Just writing.
        </p>
      </div>
    </section>
  );
}
