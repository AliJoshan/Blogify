import { Card, CardContent } from "@/components/ui/card";

export function BlogPostSkeleton() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 animate-pulse">
      {/* BACK BUTTON */}
      <div className="mb-6">
        <div className="h-10 w-36 rounded-md bg-muted" />
      </div>

      {/* TITLE */}
      <div className="mb-6 space-y-3">
        <div className="h-10 w-3/4 rounded-md bg-muted" />
        <div className="h-10 w-1/2 rounded-md bg-muted" />
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3 mb-6">
        <div className="h-9 w-16 rounded-md bg-muted" />
        <div className="h-9 w-20 rounded-md bg-muted" />
      </div>

      {/* CONTENT CARD */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="h-4 w-full rounded-md bg-muted" />
          <div className="h-4 w-full rounded-md bg-muted" />
          <div className="h-4 w-5/6 rounded-md bg-muted" />

          <div className="h-4 w-full rounded-md bg-muted" />
          <div className="h-4 w-full rounded-md bg-muted" />
          <div className="h-4 w-2/3 rounded-md bg-muted" />

          <div className="h-4 w-full rounded-md bg-muted" />
          <div className="h-4 w-4/5 rounded-md bg-muted" />
        </CardContent>
      </Card>
    </div>
  );
}
