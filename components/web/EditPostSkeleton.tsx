export default function EditPostSkeleton() {
  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6 animate-pulse">
      {/* Title input skeleton */}
      <div className="h-10 w-full rounded-md bg-muted" />

      {/* Toolbar skeleton */}
      <div className="flex gap-2">
        <div className="h-9 w-9 rounded-md bg-muted" />
        <div className="h-9 w-9 rounded-md bg-muted" />
        <div className="h-9 w-9 rounded-md bg-muted" />
        <div className="h-9 w-9 rounded-md bg-muted" />
      </div>

      {/* Editor skeleton */}
      <div className="border rounded-md p-4 space-y-3 min-h-[400px]">
        <div className="h-4 w-3/4 rounded bg-muted" />
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-5/6 rounded bg-muted" />
        <div className="h-4 w-2/3 rounded bg-muted" />

        <div className="pt-6 space-y-3">
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-4/5 rounded bg-muted" />
          <div className="h-4 w-1/2 rounded bg-muted" />
        </div>
      </div>

      {/* Button skeleton */}
      <div className="h-10 w-32 rounded-md bg-muted" />
    </div>
  );
}
