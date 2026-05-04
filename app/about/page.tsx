import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20">
      {/* HEADER */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">About Blogify</h1>
        <p className="mt-4 text-muted-foreground">
          A simple space for writing, thinking, and sharing ideas.
        </p>
      </div>

      {/* PERSONAL INTRO */}
      <div className="mt-10 text-center">
        <p className="text-sm text-muted-foreground">
          Built with focus and intention by{" "}
          <span className="font-medium text-foreground">Ali Anas Joshan</span>
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="mt-12 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold">My Vision</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Blogify was built to explore what a clean, modern blogging
              platform should feel like—minimal, fast, and focused on ideas
              rather than distractions.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold">Why I built this</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              This project is part of my journey to master frontend development
              using Next.js, component-based architecture, and real-world UI
              systems. It’s not just a blog—it’s a learning foundation.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold">What’s next</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The goal is to evolve this into a full platform with
              authentication, database integration, rich text editing, and a
              real publishing system.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
