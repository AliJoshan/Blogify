type ErrorStateProps = {
  title?: string;
  description?: string;
  retry?: () => void;
};

export function ErrorState({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  retry,
}: ErrorStateProps) {
  return (
    <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-12 text-center">
      <h2 className="text-xl font-semibold tracking-tight text-destructive">
        {title}
      </h2>

      <p className="mt-3 text-sm text-muted-foreground">{description}</p>

      {retry && (
        <button
          onClick={retry}
          className="mt-6 rounded-md border px-4 py-2 text-sm font-medium transition hover:bg-muted"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
