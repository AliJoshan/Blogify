import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function BlogCardSkeleton() {
  return (
    <Card className="h-full animate-pulse">
      <CardHeader>
        <div className="h-6 w-3/4 rounded-md bg-muted" />
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="h-4 w-full rounded-md bg-muted" />
        <div className="h-4 w-full rounded-md bg-muted" />
        <div className="h-4 w-2/3 rounded-md bg-muted" />
      </CardContent>
    </Card>
  );
}
